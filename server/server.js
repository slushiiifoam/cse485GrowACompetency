import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import plantsRouter from './routes/plants.js'
import plantData from './data/plants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const publicDirectory = path.join(__dirname, 'public')

// Parse JSON request bodies for POST and PATCH requests.
app.use(express.json())

// Serve only the specific public asset folders needed by the pages. This
// follows the lab structure instead of serving the entire frontend at port
// 3001. Vite remains the main frontend server at http://localhost:5173.
app.use('/public', express.static(publicDirectory))
app.use('/scripts', express.static(path.join(publicDirectory, 'scripts')))

//app.use('/styles', express.static(path.join(publicDirectory, 'styles')))
//app.use('/images', express.static(path.join(publicDirectory, 'images')))

// The Express root identifies port 3001 as the backend API server. The full
// plant interface is served separately by Vite on port 5173.
app.get('/', (req, res) => {
  res.status(200).send(
    '<h1 style="text-align: center; margin-top: 50px;">Lawn Almanac API</h1>'
  )
})

// Keep API responses separate from the website pages.
app.use('/api/v1/plants', plantsRouter)

// Each plant detail page keeps the simple URL used by the original project.
app.get('/plants/:slug', (req, res) => {
  const plant = plantData.find((item) => item.slug === req.params.slug)

  if (!plant) {
    return res.status(404).sendFile(path.join(publicDirectory, '404.html'))
  }

  return res.status(200).sendFile(path.join(publicDirectory, 'plant.html'))
})

// Unknown API routes should return JSON instead of the website 404 page.
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' })
})

// Return a simple JSON error when a request body cannot be processed.
app.use((error, req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(400).json({ error: 'The request could not be processed.' })
  }

  return next(error)
})

// Any request that did not match a plant route or static file receives the
// project's custom 404 page.
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDirectory, '404.html'))
})

app.listen(PORT, () => {
  console.log(`🌱 Lawn Almanac server listening on http://localhost:${PORT}`)
})

