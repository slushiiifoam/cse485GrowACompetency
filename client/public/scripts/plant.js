const defaultPlantImage = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80'

// Render one plant based on the slug at the end of a URL such as
// /plants/peashooter.
const renderPlant = async () => {
  const plantDetail = document.getElementById('plant-detail')
  const requestedSlug = window.location.pathname.split('/').filter(Boolean).pop()

  try {
    const response = await fetch(`/api/v1/plants/${requestedSlug}`)

    if (!response.ok) {
      throw new Error(`Plant request failed with status ${response.status}`)
    }

    const plant = await response.json()

    const image = document.getElementById('image')
    image.referrerPolicy = 'no-referrer'
    image.src = plant.imageUrl || defaultPlantImage
    image.alt = `${plant.name} from Plants vs. Zombies`
    image.addEventListener('error', () => {
      image.src = defaultPlantImage
    }, { once: true })

    document.getElementById('name').textContent = plant.name
    document.getElementById('description').textContent = plant.description
    document.getElementById('sunCost').textContent = plant.sunCost
    document.getElementById('role').textContent = plant.role
    document.title = `${plant.name} | Lawn Almanac`
  } catch (error) {
    console.error(error)
    plantDetail.innerHTML = '<p role="alert">This plant could not be loaded. Make sure the server is running.</p>'
  }
}

renderPlant()

