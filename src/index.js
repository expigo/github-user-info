import '@babel/polyfill'
import { app } from './server'
import dotenv from 'dotenv'
const [major, minor] = process.versions.node.split('.').map(parseFloat)

if (major < 7 || (major === 7 && minor < 6)) {
  console.log(
    `🛑✋ You better use node version>=7.6 because I'm using async/await quite heavily. 😁✌`
  )
  process.exit()
}

dotenv.config({ path: '.env' })

app.set('port', process.env.PORT || 2718)
const server = app.listen(app.get('port'), () => {
  console.log(
    `API is waiting for your orders on port ${server.address().port}, sir.`
  )
})
