import { useState, useEffect } from 'react'
import CheckoutModal from './CheckoutModal'

const countries = [
  "Afg'oniston",
  "Albaniya",
  "Jazoir",
  "Amerika Samoasi",
  "Andorra",
  "Angola",
  "Angliya",
  "Qadimgi va Barbuda",
  "Argentina",
  "Armaniston",
  "Aruba",
  "Avstraliya",
  "Avstriya",
  "Ozarbayjon",
  "Bagama orollari",
  "Bahrayn",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgiya",
  "Beliz",
  "Benin",
  "Bermuda",
  "Butan",
  "Boliviya",
  "Bosniya va Gertsegovina",
  "Botsvana",
  "Braziliya",
  "Bruney-Darussalam",
  "Bolgariya",
  "Burkina-Faso",
  "Burundi",
  "Kambodja",
  "Kamerun",
  "Kanada",
  "Kabo-Verde",
  "Kayman orollari",
  "Markaziy Afrika Respublikasi",
  "Chad",
  "Chili",
  "Xitoy",
  "Kokos (Kiling) orollari",
  "Kolumbiya",
  "Komor orollari",
  "Kongo",
  "Kuk orollari",
  "Kosta-Rika",
  "Fil Suyagi sohili",
  "Xorvatiya",
  "Kuba",
  "Kipr",
  "Chexiya",
  "Daniya",
  "Jibuti",
  "Dominika",
  "Dominikan Respublikasi",
  "Kongo Demokratik Respublikasi",
  "Ekvador",
  "Misr",
  "Najotkor",
  "Ekvatorial Gvineya",
  "Eritreya",
  "Estoniya",
  "Efiopiya",
  "Fiji",
  "Finlyandiya",
  "Fransiya",
  "Fransiya Gvianasi",
  "Fransiya Polineziyasi",
  "Gabon",
  "Gambiya",
  "Gruziya",
  "Germaniya",
  "Gana",
  "Gretsiya",
  "Grenada",
  "Gvatemala",
  "Gvineya",
  "Gvineya-Bisau",
  "Gayana",
  "Gaiti",
  "Muqaddas Taxt (Vatikan shahri Davlat)",
  "Gonduras",
  "Gonkong",
  "Vengriya",
  "Islandiya",
  "Hindiston",
  "Indoneziya",
  "Eron, Islom Respublikasi",
  "Iroq",
  "Irlandiya",
  "Isroil",
  "Italiya",
  "Yamayka",
  "Yaponiya",
  "Iordaniya",
  "Qozog'iston",
  "Keniya",
  "Kiribati",
  "Koreya, Xalq Demokratik Respublikasi",
  "Koreya Respublikasi",
  "Quvayt",
  "Qirg'iziston",
  "Laos",
  "Laos Xalq Demokratik Respublikasi",
  "Latviya",
  "Livan",
  "Lesoto",
  "Liberiya",
  "Liviya Arab Respublikasi",
  "Lixtenshteyn",
  "Litva",
  "Lyuksemburg",
  "Makao",
  "Makedoniya, Sobiq Yugoslaviya Respublikasi",
  "Madagaskar",
  "Malavi",
  "Malayziya",
  "Maldiv orollari",
  "Mali",
  "Malta",
  "Marshall orollari",
  "Mavritaniya",
  "Mavrikiy",
  "Meksika",
  "Mikroneziya, Federativ Shtatlar",
  "Moldova, Respublikasi",
  "Monako",
  "Mo'g'uliston",
  "Montserrat",
  "Marokash",
  "Mozambik",
  "Myanma",
  "Namibiya",
  "Nauru",
  "Nepal",
  "Niderlandiya",
  "Niderlandiya Vest-Indiya",
  "Yangi Zelandiya",
  "Nikaragua",
  "Nigeriya",
  "Niue",
  "Shimoliy Mariana orollari",
  "Norvegiya",
  "Bosib olingan Falastin hududlari",
  "Ummon",
  "Pokistan",
  "Palau",
  "Panama",
  "Papau-Yangi Gvineya",
  "Paragvay",
  "Peru",
  "Filippin",
  "Polsha",
  "Portugaliya",
  "Puerto-Riko",
  "Qatar",
  "Reyunion",
  "Ruminiya",
  "Rossiya Federatsiyasi",
  "Ruanda",
  "Sent-Kits va Nevis",
  "Sent-Lyusiya",
  "Sent-Vinsent va Grenadin orollari",
  "Samoa",
  "San-Marino",
  "San-Tome va shahzoda",
  "Saudiya Arabistoni",
  "Senegal",
  "Serbiya va Chernogoriya",
  "Seyshel orollari",
  "Syerra-Leone",
  "Singapur",
  "Slovakiya",
  "Sloveniya",
  "Solomon orollari",
  "Somali",
  "Janubiy Afrika",
  "Janubiy Sudan",
  "Ispaniya",
  "Shri-Lanka",
  "Sudan",
  "Surinam",
  "Svazilend",
  "Shvetsiya",
  "Shveytsariya",
  "Suriya Arab Respublikasi",
  "Tayvan",
  "Tojikiston",
  "Tanzaniya",
  "Tailand",
  "Timor-Sharqiy",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad va Tobago",
  "Tunis",
  "Turkiya",
  "Turkmaniston",
  "Turks va Kaykos orollari",
  "Tuvalu",
  "Uganda",
  "Ukraina",
  "Birlashgan Arab Amirliklari",
  "Birlashgan Qirollik",
  "Amerika Qo'shma Shtatlari",
  "Amerika Qo'shma Shtatlarining Kichik Chet orollari",
  "Urugvay",
  "O'zbekiston",
  "Vanuatu",
  "Venesuela",
  "Vetnam",
  "Virjiniya orollari, Britaniya",
  "Virjiniya orollari, AQSH",
  "G'arbiy Sahara",
  "Yaman",
  "Zambiya",
  "Zimbabve"
].sort()

function GuestDetailsModal({ guest, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(guest)
  const [showCheckout, setShowCheckout] = useState(false)

  // Sync editData with guest prop when guest changes
  useEffect(() => {
    setEditData(guest)
  }, [guest])

  // Calculate guest status using backend's status field
  const getGuestStatus = () => {
    return guest.status || 'present'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: name === 'stayDuration' || name === 'pricePerDay' ? parseInt(value) : value
    }))
  }

  const handleSave = () => {
    onUpdate(guest._id, editData)
    setIsEditing(false)
  }

  const handleCheckout = (checkoutData) => {
    // Update guest to set status to "Ketgan" (checkout) and save checkout details
    onUpdate(guest._id, { 
      stayDuration: 0,
      checkoutDetails: {
        remainingDays: checkoutData.remainingDays,
        pricePerDay: checkoutData.pricePerDay,
        totalAmount: checkoutData.totalAmount,
        notes: checkoutData.notes
      }
    })
    // Close both modals
    setTimeout(() => {
      setShowCheckout(false)
      onClose()
    }, 100)
    console.log('Checkout:', checkoutData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{isEditing ? 'Mehmonni Tahrirlash' : guest.fullName}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {!isEditing ? (
            <div className="details-grid">
              <div className="detail-field">
                <div className="detail-label">Davlat</div>
                <div className="detail-value">{guest.country || 'Belgilanmagan'}</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Passport</div>
                <div className="detail-value">{guest.passport}</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Tugilgan Kun</div>
                <div className="detail-value">{guest.dateOfBirth || 'Belgilanmagan'}</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Ism Familiya</div>
                <div className="detail-value">{guest.fullName}</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Kelish Kuni</div>
                <div className="detail-value">{guest.checkInDate}</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Qolish Muddati</div>
                <div className="detail-value">{guest.stayDuration} kun</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">Kunlik Narxi</div>
                <div className="detail-value">{(guest.pricePerDay || 100000).toLocaleString()} so'm</div>
              </div>
              {getGuestStatus() === 'checkout' && guest.checkoutDetails && (
                <>
                  <div className="checkout-section-divider"></div>
                  <div className="detail-field">
                    <div className="detail-label">Qolgan Kunlari</div>
                    <div className="detail-value">{guest.checkoutDetails.remainingDays} kun</div>
                  </div>
                  <div className="detail-field">
                    <div className="detail-label">Tulangan Summa</div>
                    <div className="detail-value total-amount">{guest.checkoutDetails.totalAmount.toLocaleString()} so'm</div>
                  </div>
                  {guest.checkoutDetails.notes && (
                    <div className="detail-field">
                      <div className="detail-label">Izoh</div>
                      <div className="detail-value notes-text">{guest.checkoutDetails.notes}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              {getGuestStatus() === 'checkout' ? (
                <div className="form-group">
                  <label>Izoh</label>
                  <textarea
                    name="checkoutNotes"
                    value={editData.checkoutDetails?.notes || ''}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      checkoutDetails: { ...prev.checkoutDetails, notes: e.target.value }
                    }))}
                    rows="4"
                    placeholder="Izoh qo'shing..."
                  />
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label>Qaysi davlat fukarosi</label>
                    <select
                      name="country"
                      value={editData.country}
                      onChange={handleInputChange}
                    >
                      <option value="">Davlatni tanlang</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Passport Seriyasi va Raqami</label>
                    <input
                      type="text"
                      name="passport"
                      value={editData.passport}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tugilgan Kun</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Ism Familiya</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Kelish Kuni</label>
                    <input
                      type="date"
                      name="checkInDate"
                      value={editData.checkInDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Qolish Muddati (kun)</label>
                    <input
                      type="number"
                      name="stayDuration"
                      value={editData.stayDuration}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Kunlik Xona Narxi (so'm)</label>
                    <input
                      type="number"
                      name="pricePerDay"
                      value={editData.pricePerDay || 100000}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="modal-footer">
          {!isEditing ? (
            <>
              {getGuestStatus() === 'present' && (
                <button className="btn-warning" onClick={() => setShowCheckout(true)}>Ketmoqchi 🚪</button>
              )}
              <button className="btn-primary" onClick={() => setIsEditing(true)}>Tahrirlash</button>
              {getGuestStatus() !== 'checkout' && (
                <button className="btn-secondary" onClick={onClose}>Yopish</button>
              )}
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => setIsEditing(false)}>Bekor qilish</button>
              <button className="btn-success" onClick={handleSave}>Saqlash</button>
            </>
          )}
        </div>

        {showCheckout && (
          <CheckoutModal
            guest={guest}
            onClose={() => setShowCheckout(false)}
            onCheckout={handleCheckout}
          />
        )}
      </div>
    </div>
  )
}

export default GuestDetailsModal
