import { useState } from 'react'

function RoomDetailsModal({ room, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(room)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'pricePerDay' ? parseInt(value) : value
    }))
  }

  const handleSave = () => {
    onUpdate(room._id, editData)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm('Siz ushbu xonani o\'chirmoqchisiz?')) {
      onDelete(room._id)
      onClose()
    }
  }

  const getStatusText = (status) => {
    const statuses = {
      'available': '✅ Bo\'sh',
      'occupied': '🔴 Band',
      'maintenance': '🔧 Tamir'
    }
    return statuses[status] || status
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{isEditing ? 'Xonani Tahrirlash' : `Xona #${room.roomNumber}`}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {!isEditing ? (
            <div className="details-grid">
              <div className="detail-field">
                <div className="detail-label">Xona Raqami</div>
                <div className="detail-value">{room.roomNumber}</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Sig'imi</div>
                <div className="detail-value">{room.capacity} kishi</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Narxi</div>
                <div className="detail-value">{room.pricePerDay.toLocaleString()} so'm/kun</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Holati</div>
                <div className="detail-value">
                  <span className={`status-badge status-${room.status}`}>
                    {getStatusText(room.status)}
                  </span>
                </div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Asbob-uskunalar</div>
                <div className="detail-value">{room.amenities || 'Belgilanmagan'}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Xona Raqami</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={editData.roomNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Sig'imi (kishi)</label>
                <input
                  type="number"
                  name="capacity"
                  value={editData.capacity}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>Narxi (so'm/kun)</label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={editData.pricePerDay}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Holati</label>
                <select name="status" value={editData.status} onChange={handleInputChange}>
                  <option value="available">Bo'sh</option>
                  <option value="occupied">Band</option>
                  <option value="maintenance">Tamir</option>
                </select>
              </div>
              <div className="form-group">
                <label>Asbob-uskunalar</label>
                <input
                  type="text"
                  name="amenities"
                  value={editData.amenities}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
        </div>
        <div className="modal-footer">
          {!isEditing ? (
            <>
              <button className="btn-danger" onClick={handleDelete}>O'chirish</button>
              <button className="btn-primary" onClick={() => setIsEditing(true)}>Tahrirlash</button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => setIsEditing(false)}>Bekor qilish</button>
              <button className="btn-success" onClick={handleSave}>Saqlash</button>
            </>
          )}
          <button className="btn-secondary" onClick={onClose}>Yopish</button>
        </div>
      </div>
    </div>
  )
}

export default RoomDetailsModal
