import express, { Request, Response } from 'express'
import {
  dimensionsValidation,
  imageExists,
} from '../../middlewares/validateQueries'
import { getImage } from '../../utils/utils'

const imagesRoutes = express.Router()
imagesRoutes.use([imageExists, dimensionsValidation])

imagesRoutes.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const imagePath: string = await getImage(req.query)
    res.sendFile(imagePath)
  } catch (error) {
    throw new Error(`Error on handling getImage function with Error: ${error}`)
  }
})

export default imagesRoutes
