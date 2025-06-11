import { useState } from 'react'
import ProductForm from './ProductForm.jsx'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
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

  if (showForm) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {editingIndex !== null ? 'Edit Product' : 'Add Product'}
        </Typography>
        <ProductForm
          onSave={editingIndex !== null ? updateProduct : addProduct}
          onCancel={() => {
            setShowForm(false)
            setEditingIndex(null)
          }}
          initial={editingIndex !== null ? products[editingIndex] : null}
          brands={brands}
          categoriesOptions={categories}
        />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Product Catalog</Typography>
      <Button variant="contained" onClick={() => setShowForm(true)}>
        Add Product
      </Button>
      <TextField
        placeholder="Search..."
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1) }}
        sx={{ my: 2 }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Image</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discount %</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.map((p, i) => {
            const index = start + i
            return (
              <TableRow key={p.sku}>
                <TableCell><img src={p.image || placeholder} alt={p.name} /></TableCell>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.categories.join(', ')}</TableCell>
                <TableCell>{p.price.toFixed(2)}</TableCell>
                <TableCell>{p.discount}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => { setEditingIndex(index); setShowForm(true) }}>Edit</Button>
                  <Button size="small" onClick={() => deleteProduct(index)}>Delete</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
        <Button onClick={prevPage} disabled={page === 1}>Prev</Button>
        <Typography>Page {page} of {totalPages}</Typography>
        <Button onClick={nextPage} disabled={page === totalPages}>Next</Button>
      </Box>
    </Box>
  )
}
