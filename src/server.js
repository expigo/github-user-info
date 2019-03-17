import express from 'express'
import { notFound, devError, prodErrors } from './modules/errorHandlers'
import userRouter from './resources/user/user.router'
import { setGlobalMiddleware } from './middleware'

export const app = express()

setGlobalMiddleware(app)

app.use('/api/user', userRouter)

app.use(notFound)

if (app.get('env') === 'development') app.use(devError)

app.use(prodErrors)

export const start = async () => {
  app.listen(process.env.PORT || 2718, () => {
    console.log(`API waiting on http://localhost:${process.env.PORT}/api`)
  })
}
