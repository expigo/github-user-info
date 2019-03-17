import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'

export const setGlobalMiddleware = app => {
  app.use(cors())
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(compression())
  app.use(helmet())
  app.use(morgan('combined'))
}
