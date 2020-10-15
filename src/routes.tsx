import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Landing from './views/Landing';
import OrphanagesMap from './views/OrphanagesMap';
import Orphanage from './views/Orphanage';
import CreateOrphanage from './views/CreateOrphanage';

const Routes : React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/map' component={OrphanagesMap} />
        <Route path='/orphanages/create' component={CreateOrphanage} />
        <Route path='/orphanages/:id' component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
