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
      <div className="flex justify-center space-x-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-24 p-6 hover:drop-shadow-xl" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 p-6 hover:drop-shadow-xl" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold my-4">Vite + React</h1>
      <div className="p-6">
        <button className="px-4 py-2 border" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="mt-2">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500">
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
    <div className="flex min-h-screen">
      <aside className="w-64 border-r">
        <div className="h-16 flex items-center justify-center border-b">
          <span>My App</span>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <a href="#" onClick={() => setPage('home')} className="block p-2">
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setPage('products')} className="block p-2">
                Products
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setPage('brands')} className="block p-2">
                Brands
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setPage('categories')} className="block p-2">
                Categories
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="h-16 flex items-center border-b px-4">
          <h1 className="text-xl">{pageTitle}</h1>
        </header>
        <main className="flex-1 p-4">
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
