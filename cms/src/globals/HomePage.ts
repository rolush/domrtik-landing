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

const benefits = [
  { chip: 'Гибкие условия заказа', prefix: 'От', value: '30 000', suffix: 'руб.', label: 'Выкуп без размерных рядов' },
  { chip: 'Широкий ассортимент', value: '700+', label: 'Моделей в ассортименте' },
  { chip: 'Размерный ряд', value: '42–72', label: 'Широкая размерная сетка' },
  { chip: 'Наценка', value: '80-120', suffix: '%', label: 'Наценка партнёров' },
]

const reasons = [
  { title: 'Ходовой ассортимент', description: 'Популярные модели с высоким спросом' },
  { title: 'Отгрузка в день оплаты', description: 'Быстро отправляем заказы по всей России' },
  { title: 'Помощь в подборе ассортимента', description: 'Подскажем модели под ваш магазин и покупателей' },
  { title: 'Трендовые новинки каждый месяц', description: 'Регулярно обновляем коллекции и ассортимент' },
  { title: 'Закреплённый менеджер', description: 'Персональный менеджер всегда на связи' },
]

const faq = [
  { question: 'Как сделать заказ и дозаказ?' },
  { question: 'Доставка и правила работы?' },
  { question: 'Таблица размеров' },
  { question: 'Сертификаты' },
  { question: 'Какой минимальный заказ?' },
  { question: 'График работы' },
]

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
          labels: { singular: 'Бейдж', plural: 'Бейджи' },
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
      labels: { singular: 'Категория', plural: 'Категории' },
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
      labels: { singular: 'Товар', plural: 'Товары' },
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
    {
      name: 'benefits',
      label: 'Преимущества',
      labels: { singular: 'Преимущество', plural: 'Преимущества' },
      type: 'array',
      maxRows: 4,
      defaultValue: benefits,
      fields: [
        { name: 'chip', label: 'Заголовок', type: 'text', required: true },
        { name: 'prefix', label: 'Префикс значения', type: 'text' },
        { name: 'value', label: 'Значение', type: 'text', required: true },
        { name: 'suffix', label: 'Суффикс значения', type: 'text' },
        { name: 'label', label: 'Пояснение', type: 'text', required: true },
      ],
    },
    {
      name: 'reasons',
      label: 'Причины сотрудничества',
      labels: { singular: 'Причина', plural: 'Причины' },
      type: 'array',
      maxRows: 5,
      defaultValue: reasons,
      fields: [
        { name: 'title', label: 'Заголовок', type: 'text', required: true },
        { name: 'description', label: 'Описание', type: 'textarea', required: true },
      ],
    },
    {
      name: 'reasonsCallToAction',
      label: 'Призыв после причин',
      type: 'group',
      fields: [
        { name: 'text', label: 'Текст', type: 'text', defaultValue: 'Получите оптовые условия и каталог моделей' },
        { name: 'buttonLabel', label: 'Кнопка', type: 'text', defaultValue: 'Стать партнером' },
      ],
    },
    {
      name: 'assortmentCallToAction',
      label: 'Подберём ассортимент',
      type: 'group',
      fields: [
        { name: 'titleStart', label: 'Начало заголовка', type: 'text', defaultValue: 'Подберем' },
        { name: 'titleAccent', label: 'Акцент', type: 'text', defaultValue: 'востребованный' },
        { name: 'titleEnd', label: 'Вторая строка', type: 'text', defaultValue: 'ассортимент в вашем регионе' },
        { name: 'note', label: 'Примечание', type: 'text', defaultValue: 'У нас есть статистика продаж по всем регионам' },
        { name: 'buttonLabel', label: 'Кнопка формы', type: 'text', defaultValue: 'Подобрать ассортимент' },
        { name: 'image', label: 'Фотография', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'about',
      label: 'О компании',
      type: 'group',
      fields: [
        { name: 'title', label: 'Заголовок', type: 'text', defaultValue: 'О компании' },
        {
          name: 'text',
          label: 'Текст — один абзац на строку',
          type: 'textarea',
          defaultValue: 'Швейное предприятие «ДомТрик» основано в 2006 году в Иваново — текстильной столице России. Мы специализируемся на производстве качественной одежды для дома, офиса, сна и отдыха. В каталоге представлено более 700 моделей и ассортимент регулярно пополняется трендовыми новинками.\nРасполагаем собственным производством, оснащенным передовым техническим оборудованием. Наша команда дизайнеров, технологов и конструкторов контролирует каждый этап создания одежды. Вся продукция сертифицирована. Мы гарантируем высокое качество швов и посадки в соответствии с российскими размерной сеткой.\nКомпания регулярно обновляет коллекции и сотрудничает с оптовыми покупателями по всей стране.',
        },
        { name: 'experienceValue', label: 'Опыт', type: 'text', defaultValue: '20+' },
        { name: 'experienceLabel', label: 'Подпись опыта', type: 'text', defaultValue: 'Лет опыта' },
        { name: 'modelsValue', label: 'Количество моделей', type: 'text', defaultValue: '700+' },
        { name: 'modelsLabel', label: 'Подпись моделей', type: 'text', defaultValue: 'Моделей в ассортименте' },
        { name: 'poster', label: 'Постер видео', type: 'upload', relationTo: 'media' },
        { name: 'videoWebm', label: 'Видео WebM', type: 'upload', relationTo: 'media' },
        { name: 'videoMp4', label: 'Видео MP4', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'delivery',
      label: 'Первая доставка',
      type: 'group',
      fields: [
        { name: 'start', label: 'Начало заголовка', type: 'text', defaultValue: 'Первая' },
        { name: 'strong', label: 'Акцент', type: 'text', defaultValue: 'доставка в подарок' },
        { name: 'middle', label: 'Текст перед суммой', type: 'text', defaultValue: 'при заказе от' },
        { name: 'amount', label: 'Сумма', type: 'text', defaultValue: '70 000' },
        { name: 'terms', label: 'Условия', type: 'text', defaultValue: 'В любой регион в течение 3-х дней с момента заказа' },
        { name: 'buttonLabel', label: 'Кнопка формы', type: 'text', defaultValue: 'Рассчитать заказ' },
      ],
    },
    {
      name: 'faq',
      label: 'Вопросы и ответы',
      labels: { singular: 'Вопрос', plural: 'Вопросы' },
      type: 'array',
      maxRows: 6,
      defaultValue: faq,
      fields: [
        { name: 'question', label: 'Вопрос', type: 'text', required: true },
        { name: 'answer', label: 'Новый текст ответа — необязательно', type: 'textarea' },
      ],
    },
    {
      name: 'geography',
      label: 'География поставок',
      type: 'group',
      fields: [
        { name: 'accent', label: 'Акцент заголовка', type: 'text', defaultValue: 'География' },
        { name: 'title', label: 'Продолжение заголовка', type: 'text', defaultValue: 'поставок' },
        { name: 'note', label: 'Примечание', type: 'text', defaultValue: 'Работаем с розничными магазинами и оптовыми покупателями по всей России' },
        { name: 'image', label: 'Карта', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'certificates',
      label: 'Сертификаты',
      labels: { singular: 'Сертификат', plural: 'Сертификаты' },
      type: 'array',
      maxRows: 5,
      fields: [{ name: 'image', label: 'Документ', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}
