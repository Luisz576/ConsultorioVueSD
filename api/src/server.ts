import express from 'express'
import cors from 'cors'
import http from 'http'
import prisma from './app/services/prisma'
import apiRoutes from './app/routes/api_routes'

const port = 5000

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

app.use('/api', apiRoutes)

server.listen(port, () => {
  console.log(`Running at port: ${port}`)
})

server.on('close', () => {
  prisma.$disconnect()
})
