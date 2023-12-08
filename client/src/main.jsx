import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'

//creates the routes for the site
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
        {
            index: true,
            element: <Home />,
        },
        {
            path: 'profiles/:username',
            element: <Profile />
        },
        {
            path: '/me',
            element: <Profile />
        },
        {
            path: '/about',
            element: <About />
        }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
