import { useState } from 'react'
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
    <div className="p-4">
      <h2 className="text-xl mb-2">Product Catalog</h2>
      {showForm ? (
        <ProductForm
          onSave={editingIndex !== null ? updateProduct : addProduct}
          onCancel={() => { setShowForm(false); setEditingIndex(null) }}
          initial={editingIndex !== null ? products[editingIndex] : null}
          brands={brands}
          categoriesOptions={categories}
        />
      ) : (
        <button className="mb-2 px-2 py-1 border" onClick={() => setShowForm(true)}>Add Product</button>
      )}
      <input
        className="border p-1 mb-2"
        placeholder="Search..."
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1) }}
      />
      <table className="table-auto w-full mb-2">
        <thead>
          <tr>
            <th className="p-2 text-left">Product Image</th>
            <th className="p-2 text-left">SKU</th>
            <th className="p-2 text-left">Product Name</th>
            <th className="p-2 text-left">Brand</th>
            <th className="p-2 text-left">Categories</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Discount %</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((p, i) => {
            const index = start + i
            return (
              <tr key={p.sku}>
                <td className="p-2"><img className="w-12 h-12 object-cover" src={p.image} alt={p.name} /></td>
                <td className="p-2">{p.sku}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.brand}</td>
                <td className="p-2">{p.categories.join(', ')}</td>
                <td className="p-2">{p.price.toFixed(2)}</td>
                <td className="p-2">{p.discount}</td>
                <td className="p-2 space-x-1">
                  <button className="px-2 py-1 border" onClick={() => { setEditingIndex(index); setShowForm(true) }}>Edit</button>
                  <button className="px-2 py-1 border" onClick={() => deleteProduct(index)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex items-center space-x-2">
        <button className="px-2 py-1 border" onClick={prevPage} disabled={page === 1}>Prev</button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button className="px-2 py-1 border" onClick={nextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  )
}
