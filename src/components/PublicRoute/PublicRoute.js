import React from 'react'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({ isLoggedIn, children, path }) => {
  return (
    <Route
      path={path}
      render={() => {
        if (!isLoggedIn) return children
        return <Redirect to="/" />
      }}
    />
  )
}
