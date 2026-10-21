// Build one reusable header for both the list page and the detail page.
const header = document.getElementById('site-header')

if (header) {
  const nav = document.createElement('nav')
  nav.className = 'container'

  const brandList = document.createElement('ul')
  const brandItem = document.createElement('li')
  const brandLink = document.createElement('a')
  brandLink.href = '/'
  brandLink.className = 'brand'
  brandLink.textContent = '🌻 Lawn Almanac'
  brandItem.appendChild(brandLink)
  brandList.appendChild(brandItem)

  const navList = document.createElement('ul')
  const homeItem = document.createElement('li')
  const homeLink = document.createElement('a')
  homeLink.href = '/'
  homeLink.textContent = 'All plants'
  homeItem.appendChild(homeLink)
  navList.appendChild(homeItem)

  nav.appendChild(brandList)
  nav.appendChild(navList)
  header.appendChild(nav)
}

