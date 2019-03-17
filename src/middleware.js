import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

export const setGlobalMiddleware = app => {
  app.use(cors())
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(morgan('dev'))
}
