import { useState } from 'react'

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Categories</h2>
      <form onSubmit={handleSubmit} className="mb-2 flex space-x-2">
        <input
          className="border p-1 flex-grow"
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button className="px-2 py-1 rounded bg-blue-600 text-white" type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
        {editingIndex !== null && (
          <button className="px-2 py-1 rounded bg-gray-500 text-white" type="button" onClick={cancel}>Cancel</button>
        )}
      </form>
      <ul className="list-none p-0">
        {categories.map((c, i) => (
          <li key={i} className="mb-2">
            {c}
            <button className="ml-2 text-blue-600" onClick={() => edit(i)}>Edit</button>
            <button className="ml-2 text-red-600" onClick={() => remove(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
