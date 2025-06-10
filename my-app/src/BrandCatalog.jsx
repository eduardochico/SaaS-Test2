import { useState } from 'react'

export default function BrandCatalog({ brands, setBrands }) {
  const [name, setName] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    const value = name.trim()
    if (!value) return
    if (editingIndex !== null) {
      setBrands(brands.map((b, i) => (i === editingIndex ? value : b)))
      setEditingIndex(null)
    } else {
      setBrands([...brands, value])
    }
    setName('')
  }

  const edit = index => {
    setName(brands[index])
    setEditingIndex(index)
  }

  const remove = index => {
    setBrands(brands.filter((_, i) => i !== index))
  }

  const cancel = () => {
    setName('')
    setEditingIndex(null)
  }

  return (
    <div>
      <h2>Brands</h2>
      <form onSubmit={handleSubmit}>
        <input
         
          placeholder="Brand name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
        {editingIndex !== null && (
          <button type="button" onClick={cancel}>Cancel</button>
        )}
      </form>
      <ul>
        {brands.map((b, i) => (
          <li key={i}>
            {b}
            <button onClick={() => edit(i)}>Edit</button>
            <button onClick={() => remove(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
