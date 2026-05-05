function Dashboard({ guests, rooms }) {
  const totalGuests = guests.length
  const totalRooms = rooms.length
  const availableRooms = rooms.filter(r => r.status === 'available').length
  
  // Joriy oy daromadini hisoblash
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  
  const monthlyRevenue = guests.reduce((sum, g) => {
    let guestRevenue = 0
    
    if (g.checkInDate) {
      const checkInDate = new Date(g.checkInDate)
      const checkInMonth = checkInDate.getMonth()
      const checkInYear = checkInDate.getFullYear()
      
      // Agar mehmon bu oy kelgan bo'lsa
      if (checkInMonth === currentMonth && checkInYear === currentYear) {
        if (g.status === 'present') {
          guestRevenue = g.stayDuration * (g.pricePerDay || 100000)
        } else if (g.status === 'checkout' && g.checkoutDetails) {
          guestRevenue = g.checkoutDetails.totalAmount || 0
        }
      }
    }
    
    return sum + guestRevenue
  }, 0)

  return (
    <div className="page">
      <div className="page-header">
        <h2>Bosh Sahifa</h2>
      </div>

      <div className="dashboard">
        <div className="stat-card guests">
          <h3>Jami Mehmonlar</h3>
          <p className="value">{totalGuests}</p>
        </div>
        <div className="stat-card rooms">
          <h3>Jami Xonalar</h3>
          <p className="value">{totalRooms}</p>
        </div>
        <div className="stat-card rooms">
          <h3>Bo'sh Xonalar</h3>
          <p className="value">{availableRooms}</p>
        </div>
        <div className="stat-card revenue">
          <h3>Bu Oyning Daromadi</h3>
          <p className="value">{monthlyRevenue.toLocaleString()} so'm</p>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '20px' }}>So'nggi Mehmonlar</h3>
        <div className="items-grid">
          {guests.slice(-3).reverse().map(guest => (
            <div key={guest._id} className="item-card">
              <h3>{guest.fullName}</h3>
              <div className="item-info">📋 Passport: {guest.passport}</div>
              <div className="item-info">📅 Kelish: {guest.checkInDate}</div>
              <div className="item-info">⏱️ Muddati: {guest.stayDuration} kun</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
