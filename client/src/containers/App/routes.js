import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
  
  {
    path: '',
    component: asyncComponent(() => import('./Pages/Table')),
  },
];

export default routes;