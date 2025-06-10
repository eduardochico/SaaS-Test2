import { useState } from 'react'
import './SimpleCatalog.css'

export default function CategoryCatalog({ categories, setCategories }) {
  const [name, setName] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    const value = name.trim()
    if (!value) return
    if (editingIndex !== null) {
      setCategories(categories.map((c, i) => (i === editingIndex ? value : c)))
      setEditingIndex(null)
    } else {
      setCategories([...categories, value])
    }
    setName('')
  }

  const edit = index => {
    setName(categories[index])
    setEditingIndex(index)
  }

  const remove = index => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const cancel = () => {
    setName('')
    setEditingIndex(null)
  }

  return (
    <div className="catalog">
      <h2>Categories</h2>
      <form onSubmit={handleSubmit} className="simple-form">
        <input
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
        {editingIndex !== null && (
          <button type="button" onClick={cancel}>Cancel</button>
        )}
      </form>
      <ul className="simple-list">
        {categories.map((c, i) => (
          <li key={i}>
            {c}
            <button onClick={() => edit(i)}>Edit</button>
            <button onClick={() => remove(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
