import 'dotenv/config'

import fs from 'fs/promises'
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'
import { convertHTMLToLexical, type SanitizedServerEditorConfig } from '@payloadcms/richtext-lexical'
import { getPayload, type Field } from 'payload'

import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const landingDir = path.resolve(dirname, '../../public/landing')
const { JSDOM } = createRequire(import.meta.url)('jsdom') as {
  JSDOM: new (html: string) => { window: { document: Document } }
}
const payload = await getPayload({ config })

const findField = (fields: Field[], name: string): Field | undefined => {
  for (const field of fields) {
    if ('name' in field && field.name === name) return field
    if ('tabs' in field) {
      for (const tab of field.tabs) {
        const found = findField(tab.fields, name)
        if (found) return found
      }
    }
  }
}

const htmlFromPage = async (filename: string) => {
  const document = new JSDOM(await fs.readFile(path.join(landingDir, filename), 'utf8')).window.document
  return document.querySelector('.legal__text')?.innerHTML.trim() || ''
}

try {
  const global = payload.config.globals.find(({ slug }) => slug === 'legal-pages')
  const richTextField = global && findField(global.fields, 'privacyContent')
  const editorConfig = richTextField && 'editor' in richTextField && richTextField.editor && 'editorConfig' in richTextField.editor
    ? richTextField.editor.editorConfig as SanitizedServerEditorConfig
    : null

  if (!editorConfig) throw new Error('Не найдена конфигурация визуального редактора юридических страниц.')

  const current = await payload.findGlobal({ slug: 'legal-pages', depth: 0 })
  const data: Record<string, unknown> = {}

  if (!current.privacyContent) {
    data.privacyContent = convertHTMLToLexical({
      editorConfig,
      html: await htmlFromPage('privacy.html'),
      JSDOM,
    })
  }
  if (!current.consentContent) {
    data.consentContent = convertHTMLToLexical({
      editorConfig,
      html: await htmlFromPage('consent.html'),
      JSDOM,
    })
  }

  if (Object.keys(data).length) {
    await payload.updateGlobal({ slug: 'legal-pages', data })
    console.log('Юридические страницы перенесены в визуальный редактор Payload.')
  } else {
    console.log('Юридические страницы уже заполнены, изменения не требуются.')
  }
} finally {
  await payload.destroy()
}
