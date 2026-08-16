import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Leads } from './collections/Leads'
import { HomePage } from './globals/HomePage'
import { LegalPages } from './globals/LegalPages'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const domtrikRu = {
  ...ru,
  translations: {
    ...ru.translations,
    general: {
      ...ru.translations.general,
      email: 'E-mail',
      emailAddress: 'E-mail',
      payloadSettings: 'Настройки DOMTRIK',
    },
  },
}

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Icon: '/components/Branding#DomtrikIcon',
        Logo: '/components/Branding#DomtrikLogo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      applicationName: 'DOMTRIK',
      defaultOGImageType: 'off',
      description: 'Административная панель DOMTRIK',
      titleSuffix: '— DOMTRIK',
      icons: {
        icon: '/landing/favicon.svg',
      },
      openGraph: {
        description: 'Административная панель DOMTRIK',
        siteName: 'DOMTRIK',
      },
      twitter: {
        description: 'Административная панель DOMTRIK',
      },
    },
  },
  collections: [Users, Media, Leads],
  globals: [SiteSettings, HomePage, LegalPages],
  i18n: {
    fallbackLanguage: 'ru',
    supportedLanguages: { ru: domtrikRu },
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
    push: false,
  }),
  sharp,
  plugins: [],
})
