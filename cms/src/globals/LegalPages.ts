import { lexicalHTMLField } from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

export const LegalPages: GlobalConfig = {
  slug: 'legal-pages',
  label: 'Юридические страницы',
  admin: {
    description: 'Тексты политики конфиденциальности и согласия на обработку персональных данных.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Политика конфиденциальности',
          fields: [
            {
              name: 'privacyTitle',
              label: 'Заголовок страницы',
              type: 'text',
              defaultValue: 'Политика конфиденциальности',
              required: true,
            },
            {
              name: 'privacyContent',
              label: 'Текст страницы',
              type: 'richText',
              required: true,
            },
            lexicalHTMLField({
              htmlFieldName: 'privacyHTML',
              lexicalFieldName: 'privacyContent',
            }),
          ],
        },
        {
          label: 'Согласие на обработку данных',
          fields: [
            {
              name: 'consentTitle',
              label: 'Заголовок страницы',
              type: 'text',
              defaultValue: 'Согласие субъекта на обработку персональных данных',
              required: true,
            },
            {
              name: 'consentContent',
              label: 'Текст страницы',
              type: 'richText',
              required: true,
            },
            lexicalHTMLField({
              htmlFieldName: 'consentHTML',
              lexicalFieldName: 'consentContent',
            }),
          ],
        },
      ],
    },
  ],
}
