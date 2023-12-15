import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import Generate from './pages/Generate.jsx'
//creates the routes for the site
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>404 Page Not Found!</h1>,
    children: [
      //default is set to home
        {
            index: true,
            element: <Home />,
        },
        //sends to users profile using the profile page
        {
            path: 'profiles/:username',
            element: <Profile />
        },
        //sends a user to their profile using the profile page
        {
            path: '/me',
            element: <Profile />
        },
        //sends a user to the about page

        {
            path: '/about',
            element: <About />
        },
        //sends user to the generate page
        {
            path: '/generate',
            element: <Generate />
        },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
