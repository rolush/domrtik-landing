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
    { name: 'address', label: 'Адрес', type: 'text', defaultValue: 'г. Иваново, ул.Шестернина д.9' },
    {
      name: 'schedule',
      label: 'Режим работы',
      type: 'array',
      maxRows: 3,
      defaultValue: [
        { days: 'пн - чт:', time: '08:00 - 17:00' },
        { days: 'пт:', time: '08:00 - 16:30' },
        { days: 'сб - вс:', time: 'выходной' },
      ],
      fields: [
        { name: 'days', label: 'Дни', type: 'text', required: true },
        { name: 'time', label: 'Время', type: 'text', required: true },
      ],
    },
    { name: 'maxUrl', label: 'Ссылка MAX', type: 'text', defaultValue: 'https://web.max.ru/' },
    { name: 'vkUrl', label: 'Ссылка ВКонтакте', type: 'text', defaultValue: 'https://vk.ru/domtrik1' },
    { name: 'okUrl', label: 'Ссылка Одноклассники', type: 'text', defaultValue: 'https://ok.ru/domtrikdo' },
    { name: 'rutubeUrl', label: 'Ссылка Rutube', type: 'text', defaultValue: 'https://rutube.ru/channel/42081373/' },
  ],
}
