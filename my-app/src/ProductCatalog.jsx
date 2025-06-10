import { useState } from 'react'
import './ProductCatalog.css'

export default function ProductCatalog() {
  const products = [
    { sku: 'SKU001', name: 'Widget A', categories: ['Tools'], price: '$9.99', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU002', name: 'Gadget B', categories: ['Electronics'], price: '$19.99', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU003', name: 'Thingamajig C', categories: ['Accessories'], price: '$5.50', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU004', name: 'Doohickey D', categories: ['Tools', 'Outdoor'], price: '$14.25', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU005', name: 'Widget E', categories: ['Tools'], price: '$8.00', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU006', name: 'Gadget F', categories: ['Electronics'], price: '$22.00', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU007', name: 'Thingamabob G', categories: ['Accessories'], price: '$11.75', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU008', name: 'Widget H', categories: ['Outdoor'], price: '$6.40', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU009', name: 'Gizmo I', categories: ['Electronics', 'Tools'], price: '$13.30', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU010', name: 'Contraption J', categories: ['Home'], price: '$15.00', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU011', name: 'Device K', categories: ['Electronics'], price: '$18.25', image: 'https://via.placeholder.com/50' },
    { sku: 'SKU012', name: 'Thingy L', categories: ['Accessories', 'Home'], price: '$7.99', image: 'https://via.placeholder.com/50' },
  ]

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 5

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
            <th>Categories</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(p => (
            <tr key={p.sku}>
              <td><img className="thumbnail" src={p.image} alt={p.name} /></td>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.categories.join(', ')}</td>
              <td>{p.price}</td>
            </tr>
          ))}
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
