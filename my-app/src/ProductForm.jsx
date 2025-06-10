import { useState, useEffect } from 'react'

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
    <form className="space-y-2 mb-4" onSubmit={handleSubmit}>
      <div>
        <label className="block">
          Product Image
          <input className="block mt-1" type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {image && <img src={image} className="w-12 h-12 object-cover mt-1" alt="preview" />}
      </div>
      <div>
        <label className="block">
          SKU
          <input className="border p-1 w-full" value={sku} onChange={e => setSku(e.target.value.toUpperCase())} required />
        </label>
      </div>
      <div>
        <label className="block">
          Product Name
          <input className="border p-1 w-full" value={name} onChange={e => setName(e.target.value)} maxLength={50} required />
        </label>
      </div>
      <div>
        <label className="block">
          Brand
          <select className="border p-1 w-full" value={brand} onChange={e => setBrand(e.target.value)}>
            <option value="">Select brand</option>
            {brands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label className="block">
          Categories
          <select className="border p-1 w-full" multiple value={categories} onChange={handleCategoryChange}>
            {categoriesOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label className="block">
          Price
          <input className="border p-1 w-full" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
        </label>
      </div>
      <div>
        <label className="block">
          Discount %
          <input className="border p-1 w-full" type="number" step="0.01" value={discount} onChange={e => setDiscount(e.target.value)} min="0" max="100" />
        </label>
      </div>
      <div className="space-x-2">
        <button className="px-2 py-1 rounded bg-blue-600 text-white" type="submit">Save</button>
        <button className="px-2 py-1 rounded bg-gray-500 text-white" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
