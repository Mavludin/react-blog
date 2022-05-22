import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { Blog } from './pages/Blog/Blog';
import { SingleBlogPost } from './pages/SingleBlogPost/SingleBlogPost';
import { Login } from './pages/Login/Login';
import { NoMatch } from './pages/NoMatch/NoMatch';

export const AppRoutes = ({
  isLoggedIn,
  setIsLoggedIn,
  setUserName,
  setIsAdmin,
  isAdmin,
}) => {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => {
          if (isLoggedIn) return <Redirect to='/blog' />;
          return <Redirect to='/login' />;
        }}
      />

      <PublicRoute isLoggedIn={isLoggedIn} path='/login' exact>
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setUserName={setUserName}
          setIsAdmin={setIsAdmin}
        />
      </PublicRoute>

      <PrivateRoute isLoggedIn={isLoggedIn} path='/blog/:postId' exact>
        <SingleBlogPost isAdmin={isAdmin} />
      </PrivateRoute>

      <PrivateRoute isLoggedIn={isLoggedIn} path='/blog' exact>
        <Blog isAdmin={isAdmin} />
      </PrivateRoute>

      <Route exact path='/404'>
        <NoMatch />
      </Route>

      <Route
        path='*'
        render={({ location }) => {
          return (
            <Redirect
              to={{
                pathname: '/404',
                from: location,
              }}
            />
          );
        }}
      />
    </Switch>
  );
};
