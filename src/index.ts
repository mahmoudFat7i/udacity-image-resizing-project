import express, { Application, Request, Response } from 'express'
import apiRoute from './routes/api'

const app: Application = express()
export const port = 3000

app.use('/api', apiRoute)

app.get('/', (_req: Request, res: Response): void => {
  res.json({
    message:
      'use api/images?filename={FILE} with optional height and width queries to start',
  })
})

//use this function to map your app to a port
app.listen(port, (): void => {
  console.log(`my image processing app listening on port: ${port}`)
})

export default app
