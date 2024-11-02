import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Booking from './pages/Booking';
// import Location from './pages/Location';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Booking/>} />
        {/* <Route path='/location' element={<Location/>} />
        <Route path='/provider' element={<Provider/>}/>
        <Route path='/descipline' element={<Descipline/>}/>
        <Route path='/treatment' element={<Treatment />} />
        <Route path='/yourappointment' element={<Appointment/>} /> */}
      </Routes>
    </BrowserRouter>
)};

export default App;

