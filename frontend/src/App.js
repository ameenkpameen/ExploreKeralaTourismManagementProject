
import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import UserRoutes from './routes/UserRoutes';
import OwnerRoutes from './routes/OwnerRoutes';
import SuperadminRoutes from './routes/SuperadminRoutes';



function App() {
  
  
  return (
    
      <BrowserRouter>
          <Routes>
            <Route path='/*' element={<UserRoutes /> } />

            <Route path='/owner/*' element={<OwnerRoutes /> } />

            <Route path='/superadmin/*' element={<SuperadminRoutes /> } />
           
          </Routes>
      </BrowserRouter>
    
  );
}

export default App;
