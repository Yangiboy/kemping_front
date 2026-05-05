import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import GuestsList from './pages/GuestsList'
import RoomsList from './pages/RoomsList'
import { guestAPI, roomAPI } from './api'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [guests, setGuests] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Mehmonlarni va xonalarni yuklash
  useEffect(() => {
    loadData()
  }, [currentPage])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [guestsData, roomsData] = await Promise.all([
        guestAPI.getAll(),
        roomAPI.getAll()
      ])
      setGuests(guestsData)
      setRooms(roomsData)
    } catch (err) {
      setError('Ma\'lumot yuklashda xato: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addGuest = async (guestData) => {
    try {
      const newGuest = await guestAPI.create(guestData)
      setGuests([...guests, newGuest])
    } catch (err) {
      setError('Mehmon qo\'shishda xato: ' + err.message)
    }
  }

  const updateGuest = async (id, updatedData) => {
    try {
      const updated = await guestAPI.update(id, updatedData)
      setGuests(guests.map(guest => guest._id === id ? updated : guest))
    } catch (err) {
      setError('Mehmonni tahrirlashda xato: ' + err.message)
    }
  }

  const deleteGuest = async (id) => {
    try {
      await guestAPI.delete(id)
      setGuests(guests.filter(guest => guest._id !== id))
    } catch (err) {
      setError('Mehmonni o\'chirishda xato: ' + err.message)
    }
  }

  const addRoom = async (roomData) => {
    try {
      const newRoom = await roomAPI.create(roomData)
      setRooms([...rooms, newRoom])
    } catch (err) {
      setError('Xona qo\'shishda xato: ' + err.message)
    }
  }

  const updateRoom = async (id, updatedData) => {
    try {
      const updated = await roomAPI.update(id, updatedData)
      setRooms(rooms.map(room => room._id === id ? updated : room))
    } catch (err) {
      setError('Xonani tahrirlashda xato: ' + err.message)
    }
  }

  const deleteRoom = async (id) => {
    try {
      await roomAPI.delete(id)
      setRooms(rooms.filter(room => room._id !== id))
    } catch (err) {
      setError('Xonani o\'chirishda xato: ' + err.message)
    }
  }

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {error && <div className="error-message">{error}</div>}
        {currentPage === 'dashboard' && <Dashboard guests={guests} rooms={rooms} />}
        {currentPage === 'guests' && (
          <GuestsList
            guests={guests}
            addGuest={addGuest}
            updateGuest={updateGuest}
            deleteGuest={deleteGuest}
            rooms={rooms}
          />
        )}
        {currentPage === 'rooms' && (
          <RoomsList
            rooms={rooms}
            addRoom={addRoom}
            updateRoom={updateRoom}
            deleteRoom={deleteRoom}
          />
        )}
      </main>
      {loading && <div className="loading-toast">Yangilanmoqda...</div>}
    </div>
  )
}

export default App
