import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer'
import './App.css'
import axios from 'axios';

function App() {
  const [location, setLocation] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactlocation = location.data.address
        setLocation(exactlocation)
        setOpenDropdown(false)
      }
      catch (error) {
        console.log(error)
      }
    })
  }
  useEffect(() => {
    getLocation()
  }, [])
  return (
    <>
      <BrowserRouter>
        <AppNavbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
