import 'dotenv/config'

import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(dirname, '../../public/landing/assets')

const categories = [
  ['category-01-platya.webp', 'Женское платье DOMTRIK'],
  ['category-02-sarafany.webp', 'Женский сарафан DOMTRIK'],
  ['category-03-tuniki-halaty.webp', 'Туника из коллекции DOMTRIK'],
  ['category-04-domashnie-kostyumy.webp', 'Домашний костюм DOMTRIK'],
  ['category-05-pizhamy-sorochki.webp', 'Сорочка из коллекции DOMTRIK'],
  ['category-06-bryuki-shorty.webp', 'Брюки из коллекции DOMTRIK'],
] as const

const hits = [
  ['product-01-anyuta.webp', 'Сарафан женский АНЮТА'],
  ['product-02-oliviya.webp', 'Сарафан женский ОЛИВИЯ'],
  ['product-03-maya.webp', 'Халат женский МАЙЯ'],
  ['product-04-savanna.webp', 'Костюм женский САВАННА'],
  ['product-05-zarina.webp', 'Костюм женский ЗАРИНА'],
  ['product-06-agniya.webp', 'Платье женское АГНИЯ'],
  ['product-07-vlada.webp', 'Платье женское ВЛАДА'],
  ['product-08-perfekt.webp', 'Платье женское ПЕРФЕКТ'],
  ['product-09-tbd.webp', 'Сарафан женский ОЛИВИЯ, бирюза'],
] as const

const certificates = [1, 2, 3, 4, 5].map((number) => [
  `cert-${number}.webp`,
  `Сертификат DOMTRIK, лист ${number} из 5`,
] as const)

const payload = await getPayload({ config })

try {
  const page = await payload.findGlobal({ slug: 'home-page', depth: 0 })

  const mediaID = async (filename: string, alt: string) => {
    const storedFilename = filename.replace(/\.(jpe?g|png)$/i, '.webp')
    const existing = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 1,
      where: { filename: { equals: storedFilename } },
    })

    if (existing.docs[0]) return existing.docs[0].id

    const media = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: path.join(assetsDir, filename === 'about-poster.jpg' ? `video/${filename}` : `img/${filename}`),
    })

    return media.id
  }

  const categoryRows = await Promise.all((page.categories || []).map(async (row, index) => {
    const asset = categories[index]
    return { ...row, image: row.image || (asset && await mediaID(asset[0], asset[1])) }
  }))
  const hitRows = await Promise.all((page.hits || []).map(async (row, index) => {
    const asset = hits[index]
    return { ...row, image: row.image || (asset && await mediaID(asset[0], asset[1])) }
  }))
  const certificateRows = await Promise.all(certificates.map(async (asset, index) => ({
    ...page.certificates?.[index],
    image: page.certificates?.[index]?.image || await mediaID(...asset),
  })))

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        ...page.hero,
        image: page.hero?.image || await mediaID('hero-bg.webp', 'Модели в домашнем трикотаже DOMTRIK'),
      },
      categories: categoryRows,
      hits: hitRows,
      assortmentCallToAction: {
        ...page.assortmentCallToAction,
        image: page.assortmentCallToAction?.image || await mediaID('cta-bg-2.webp', 'Модели в летних комплектах DOMTRIK'),
      },
      about: {
        ...page.about,
        poster: page.about?.poster || await mediaID('about-poster.jpg', 'Производство DOMTRIK'),
      },
      geography: {
        ...page.geography,
        image: page.geography?.image || await mediaID('geography-map.webp', 'Карта поставок DOMTRIK по России'),
      },
      certificates: certificateRows,
    },
  })

  console.log('Изображения лендинга добавлены в медиатеку и привязаны к главной странице.')
} finally {
  await payload.destroy()
}
