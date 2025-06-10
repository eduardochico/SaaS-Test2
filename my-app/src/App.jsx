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
        <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={() => setCount((count) => count + 1)}>
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
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden md:flex md:flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center px-4 font-semibold border-b">Catalog App</div>
        <nav className="flex flex-col flex-1 px-4 py-4 space-y-2">
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100" onClick={() => setPage('home')}>Home</button>
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100" onClick={() => setPage('products')}>Products</button>
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100" onClick={() => setPage('brands')}>Brands</button>
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100" onClick={() => setPage('categories')}>Categories</button>
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="flex h-16 items-center border-b border-gray-200 bg-white px-4">
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 text-left">
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
