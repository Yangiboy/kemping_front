import { useState } from 'react'

function CheckoutModal({ guest, onClose, onCheckout }) {
  const [notes, setNotes] = useState('')
  
  // Calculate remaining days and hours
  const today = new Date()
  const checkInDate = new Date(guest.checkInDate)
  
  const timeDiff = today.getTime() - checkInDate.getTime()
  const totalDays = parseInt(guest.stayDuration || 0)
  const checkOutDate = new Date(checkInDate)
  checkOutDate.setDate(checkOutDate.getDate() + totalDays)
  
  const remainingTimeDiff = checkOutDate.getTime() - today.getTime()
  const remainingDays = Math.floor(remainingTimeDiff / (1000 * 60 * 60 * 24))
  const remainingHours = Math.floor((remainingTimeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  const [editableRemainingDays, setEditableRemainingDays] = useState(remainingDays)
  const [editableRemainingHours, setEditableRemainingHours] = useState(remainingHours)
  const [editablePricePerDay, setEditablePricePerDay] = useState(guest.pricePerDay || 100000)
  const [editingPrice, setEditingPrice] = useState(false)
  const [editingTotal, setEditingTotal] = useState(false)
  
  // Calculate total based on editable values (days only, not hours)
  const totalAmount = editableRemainingDays * editablePricePerDay
  
  const handleTotalChange = (e) => {
    const newTotal = parseInt(e.target.value) || 0
    if (editableRemainingDays > 0) {
      setEditablePricePerDay(Math.round(newTotal / editableRemainingDays))
    }
  }
  
  const handlePricePerDayChange = (e) => {
    const newPrice = parseInt(e.target.value) || 0
    setEditablePricePerDay(newPrice)
  }
  
  const handleRemainingDaysChange = (e) => {
    let newDays = parseInt(e.target.value) || 0
    if (newDays < 0) {
      newDays = 0
    }
    setEditableRemainingDays(newDays)
  }
  
  const handleRemainingHoursChange = (e) => {
    const newHours = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 23)
    setEditableRemainingHours(newHours)
  }

  const handleCheckout = () => {
    onCheckout({
      remainingDays: editableRemainingDays,
      remainingHours: editableRemainingHours,
      pricePerDay: editablePricePerDay,
      totalAmount,
      notes
    })
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Mehmon Ketish - {guest.fullName}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="checkout-details">
            <div className="checkout-field">
              <label>Qolgan Kunlari:</label>
              <div className="checkout-time-input">
                <div className="time-input-group">
                  <input
                    type="number"
                    value={editableRemainingDays}
                    onChange={handleRemainingDaysChange}
                    min="0"
                    className="time-input"
                  />
                  <span className="time-label">kun</span>
                </div>
              </div>
            </div>
            <div className="checkout-divider"></div>
            <div className="checkout-field">
              <label>Kunlik Xona Narxi (so'm):</label>
              {editingPrice ? (
                <input
                  type="number"
                  value={editablePricePerDay}
                  onChange={handlePricePerDayChange}
                  onBlur={() => setEditingPrice(false)}
                  min="1"
                  className="checkout-input"
                  autoFocus
                />
              ) : (
                <div 
                  className="checkout-display-value"
                  onClick={() => setEditingPrice(true)}
                >
                  {editablePricePerDay.toLocaleString('uz-UZ')} so'm
                </div>
              )}
            </div>
            <div className="checkout-field">
              <label>Jami Tulanishi Kerak (so'm):</label>
              {editingTotal ? (
                <input
                  type="number"
                  value={totalAmount}
                  onChange={handleTotalChange}
                  onBlur={() => setEditingTotal(false)}
                  min="1"
                  className="checkout-input"
                  autoFocus
                />
              ) : (
                <div 
                  className="checkout-display-value"
                  onClick={() => setEditingTotal(true)}
                >
                  {totalAmount.toLocaleString('uz-UZ')} so'm
                </div>
              )}
            </div>
            <div className="checkout-divider"></div>
            <div className="checkout-field">
              <label>Izoh (Ixtiyoriy)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Izoh yozing..."
                rows="4"
                className="checkout-notes"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Bekor qilish</button>
          <button className="btn-success" onClick={handleCheckout}>Tulov Qabul Qil</button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal
