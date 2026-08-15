import type { CollectionConfig, PayloadRequest } from 'payload'

const fail = (error: string, status = 400, fields: Record<string, string> = {}) =>
  Response.json({ ok: false, error, fields }, { status })

const submitLead = async (req: PayloadRequest) => {
  if (!req.formData) return fail('Некорректный запрос')
  const form = await req.formData()
  const clean = (name: string) => String(form.get(name) || '').replace(/[\r\n\0]/g, '').trim()
  const name = clean('name')
  const email = clean('email').toLowerCase()
  const phone = clean('phone').replace(/[\s()\-]/g, '')
  const source = clean('source').slice(0, 120) || 'Форма на сайте'
  const startedAt = Number(form.get('ts') || 0)

  if (clean('company')) return Response.json({ ok: true })
  if (!startedAt || Date.now() - startedAt < 3000) {
    return fail('Слишком быстрая отправка, попробуйте ещё раз', 429)
  }

  const fields: Record<string, string> = {}
  if (name.length < 2 || name.length > 100) fields.name = 'Укажите имя'
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email)) {
    fields.email = 'Проверьте адрес почты — например, name@mail.ru'
  }
  if (!/^(\+7|8)\d{10}$/.test(phone)) {
    fields.phone = 'Телефон в формате +7 999 123 45 67 или 8 999 123 45 67'
  }
  if (!form.get('agree')) fields.agree = 'Подтвердите согласие на обработку данных'
  if (Object.keys(fields).length) return fail('Проверьте заполнение полей', 422, fields)

  const recent = await req.payload.count({
    collection: 'leads',
    where: {
      and: [
        { createdAt: { greater_than: new Date(Date.now() - 3600000).toISOString() } },
        { or: [{ email: { equals: email } }, { phone: { equals: phone } }] },
      ],
    },
  })
  if (recent.totalDocs >= 5) return fail('Слишком много заявок, попробуйте позже', 429)

  await req.payload.create({
    collection: 'leads',
    data: { name, email, phone, source, status: 'new' },
  })
  return Response.json({ ok: true })
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'email', 'source', 'status', 'createdAt'],
  },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  endpoints: [{ path: '/submit', method: 'post', handler: submitLead }],
  fields: [
    { name: 'name', label: 'Имя', type: 'text', required: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
    { name: 'phone', label: 'Телефон', type: 'text', required: true },
    { name: 'source', label: 'Источник', type: 'text', required: true },
    {
      name: 'status',
      label: 'Статус',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'В работе', value: 'in_progress' },
        { label: 'Завершена', value: 'done' },
        { label: 'Спам', value: 'spam' },
      ],
    },
  ],
}
