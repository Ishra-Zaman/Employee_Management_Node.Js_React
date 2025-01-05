import {Outlet, useLocation} from 'react-router-dom';
import {NextUIProvider} from '@nextui-org/react'
import Homepage from '../../pages/Homepage';
import './App.css';

function App() {
  const location = useLocation();
  return (
    <NextUIProvider>
      {location.pathname === '/' ? (<Homepage />) : (<div className='container mx-auto px-4'><Outlet /></div>)}
    </NextUIProvider>
  );
}

export default App;
