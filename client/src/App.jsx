
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/index'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './context/userContext'
import Profile from './pages/sections/Profile'
import Accommodations from './pages/sections/Accommodations'
import Bookings from './pages/sections/Bookings'
import AddPlaceForm from './components/AddPlaceForm'
import PlacePage from './pages/PlacePage'
import BookingPage from './pages/BookingPage'



axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
function App() {


  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/login' element={<LoginPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account/' element={<Profile />} />
            <Route path='/account/accommodations' element={<Accommodations />} />
            <Route path='/account/bookings' element={<Bookings />} />
            <Route path='/account/accommodations/new' element={<AddPlaceForm />} />
            <Route path='/account/bookings/:id' element={<BookingPage />} />

            <Route path='/account/accommodations/:id' element={<AddPlaceForm />} />

            <Route path='/place/:id' element={<PlacePage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
