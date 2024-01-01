import Home from '@/pages/Home';
import Auth from '@/pages/auth';
import routeDataType from '@/types/route';

const routeData: routeDataType[] = [
  {
    path: '/register',
    element: <Auth type="register" />,
  },
  {
    path: '/login',
    element: <Auth type="login" />,
  },
  {
    path: '/:history_id',
    element: <Home />,
  },
  {
    path: '/',
    element: <Home />,
  },
];

export default routeData;
