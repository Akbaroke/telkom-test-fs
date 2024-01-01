import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routeData from './data/route.data';

export default function Router() {
  return (
    <div className="bg-darkSecondary min-h-screen">
      <BrowserRouter>
        <Routes>
          {routeData.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
