import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import store from './store';
import AsyncRoute from './AsyncRoute';
import preload from '../public/data.json';
if (global) {
  global.System = { import () {} };
}

const App = () => {
  return (
    <Provider store={store}>
      <div className='app'>
        <Route
          exact
          path='/'
          component={(props) => <AsyncRoute props={props} loadingPromise={System.import('./Landing')} />}
        />
        <Route
          path='/search'
          component={(props) => <AsyncRoute props={Object.assign({shows: preload.shows}, props)} loadingPromise={System.import('./Search')} />}
        />
        <Route
          path='/details/:id'
          component={
            ({ match }) => {
              const shows = preload.shows.filter((show) => match.params.id === show.imdbID);
              return <AsyncRoute props={Object.assign({show: shows[0]}, match)} loadingPromise={System.import('./Details')} />;
            }
          }
        />
      </div>
    </Provider>
  );
};

export default App;
