import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import route from '@routes'
const app = express()
app.use(cors())
dotenv.config()

export default function bootstrap() {
 app.use('/api', route)

 const port = process.env.PORT || 5001
 app.get('/', (_: Request, res: Response) =>
  res.send('welcome to the weather app...!')
 )

 app.use(express.static('public'))
 app.listen(port, () => {
  console.log('connected successfully')
 })
}

bootstrap()
