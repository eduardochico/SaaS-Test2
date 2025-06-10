import { useState, useEffect } from 'react'
import './ProductForm.css'

const brands = ['Brand A', 'Brand B', 'Brand C']
const categoriesOptions = ['Tools', 'Electronics', 'Accessories', 'Outdoor', 'Home']

export default function ProductForm({ onSave, onCancel, initial }) {
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
    const options = Array.from(e.target.selectedOptions).map(o => o.value)
    setCategories(options)
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
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label>
          Product Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {image && <img src={image} className="thumbnail" alt="preview" />}
      </div>
      <div>
        <label>
          SKU
          <input value={sku} onChange={e => setSku(e.target.value.toUpperCase())} required />
        </label>
      </div>
      <div>
        <label>
          Product Name
          <input value={name} onChange={e => setName(e.target.value)} maxLength={50} required />
        </label>
      </div>
      <div>
        <label>
          Brand
          <select value={brand} onChange={e => setBrand(e.target.value)}>
            <option value="">Select brand</option>
            {brands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Categories
          <select multiple value={categories} onChange={handleCategoryChange}>
            {categoriesOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Price
          <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Discount %
          <input type="number" step="0.01" value={discount} onChange={e => setDiscount(e.target.value)} min="0" max="100" />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
