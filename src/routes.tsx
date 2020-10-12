import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Landing from './views/Landing';
import OrphanagesMap from './views/OrphanagesMap';

const Routes : React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/app' component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
