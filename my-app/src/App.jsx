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

    <div className="flex">
      <aside className="flex flex-col mr-4 pr-4 border-r border-gray-300 space-y-2">
        <button className="px-2 py-1 rounded bg-gray-200" onClick={() => setPage('home')}>Home</button>
        <button className="px-2 py-1 rounded bg-gray-200" onClick={() => setPage('products')}>Products</button>
        <button className="px-2 py-1 rounded bg-gray-200" onClick={() => setPage('brands')}>Brands</button>
        <button className="px-2 py-1 rounded bg-gray-200" onClick={() => setPage('categories')}>Categories</button>
      </aside>
      <main className="flex-1 text-left">
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
