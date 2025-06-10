import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProductCatalog from './ProductCatalog.jsx'
import BrandCatalog from './BrandCatalog.jsx'
import CategoryCatalog from './CategoryCatalog.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState('home')
  const [brands, setBrands] = useState(['Brand A', 'Brand B', 'Brand C'])
  const [categories, setCategories] = useState([
    'Tools',
    'Electronics',
    'Accessories',
    'Outdoor',
    'Home',
  ])

  const homeContent = (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )

  const pageTitle = {
    home: 'Home',
    products: 'Products',
    brands: 'Brands',
    categories: 'Categories',
  }[page]

  return (
    <div>
      <aside>
        <div>
          <span>My App</span>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#" onClick={() => setPage('home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setPage('products')}>
                Products
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setPage('brands')}>
                Brands
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setPage('categories')}>
                Categories
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <div>
        <header>
          <h1>{pageTitle}</h1>
        </header>
        <main>
          {page === 'home' && homeContent}
          {page === 'products' && (
            <ProductCatalog brands={brands} categories={categories} />
          )}
          {page === 'brands' && (
            <BrandCatalog brands={brands} setBrands={setBrands} />
          )}
          {page === 'categories' && (
            <CategoryCatalog
              categories={categories}
              setCategories={setCategories}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
