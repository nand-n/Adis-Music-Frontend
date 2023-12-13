import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';
import AllSongs from '../Pages/AllSongs';
import SongByAlbum from '../Pages/SongByAlbum';
import SongByArtist from '../Pages/SongByArtist';
import SongByGenre from '../Pages/SongByGenre';
// import NotFoundPage from '../Pages/NotFound';

const NotFoundPage = lazy(() => import('../Pages/NotFound'));

const Dashboard = lazy(() => import('../Pages/Dashboard'));

export default function AppRouter() {
  const element = useRoutes([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
        path: '/songs',
        element: <AllSongs />,
      },
      {
        path: '/songbyalbum',
        element: <SongByAlbum />,
      },
      {
        path: '/songbyartist',
        element: <SongByArtist />,
      },  {
        path: '/songbygenre',
        element: <SongByGenre />,
      },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return element;
}
