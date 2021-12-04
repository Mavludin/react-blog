import React from 'react'
import { Redirect, Route } from 'react-router'

export const PrivateRoute = ({ isLoggedIn, children, path, ...rest }) => {
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
