import type { GlobalConfig } from 'payload'

const categories = [
  'Платья',
  'Сарафаны',
  'Туники и халаты',
  'Домашние костюмы',
  'Пижамы и сорочки',
  'Брюки и шорты',
].map((title) => ({ title }))

const hits = [
  ['Сарафан женский кулирка "АНЮТА"', 720, 'Олива'],
  ['Сарафан женский кулирка "ОЛИВИЯ"', 650, 'Голубой'],
  ['Халат женский кулирка "МАЙЯ"', 830, 'Оранж'],
  ['Костюм женский кулирка с брюками "САВАННА"', 950, 'Оранж'],
  ['Костюм женский футер с лайкрой "ЗАРИНА"', 1740, 'Индиго'],
  ['Платье женское кулирка "АГНИЯ"', 780, 'Лайм'],
  ['Платье женское кулирка "ВЛАДА"', 840, 'Беж полоса'],
  ['Платье женское кулирка с капюшоном "ПЕРФЕКТ"', 780, 'Шоколад'],
  ['Сарафан женский кулирка "ОЛИВИЯ"', 650, 'Бирюза'],
].map(([name, price, color]) => ({ name, price, color, badge: 'Хит продаж' }))

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Главная страница',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'hero',
      label: 'Первый экран',
      type: 'group',
      fields: [
        { name: 'accentFirst', label: 'Акцент первой строки', type: 'text', defaultValue: 'одежда,' },
        { name: 'lightFirst', label: 'Продолжение первой строки', type: 'text', defaultValue: 'которая' },
        { name: 'accentSecond', label: 'Вторая строка', type: 'text', defaultValue: 'точно понравится' },
        { name: 'lightThird', label: 'Третья строка', type: 'text', defaultValue: 'вашим покупателям!' },
        { name: 'subtitle', label: 'Подзаголовок', type: 'text', defaultValue: 'Домашний трикотаж оптом от производителя' },
        { name: 'buttonLabel', label: 'Текст кнопки', type: 'text', defaultValue: 'Стать партнером' },
        { name: 'sideButtonLabel', label: 'Боковая кнопка', type: 'text', defaultValue: 'Получить оптовый прайс' },
        {
          name: 'badges',
          label: 'Бейджи',
          type: 'array',
          maxRows: 2,
          defaultValue: [{ text: 'Честный Знак' }, { text: 'Полный пакет документов' }],
          fields: [{ name: 'text', label: 'Текст', type: 'text', required: true }],
        },
        { name: 'image', label: 'Фоновое изображение', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'categories',
      label: 'Категории продукции',
      type: 'array',
      maxRows: 6,
      defaultValue: categories,
      fields: [
        { name: 'title', label: 'Название', type: 'text', required: true },
        { name: 'image', label: 'Изображение', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'hits',
      label: 'Хиты продаж',
      type: 'array',
      maxRows: 9,
      defaultValue: hits,
      fields: [
        { name: 'name', label: 'Название', type: 'text', required: true },
        { name: 'price', label: 'Цена, ₽', type: 'number', min: 0, required: true },
        { name: 'color', label: 'Цвет', type: 'text' },
        { name: 'badge', label: 'Бейдж', type: 'text', defaultValue: 'Хит продаж' },
        { name: 'image', label: 'Изображение', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
