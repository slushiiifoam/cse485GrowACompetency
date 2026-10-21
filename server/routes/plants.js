import express from 'express'
import plantData from '../data/plants.js'

const router = express.Router()
const defaultPlantImage = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80'

// GET /api/v1/plants returns every plant.
router.get('/', (req, res) => {
  res.status(200).json(plantData)
})

// GET /api/v1/plants/:slug returns one plant.
router.get('/:slug', (req, res) => {
  const plant = plantData.find((item) => item.slug === req.params.slug)

  if (!plant) {
    return res.status(404).json({ error: 'Plant not found.' })
  }

  return res.status(200).json(plant)
})

// POST /api/v1/plants adds a plant to the in-memory list.
router.post('/', (req, res) => {
  const { slug, name, description, imageUrl, sunCost, role } = req.body

  if (!slug || !name || !description || sunCost === undefined || !role) {
    return res.status(400).json({ error: 'All plant fields are required.' })
  }

  if (plantData.some((plant) => plant.slug === slug)) {
    return res.status(409).json({ error: 'A plant with that slug already exists.' })
  }

  const numericSunCost = Number(sunCost)
  if (!Number.isFinite(numericSunCost) || numericSunCost < 0) {
    return res.status(400).json({ error: 'Sun cost must be a positive number.' })
  }

  const nextId = Math.max(0, ...plantData.map((plant) => plant.id)) + 1
  const newPlant = {
    id: nextId,
    slug,
    name,
    description,
    imageUrl: imageUrl || defaultPlantImage,
    sunCost: numericSunCost,
    role
  }

  plantData.push(newPlant)
  return res.location(`/api/v1/plants/${slug}`).status(201).json(newPlant)
})

// PATCH /api/v1/plants/:slug changes only the fields sent by the client.
router.patch('/:slug', (req, res) => {
  const plant = plantData.find((item) => item.slug === req.params.slug)

  if (!plant) {
    return res.status(404).json({ error: 'Plant not found.' })
  }

  const allowedFields = ['name', 'description', 'imageUrl', 'sunCost', 'role']
  const updates = Object.keys(req.body).filter((field) => allowedFields.includes(field))

  if (updates.length === 0) {
    return res.status(400).json({ error: 'Send at least one plant field to update.' })
  }

  if (updates.includes('sunCost')) {
    const numericSunCost = Number(req.body.sunCost)
    if (!Number.isFinite(numericSunCost) || numericSunCost < 0) {
      return res.status(400).json({ error: 'Sun cost must be a positive number.' })
    }
    req.body.sunCost = numericSunCost
  }

  updates.forEach((field) => {
    plant[field] = req.body[field]
  })

  return res.status(200).json(plant)
})

// DELETE /api/v1/plants/:slug removes a plant from the in-memory list.
router.delete('/:slug', (req, res) => {
  const plantIndex = plantData.findIndex((item) => item.slug === req.params.slug)

  if (plantIndex === -1) {
    return res.status(404).json({ error: 'Plant not found.' })
  }

  plantData.splice(plantIndex, 1)
  return res.status(204).send()
})

export default router
