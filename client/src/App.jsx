import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Booking from './pages/Booking.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/appointment" element={<Booking/>} />
      </Routes>
    </BrowserRouter>
  )
}
