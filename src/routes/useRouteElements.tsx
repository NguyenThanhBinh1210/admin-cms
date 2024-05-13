import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import NotFound from '~/pages/NotFound'
import Register from '~/pages/Register'
import Login from '~/pages/Login'
import { AppContext } from '~/contexts/app.context'
import LoginLayout from '~/layouts/LoginLayout'
import HomeLayout from '~/layouts/HomeLayout'
import Home from '~/pages/Home'
import { useContext } from 'react'
import Manager from '~/pages/CSKH/Manager'
import User from '~/pages/CSKH/User'
import Manage from '~/pages/Loan/Manage'

const useRouteElements = () => {
  function ProtecedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='login' />
  }
  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <LoginLayout>
              <Login />
            </LoginLayout>
          )
        },
        {
          path: 'register',
          element: (
            <LoginLayout>
              <Register />
            </LoginLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtecedRoute />,
      children: [
        {
          path: '/',
          index: true,
          element: (
            <HomeLayout>
              <Home />
            </HomeLayout>
          )
        },
        {
          path: '/cskh/manage',
          element: (
            <HomeLayout>
              <Manager />
            </HomeLayout>
          )
        },
        {
          path: '/cskh/user',
          element: (
            <HomeLayout>
              <User />
            </HomeLayout>
          )
        },
        {
          path: '/loan/manage',
          element: (
            <HomeLayout>
              <Manage />
            </HomeLayout>
          )
        },
        {
          path: '/user/manage',
          element: (
            <HomeLayout>
              <Manage />
            </HomeLayout>
          )
        },
        {
          path: '/user/role',
          element: (
            <HomeLayout>
              <Manage />
            </HomeLayout>
          )
        },
        {
          path: '/user/permission',
          element: (
            <HomeLayout>
              <Manage />
            </HomeLayout>
          )
        },
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}
export default useRouteElements
