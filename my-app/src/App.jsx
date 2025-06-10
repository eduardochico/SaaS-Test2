import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )

  return (
    <div className="app">
      <aside className="sidebar">
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('products')}>Products</button>
        <button onClick={() => setPage('brands')}>Brands</button>
        <button onClick={() => setPage('categories')}>Categories</button>
      </aside>
      <main className="content">
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
  )
}

export default App
