import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/Layout';
import Legislacao from '../pages/Legislacao';

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
    ],
  },
]);

export default router;