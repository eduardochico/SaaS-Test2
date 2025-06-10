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
    <div className="p-4">
      <h2 className="text-xl mb-2">Brands</h2>
      <form onSubmit={handleSubmit} className="mb-2 flex space-x-2">
        <input
          className="border p-1 flex-grow"
          placeholder="Brand name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button className="px-2 py-1 border" type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
        {editingIndex !== null && (
          <button className="px-2 py-1 border" type="button" onClick={cancel}>Cancel</button>
        )}
      </form>
      <ul className="list-none p-0">
        {brands.map((b, i) => (
          <li key={i} className="mb-2">
            {b}
            <button className="ml-2 underline" onClick={() => edit(i)}>Edit</button>
            <button className="ml-2 underline" onClick={() => remove(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
