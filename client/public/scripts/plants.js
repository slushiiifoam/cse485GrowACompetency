const apiUrl = '/api/v1/plants'
const defaultPlantImage = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80'
const plantList = document.getElementById('plant-list')
const plantForm = document.getElementById('plant-form')
const plantMessage = document.getElementById('plant-message')

// Show a short success or error message above the plant cards.
const showMessage = (message, isError = false) => {
  plantMessage.textContent = message
  plantMessage.classList.toggle('error-message', isError)
}

// Read an error message returned by the API.
const getErrorMessage = async (response) => {
  const data = await response.json().catch(() => ({}))
  return data.error || `Request failed with status ${response.status}.`
}

// Ask for a few changed fields and send them to the PATCH endpoint.
const editPlant = async (plant) => {
  const name = window.prompt('Plant name:', plant.name)
  if (name === null) return

  const description = window.prompt('Plant description:', plant.description)
  if (description === null) return

  const sunCost = window.prompt('Sun cost:', plant.sunCost)
  if (sunCost === null) return

  const response = await fetch(`${apiUrl}/${plant.slug}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, sunCost })
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  showMessage(`${name} was updated.`)
  await renderPlants()
}

// Remove a plant after the user confirms the action.
const deletePlant = async (plant) => {
  if (!window.confirm(`Delete ${plant.name}?`)) return

  const response = await fetch(`${apiUrl}/${plant.slug}`, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  showMessage(`${plant.name} was deleted.`)
  await renderPlants()
}

// Build one card for a plant returned by the API.
const createPlantCard = (plant) => {
  const card = document.createElement('article')
  card.className = 'plant-card'

  const image = document.createElement('img')
  image.referrerPolicy = 'no-referrer'
  image.src = plant.imageUrl || defaultPlantImage
  image.alt = `${plant.name} from Plants vs. Zombies`
  image.addEventListener('error', () => {
    image.src = defaultPlantImage
  }, { once: true })

  const name = document.createElement('h2')
  name.textContent = plant.name

  const description = document.createElement('p')
  description.textContent = plant.description

  const details = document.createElement('p')
  details.textContent = `☀️ ${plant.sunCost} sun · ${plant.role}`

  const actions = document.createElement('footer')
  actions.className = 'plant-actions'

  const detailLink = document.createElement('a')
  detailLink.href = `/plants/${plant.slug}`
  detailLink.textContent = 'Details'
  detailLink.setAttribute('role', 'button')

  const editButton = document.createElement('button')
  editButton.type = 'button'
  editButton.className = 'secondary'
  editButton.textContent = 'Edit'
  editButton.addEventListener('click', () => {
    editPlant(plant).catch((error) => showMessage(error.message, true))
  })

  const deleteButton = document.createElement('button')
  deleteButton.type = 'button'
  deleteButton.className = 'contrast outline'
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', () => {
    deletePlant(plant).catch((error) => showMessage(error.message, true))
  })

  actions.append(detailLink, editButton, deleteButton)
  card.append(image, name, description, details, actions)
  return card
}

// GET all plants and render the current server data.
const renderPlants = async () => {
  plantList.innerHTML = '<p>Loading plants...</p>'

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) throw new Error(await getErrorMessage(response))

    const plants = await response.json()
    plantList.innerHTML = ''

    if (plants.length === 0) {
      plantList.innerHTML = '<p>No plants remain. Add one with the form above.</p>'
      return
    }

    plants.forEach((plant) => plantList.appendChild(createPlantCard(plant)))
  } catch (error) {
    plantList.innerHTML = '<p role="alert">The plants could not be loaded. Make sure the server is running.</p>'
    showMessage(error.message, true)
  }
}

// Send the Add Plant form to the POST endpoint as JSON.
plantForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formData = new FormData(plantForm)
  const newPlant = Object.fromEntries(formData.entries())

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlant)
    })

    if (!response.ok) throw new Error(await getErrorMessage(response))

    const createdPlant = await response.json()
    plantForm.reset()
    showMessage(`${createdPlant.name} was added with a 201 Created response.`)
    await renderPlants()
  } catch (error) {
    showMessage(error.message, true)
  }
})

renderPlants()
