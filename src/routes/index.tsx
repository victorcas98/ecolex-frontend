import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/Layout';
import Legislacao from '../pages/Legislacao';
import CadastroProjeto from '../pages/CadastroProjeto';
import Dashboard from '../pages/Dashboard';
import TemaDetalhes from '../pages/Dashboard/TemaDetalhes';
import Sobre from '../pages/Sobre';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'Legislacao',
        element: <Legislacao />,
      },
      {
        path: 'projeto',
        element: <CadastroProjeto />,
      },
      {
        path: 'dashboard/:id',
        element: <Dashboard />,
      },
      {
        path: 'dashboard/:id/detalhes',
        element: <TemaDetalhes />,
      },
      {
        path: 'sobre',
        element: <Sobre />,
      },
    ],
  },
]);

export default router;