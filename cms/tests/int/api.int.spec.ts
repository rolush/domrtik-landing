import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { Leads } from '@/collections/Leads'

import { describe, it, beforeAll, expect, vi } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  }, 30_000)

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('provides landing content defaults', async () => {
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    const page = await payload.findGlobal({ slug: 'home-page' })

    expect(settings.email).toBe('manager@domtrik.ru')
    expect(page.categories).toHaveLength(6)
    expect(page.hits).toHaveLength(9)
    expect(page.benefits).toHaveLength(4)
    expect(page.reasons).toHaveLength(5)
    expect(page.faq).toHaveLength(6)
  })

  it('accepts a valid landing lead', async () => {
    const form = new FormData()
    Object.entries({ name: 'Тест', email: 'test@example.com', phone: '+79990000001', agree: 'on', ts: String(Date.now() - 5000) })
      .forEach(([name, value]) => form.set(name, value))
    const create = vi.fn()
    const handler = Leads.endpoints && Leads.endpoints[0]?.handler
    if (!handler) throw new Error('Lead endpoint is not configured')
    const response = await handler({
      formData: async () => form,
      payload: { count: async () => ({ totalDocs: 0 }), create },
    } as never)

    expect(response?.status).toBe(200)
    expect(create).toHaveBeenCalledOnce()
  })
})
