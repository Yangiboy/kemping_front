function RoomModal({ isOpen, onClose, formData, onInputChange, onSubmit, title }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Xona Raqami *</label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={onInputChange}
              placeholder="Masalan: 101"
            />
          </div>
          <div className="form-group">
            <label>Sig'imi (kishi) *</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={onInputChange}
              placeholder="Masalan: 2"
              min="1"
            />
          </div>
          <div className="form-group">
            <label>Narxi (so'm/kun) *</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={onInputChange}
              placeholder="Masalan: 100000"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Holati</label>
            <select name="status" value={formData.status} onChange={onInputChange}>
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
              value={formData.amenities}
              onChange={onInputChange}
              placeholder="Masalan: WiFi, TV, AC, Mini-friJ"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Bekor qilish</button>
          <button className="btn-primary" onClick={onSubmit}>Saqlash</button>
        </div>
      </div>
    </div>
  )
}

export default RoomModal
