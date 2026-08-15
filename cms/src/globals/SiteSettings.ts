import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'email', label: 'E-mail', type: 'email', defaultValue: 'manager@domtrik.ru', required: true },
    { name: 'phonePrimary', label: 'Основной телефон', type: 'text', defaultValue: '8 800 550 95 35', required: true },
    { name: 'phoneSecondary', label: 'Дополнительный телефон', type: 'text', defaultValue: '8 920 368 50 50', required: true },
    { name: 'maxUrl', label: 'Ссылка MAX', type: 'text', defaultValue: 'https://web.max.ru/' },
  ],
}
