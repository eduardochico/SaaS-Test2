import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function ProductForm({ onSave, onCancel, initial, brands = [], categoriesOptions = [] }) {
  const [image, setImage] = useState(initial?.image || '')
  const [sku, setSku] = useState(initial?.sku || '')
  const [name, setName] = useState(initial?.name || '')
  const [brand, setBrand] = useState(initial?.brand || '')
  const [categories, setCategories] = useState(initial?.categories || [])
  const [price, setPrice] = useState(initial?.price || '')
  const [discount, setDiscount] = useState(initial?.discount ?? 0)

  useEffect(() => {
    setImage(initial?.image || '')
    setSku(initial?.sku || '')
    setName(initial?.name || '')
    setBrand(initial?.brand || '')
    setCategories(initial?.categories || [])
    setPrice(initial?.price || '')
    setDiscount(initial?.discount ?? 0)
  }, [initial])

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleCategoryChange = e => {
    setCategories(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!/^[A-Z0-9]+$/.test(sku)) {
      alert('SKU must be uppercase alphanumeric with no spaces or special characters.')
      return
    }
    onSave({ image, sku, name, brand, categories, price: parseFloat(price || 0), discount: parseFloat(discount || 0) })
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
      <div>
        <Button variant="outlined" component="label">
          Upload Image
          <input hidden type="file" accept="image/*" onChange={handleImageChange} />
        </Button>
        {image && (
          <Box component="img" src={image} alt="preview" sx={{ width: 50, display: 'block', mt: 1 }} />
        )}
      </div>
      <TextField label="SKU" value={sku} onChange={e => setSku(e.target.value.toUpperCase())} required />
      <TextField label="Product Name" value={name} onChange={e => setName(e.target.value)} inputProps={{ maxLength: 50 }} required />
      <FormControl>
        <InputLabel>Brand</InputLabel>
        <Select value={brand} label="Brand" onChange={e => setBrand(e.target.value)}>
          <MenuItem value="">
            <em>Select brand</em>
          </MenuItem>
          {brands.map(b => (
            <MenuItem key={b} value={b}>{b}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={categories}
          onChange={handleCategoryChange}
          label="Categories"
          renderValue={selected => selected.join(', ')}
        >
          {categoriesOptions.map(c => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="Price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
      <TextField label="Discount %" type="number" step="0.01" value={discount} onChange={e => setDiscount(e.target.value)} inputProps={{ min: 0, max: 100 }} />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button type="submit" variant="contained">Save</Button>
        <Button type="button" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  )
}
