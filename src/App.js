import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import WarehouseListingPage from './Pages/WarehouseListingPage';
import WarehouseDetails from  './Pages/WarehouseDetails';
import UpdateWarehouse from './Pages/UpdateWarehouse';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<WarehouseListingPage />} />
        <Route path='/warehouse/:id' element={<WarehouseDetails />}/>
        <Route path='/edit/:id' element={<UpdateWarehouse />}/> 
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
