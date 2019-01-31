import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          render={props =>
            isLoggedIn ? (
              <Redirect
                to={{ pathname: '/dashboard', state: { from: props.location } }}
              />
            ) : (
              <Redirect
                to={{ pathname: '/signin', state: { from: props.location } }}
              />
            )
          }
        />
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() => import('./containers/Auth/SignIn'))}
        />
        <Route
          exact
          path={'/signup'}
          component={asyncComponent(() => import('./containers/Auth/SignUp'))}
        />
        <RestrictedRoute
          path="/dashboard"
          component={App}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  isLoggedIn: true,
}))(PublicRoutes);
