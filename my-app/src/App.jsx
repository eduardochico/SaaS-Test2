import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProductCatalog from './ProductCatalog.jsx'
import BrandCatalog from './BrandCatalog.jsx'
import CategoryCatalog from './CategoryCatalog.jsx'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState('home')
  const [brands, setBrands] = useState(['Brand A', 'Brand B', 'Brand C'])
  const [categories, setCategories] = useState([
    'Tools',
    'Electronics',
    'Accessories',
    'Outdoor',
    'Home',
  ])

  const homeContent = (
    <>
      <Box>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} alt="React logo" />
        </a>
      </Box>
      <Typography variant="h4" sx={{ mt: 2 }}>Vite + React</Typography>
      <Box sx={{ my: 2 }}>
        <Button variant="contained" onClick={() => setCount(c => c + 1)}>
          count is {count}
        </Button>
        <Typography>
          Edit <code>src/App.jsx</code> and save to test HMR
        </Typography>
      </Box>
      <Typography>Click on the Vite and React logos to learn more</Typography>
    </>
  )

  const pageTitle = {
    home: 'Home',
    products: 'Products',
    brands: 'Brands',
    categories: 'Categories',
  }[page]

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="aside" sx={{ width: 200, p: 2, bgcolor: 'background.paper', height: '100vh' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          My App
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setPage('home')}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setPage('products')}>
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setPage('brands')}>
              <ListItemText primary="Brands" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setPage('categories')}>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" component="div">
              {pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2 }}>
          {page === 'home' && homeContent}
          {page === 'products' && (
            <ProductCatalog brands={brands} categories={categories} />
          )}
          {page === 'brands' && (
            <BrandCatalog brands={brands} setBrands={setBrands} />
          )}
          {page === 'categories' && (
            <CategoryCatalog
              categories={categories}
              setCategories={setCategories}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default App
