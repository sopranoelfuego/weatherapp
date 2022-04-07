import express, { Request, Response } from 'express'
import url, { URLSearchParams } from 'url'
import axios, { AxiosResponse } from 'axios'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
 const { API_URL, API_KEY, API_NAME } = process.env
 try {
  const newParams: URLSearchParams = new URLSearchParams({
   [API_NAME]: API_KEY,
   ...url.parse(req.url, true).query,
  })

  const { data }: AxiosResponse = await axios.get(`${API_URL}?${newParams}`)

  res.json(data)
 } catch (error) {
  res.json(error)
 }
})

export default router
