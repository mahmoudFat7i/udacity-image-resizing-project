import express from 'express'
import imagesRoutes from './images'
const apiRoutes = express.Router()

apiRoutes.use('/images', imagesRoutes)
apiRoutes.get('/', (_req, res) => {
  res.json({
    message:
      'use api/images?filename={FILE} with optional height and width queries to start',
  })
})
export default apiRoutes
