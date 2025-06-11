import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

export default function BrandCatalog({ brands, setBrands }) {
  const [name, setName] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)
  const [showForm, setShowForm] = useState(false)

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
    setShowForm(false)
  }

  const edit = index => {
    setName(brands[index])
    setEditingIndex(index)
    setShowForm(true)
  }

  const remove = index => {
    setBrands(brands.filter((_, i) => i !== index))
  }

  const cancel = () => {
    setName('')
    setEditingIndex(null)
    setShowForm(false)
  }

  if (showForm) {
    return (
      <Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="Brand name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Button type="submit" variant="contained">
            {editingIndex !== null ? 'Update' : 'Add'}
          </Button>
          <Button type="button" onClick={cancel}>Cancel</Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={() => { setShowForm(true); setName(''); setEditingIndex(null) }}>
          Add Brand
        </Button>
      </Box>
      <List>
        {brands.map((b, i) => (
          <ListItem
            key={i}
            secondaryAction={
              <Box>
                <Button size="small" onClick={() => edit(i)}>Edit</Button>
                <Button size="small" onClick={() => remove(i)}>Delete</Button>
              </Box>
            }
          >
            <ListItemText primary={b} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
