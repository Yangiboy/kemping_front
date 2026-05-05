import { useState } from 'react'
import RoomModal from '../components/RoomModal'
import RoomDetailsModal from '../components/RoomDetailsModal'

function RoomsList({ rooms, addRoom, updateRoom, deleteRoom }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [formData, setFormData] = useState({
    roomNumber: '',
    capacity: '',
    pricePerDay: '',
    status: 'available',
    amenities: ''
  })

  const handleAddRoom = () => {
    if (formData.roomNumber && formData.capacity && formData.pricePerDay) {
      addRoom(formData)
      setFormData({
        roomNumber: '',
        capacity: '',
        pricePerDay: '',
        status: 'available',
        amenities: ''
      })
      setIsFormOpen(false)
    } else {
      alert('Iltimos, barcha kerakli maydonlarni to\'ldiring')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'pricePerDay' ? parseInt(value) : value
    }))
  }

  const handleDeleteRoom = (id) => {
    if (confirm('Siz ushbu xonani o\'chirmoqchisiz?')) {
      deleteRoom(id)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>Xonalar</h2>
        <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
          ➕ Xona Qo'shish
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="empty-state">
          <h3>Hech qanday xona mavjud emas</h3>
          <p>Xona qo'shish uchun "Xona Qo'shish" tugmasini bosing</p>
        </div>
      ) : (
        <div className="items-grid">
          {rooms.map(room => (
            <div key={room._id} className="item-card" onClick={() => setSelectedRoom(room)}>
              <h3>Xona #{room.roomNumber}</h3>
              <div className="item-info">👥 Sig'imi: {room.capacity} kishi</div>
              <div className="item-info">💰 Narxi: {room.pricePerDay.toLocaleString()} so'm/kun</div>
              <div className="item-info">
                <span className={`status-badge status-${room.status}`}>
                  {room.status === 'available' ? '✅ Bo\'sh' : room.status === 'occupied' ? '🔴 Band' : '🔧 Tamir'}
                </span>
              </div>
              <div className="item-info">🛏️ Asbob-uskunalar: {room.amenities}</div>
              <div className="item-actions">
                <button className="btn-secondary" onClick={(e) => {
                  e.stopPropagation()
                  setSelectedRoom(room)
                }}>
                  Batafsil
                </button>
                <button className="btn-danger" onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteRoom(room._id)
                }}>
                  O'chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <RoomModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleAddRoom}
          title="Yangi Xona Qo'shish"
        />
      )}

      {selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onUpdate={updateRoom}
          onDelete={deleteRoom}
        />
      )}
    </div>
  )
}

export default RoomsList
