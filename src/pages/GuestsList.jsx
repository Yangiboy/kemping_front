import { useState } from 'react'
import GuestModal from '../components/GuestModal'
import GuestDetailsModal from '../components/GuestDetailsModal'

function GuestsList({ guests, addGuest, updateGuest, deleteGuest, rooms }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    country: "O'zbekiston",
    passport: '',
    fullName: '',
    dateOfBirth: '',
    checkInDate: new Date().toISOString().split('T')[0],
    stayDuration: '',
    roomId: '',
    pricePerDay: 100000
  })

  // Calculate guest status based on backend's status field
  const getGuestStatus = (guest) => {
    if (guest.status === 'checkout') {
      return { status: '✅ Ketgan', className: 'status-checkout' }
    } else {
      return { status: '🏢 Mavjud', className: 'status-present' }
    }
  }

  // Filter guests based on search term
  const filteredGuests = guests
    .filter(guest => {
      const search = searchTerm.toLowerCase()
      return (
        guest.fullName.toLowerCase().includes(search) ||
        guest.passport.toLowerCase().includes(search) ||
        (guest.country && guest.country.toLowerCase().includes(search))
      )
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date added, newest first

  const handleAddGuest = () => {
    if (formData.fullName && formData.passport) {
      addGuest(formData)
      setFormData({
        country: "O'zbekiston",
        passport: '',
        fullName: '',
        dateOfBirth: '',
        checkInDate: new Date().toISOString().split('T')[0],
        stayDuration: '',
        roomId: '',
        pricePerDay: 100000
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
      [name]: (name === 'stayDuration' || name === 'pricePerDay' || name === 'roomId') ? (name === 'roomId' ? value : parseInt(value) || '') : value
    }))
  }

  const handleDeleteGuest = (id) => {
    if (confirm('Siz ushbu mehmonni o\'chirmoqchisiz?')) {
      deleteGuest(id)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>Mehmonlar</h2>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Ism, Passport yoki Davlat bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
            ➕ Mehmon Qo'shish
          </button>
        </div>
      </div>

      {guests.length === 0 ? (
        <div className="empty-state">
          <h3>Hech qanday mehmon mavjud emas</h3>
          <p>Mehmon qo'shish uchun "Mehmon Qo'shish" tugmasini bosing</p>
        </div>
      ) : filteredGuests.length === 0 ? (
        <div className="empty-state">
          <h3>Qidiruv natijalari topilmadi</h3>
          <p>"{searchTerm}" uchun hech qanday mehmon topilmadi</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="guests-table">
            <thead>
              <tr>
                <th>Ism Familiya</th>
                <th className="hide-mobile">Passport</th>
                <th className="hide-mobile">Tugilgan Kun</th>
                <th>Kelish Kuni</th>
                <th className="hide-mobile">Qolish Muddati</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map(guest => {
                const { status, className } = getGuestStatus(guest)
                return (
                  <tr key={guest._id} onClick={() => setSelectedGuest(guest)} className="guest-row">
                    <td className="guest-name">{guest.fullName}</td>
                    <td className="hide-mobile">{guest.passport}</td>
                    <td className="hide-mobile">{guest.dateOfBirth}</td>
                    <td>{guest.checkInDate}</td>
                    <td className="hide-mobile">{guest.stayDuration} kun</td>
                    <td className={`status-cell ${className}`}>
                      <span className="status-badge">{status}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <GuestModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleAddGuest}
          title="Yangi Mehmon Qo'shish"
          rooms={rooms}
        />
      )}

      {selectedGuest && (
        <GuestDetailsModal
          guest={selectedGuest}
          onClose={() => setSelectedGuest(null)}
          onUpdate={updateGuest}
          onDelete={deleteGuest}
        />
      )}
    </div>
  )
}

export default GuestsList
