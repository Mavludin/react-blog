import React from 'react'
import { Redirect, Route } from 'react-router'

type PrivateRouteProps = {
  isLoggedIn: boolean
  path: string
  exact?: boolean
  children: React.ReactNode
}

export const PrivateRoute = ({ isLoggedIn, children, path, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      path={path}
      {...rest}
      render={() => {
        if (isLoggedIn) return children
        return <Redirect to="/login" />
      }}
    />
  )
}
