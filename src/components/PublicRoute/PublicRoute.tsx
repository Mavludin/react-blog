import { Redirect, Route } from 'react-router'

type PublicRouteProps = {
  isLoggedIn: boolean
  path: string
  exact?: boolean
  children: React.ReactNode
}

export const PublicRoute = ({ isLoggedIn, children, path, ...rest }: PublicRouteProps) => {
  return (
    <Route
      path={path}
      {...rest}
      render={() => {
        if (!isLoggedIn) return children
        return <Redirect to="/" />
      }}
    />
  )
}
