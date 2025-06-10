import { useState } from 'react'
import './ProductCatalog.css'
import ProductForm from './ProductForm.jsx'
const placeholder = 'https://via.placeholder.com/50'

const initialProducts = [
  { sku: 'SKU001', name: 'Widget A', categories: ['Tools'], price: 9.99, image: placeholder, brand: 'Brand A', discount: 0 },
  { sku: 'SKU002', name: 'Gadget B', categories: ['Electronics'], price: 19.99, image: placeholder, brand: 'Brand B', discount: 0 },
  { sku: 'SKU003', name: 'Thingamajig C', categories: ['Accessories'], price: 5.5, image: placeholder, brand: 'Brand C', discount: 0 },
  { sku: 'SKU004', name: 'Doohickey D', categories: ['Tools', 'Outdoor'], price: 14.25, image: placeholder, brand: 'Brand A', discount: 0 },
  { sku: 'SKU005', name: 'Widget E', categories: ['Tools'], price: 8.0, image: placeholder, brand: 'Brand B', discount: 0 },
  { sku: 'SKU006', name: 'Gadget F', categories: ['Electronics'], price: 22.0, image: placeholder, brand: 'Brand C', discount: 0 },
  { sku: 'SKU007', name: 'Thingamabob G', categories: ['Accessories'], price: 11.75, image: placeholder, brand: 'Brand A', discount: 0 },
  { sku: 'SKU008', name: 'Widget H', categories: ['Outdoor'], price: 6.4, image: placeholder, brand: 'Brand B', discount: 0 },
  { sku: 'SKU009', name: 'Gizmo I', categories: ['Electronics', 'Tools'], price: 13.3, image: placeholder, brand: 'Brand C', discount: 0 },
  { sku: 'SKU010', name: 'Contraption J', categories: ['Home'], price: 15.0, image: placeholder, brand: 'Brand A', discount: 0 },
  { sku: 'SKU011', name: 'Device K', categories: ['Electronics'], price: 18.25, image: placeholder, brand: 'Brand B', discount: 0 },
  { sku: 'SKU012', name: 'Thingy L', categories: ['Accessories', 'Home'], price: 7.99, image: placeholder, brand: 'Brand C', discount: 0 }
]

export default function ProductCatalog({ brands, categories }) {
  const [products, setProducts] = useState(initialProducts)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 5

  const addProduct = product => {
    setProducts([...products, product])
    setShowForm(false)
    setPage(Math.ceil((products.length + 1) / pageSize))
  }

  const updateProduct = product => {
    setProducts(products.map((p, i) => (i === editingIndex ? product : p)))
    setEditingIndex(null)
    setShowForm(false)
  }

  const deleteProduct = index => {
    const newProducts = products.filter((_, i) => i !== index)
    setProducts(newProducts)
    setPage(p => Math.min(Math.ceil(newProducts.length / pageSize) || 1, p))
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / pageSize)
  const start = (page - 1) * pageSize
  const paginated = filtered.slice(start, start + pageSize)

  const prevPage = () => setPage(p => Math.max(1, p - 1))
  const nextPage = () => setPage(p => Math.min(totalPages, p + 1))

  return (
    <div className="catalog">
      <h2>Product Catalog</h2>
      {showForm ? (
        <ProductForm
          onSave={editingIndex !== null ? updateProduct : addProduct}
          onCancel={() => { setShowForm(false); setEditingIndex(null) }}
          initial={editingIndex !== null ? products[editingIndex] : null}
          brands={brands}
          categoriesOptions={categories}
        />
      ) : (
        <button onClick={() => setShowForm(true)}>Add Product</button>
      )}
      <input
        className="search"
        placeholder="Search..."
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1) }}
      />
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Categories</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((p, i) => {
            const index = start + i
            return (
              <tr key={p.sku}>
                <td><img className="thumbnail" src={p.image} alt={p.name} /></td>
                <td>{p.sku}</td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.categories.join(', ')}</td>
                <td>{p.price.toFixed(2)}</td>
                <td>{p.discount}</td>
                <td>
                  <button onClick={() => { setEditingIndex(index); setShowForm(true) }}>Edit</button>
                  <button onClick={() => deleteProduct(index)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Prev</button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  )
}
