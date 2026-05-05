import './Sidebar.css'

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>🏨 Mehmonxona</h1>
      </div>
      <ul className="sidebar-menu">
        <li>
          <button
            className={`menu-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            📊 Bosh Sahifa
          </button>
        </li>
        <li>
          <button
            className={`menu-item ${currentPage === 'guests' ? 'active' : ''}`}
            onClick={() => setCurrentPage('guests')}
          >
            👥 Mehmonlar
          </button>
        </li>
        <li>
          <button
            className={`menu-item ${currentPage === 'rooms' ? 'active' : ''}`}
            onClick={() => setCurrentPage('rooms')}
          >
            🛏️ Xonalar
          </button>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
