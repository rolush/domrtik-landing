import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

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
  })
})
