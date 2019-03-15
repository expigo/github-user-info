import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/api', (req, res) => {
  res.send({ santaClaus: 'hohoho! 🤶👊' })
})

export const start = async () => {
  app.listen(process.env.PORT || 2718, () => {
    console.log(`API waiting on http://localhost:${process.env.PORT}/api`)
  })
}
