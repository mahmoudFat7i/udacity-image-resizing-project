import express, { Request, Response } from 'express'
import imagesRoutes from './images'
const apiRoutes = express.Router()

apiRoutes.use('/images', imagesRoutes)
apiRoutes.get('/', (_req: Request, res: Response): void => {
  res.json({
    message:
      'use api/images?filename={FILE} with optional height and width queries to start',
  })
})
export default apiRoutes
