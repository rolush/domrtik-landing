import type { CollectionConfig } from 'payload'
import sharp from 'sharp'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Медиафайл', plural: 'Медиафайлы' },
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [async ({ args, operation, req }) => {
      const file = req.file
      if (!file || !['create', 'update'].includes(operation) || !file.mimetype.startsWith('image/')) return args

      const data = await sharp(file.tempFilePath || file.data).rotate().webp({ quality: 82 }).toBuffer()
      req.file = {
        ...file,
        data,
        mimetype: 'image/webp',
        name: file.name.replace(/\.[^.]+$/, '.webp'),
        size: data.length,
        tempFilePath: undefined,
      }

      return args
    }],
  },
  fields: [
    {
      name: 'alt',
      label: 'Описание изображения',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
