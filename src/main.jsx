import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './styles/index.css'

const container = document.getElementById('root')

createRoot(container).render(<RouterProvider router={router} />)
