import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LoginPage } from "./Pages/LoginPage"
import { AppLayout } from "./components/AppLayout"
import { SignIn } from "./Pages/Signup"
import { Home } from "./components/Home"
import { Profile } from "./Pages/Profile"
import { UserDetails } from "./Pages/UserDetails"
import { ProfileDetails } from "./Pages/ProfileDetails"
import { RequestHistory } from "./Pages/ReqHistory"
import { ErrorPage } from "./Pages/ErrorPage"


function App() {

  const router = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout />,
        children:[
           {
              path:"/",
              element:<LoginPage />
           },
           {
              path:"/signup",
              element:<SignIn />
           }
        ]
    },
    {
       path:"/home",
       element:<Home />
    },
    {
      path:"/profile",
      element:<Profile />
    },
    {
      path:"/userdetails",
      element:<UserDetails />
    },
    {
      path:"/user/:id",
      element:<ProfileDetails />
    },
    {
        path:"/history",
        element:<RequestHistory />
    },
    {
      path:"/error",
      element:<ErrorPage />
    }
  ])
  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>

    </>
  )
}

export default App
