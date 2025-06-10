import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCatalog from './ProductCatalog.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState('home')

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
      </aside>
      <main className="content">
        {page === 'home' && homeContent}
        {page === 'products' && <ProductCatalog />}
      </main>
    </div>
  )
}

export default App
