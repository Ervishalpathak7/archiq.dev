import Fastify from 'fastify'
import cors from '@fastify/cors'

const app = Fastify({ logger: true })

app.register(cors, { origin: '*' })

app.get('/health', async () => ({ status: 'ok' }))

app.listen({ port: 8000 }, (err) => {
  if (err) process.exit(1)
  console.log('API running on http://localhost:8000')
})