// This array acts as the Part 1 data source. A later project can replace it
// with a database without requiring the client display code to change much.
const defaultPlantImage = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80'

const plantData = [
  {
    id: 1,
    slug: 'peashooter',
    name: 'Peashooter',
    description: 'A dependable front-line plant that fires peas straight down its lane at approaching zombies.',
    imageUrl: "https://static.wikia.nocookie.net/plantsvszombies/images/0/09/1769829-plant_peashooter_thumb.png/revision/latest?cb=20200213115004",
    sunCost: 100,
    role: 'attack'
  },
  {
    id: 2,
    slug: 'sunflower',
    name: 'Sunflower',
    description: 'Produces extra sun over time, giving you the resources needed to build the rest of your defense.',
    imageUrl: "https://plantsvszombies.wiki.gg/images/1769830-plant_sunflower_smiling_thumb.png?744113",
    sunCost: 50,
    role: 'support'
  },
  {
    id: 3,
    slug: 'cherry-bomb',
    name: 'Cherry Bomb',
    description: 'Explodes shortly after planting and clears a group of zombies in the surrounding area.',
    imageUrl: "https://static.wikia.nocookie.net/plantsvszombies/images/0/0d/Cherry_Bomb1.png/revision/latest/thumbnail/width/360/height/360?cb=20090521215844",
    sunCost: 150,
    role: 'instant'
  },
  {
    id: 4,
    slug: 'wall-nut',
    name: 'Wall-nut',
    description: 'Blocks a lane with a tough shell, buying your attacking plants more time to stop the zombies.',
    imageUrl: "https://plantsvszombies.wiki.gg/images/HD_Wall-nut.png?d7444e",
    sunCost: 50,
    role: 'defense'
  },
  {
    id: 5,
    slug: 'potato-mine',
    name: 'Potato Mine',
    description: 'A low-cost trap that needs time to arm, then explodes when the first zombie steps on it.',
    imageUrl: "https://static.wikia.nocookie.net/plantsvszombies/images/d/d2/PotatoMineHD.png/revision/latest?cb=20240522023857",
    sunCost: 25,
    role: 'instant'
  },
  {
    id: 6,
    slug: 'snow-pea',
    name: 'Snow Pea',
    description: 'Fires frozen peas that damage zombies and slow their movement through the lane.',
    imageUrl: "https://static.wikia.nocookie.net/plantsvszombies/images/e/e3/HD_Snow_Pea1.png/revision/latest?cb=20250915025515",
    sunCost: 175,
    role: 'attack'
  },
  {
    id: 7,
    slug: 'chomper',
    name: 'Chomper',
    description: 'Swallows a nearby zombie whole, but needs time to chew before it can attack again.',
    imageUrl: "https://static.wikia.nocookie.net/plantsvszombies/images/5/50/Chomper-hd.png/revision/latest?cb=20220403234002",
    sunCost: 150,
    role: 'attack'
  }
]

export default plantData

