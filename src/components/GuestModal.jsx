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

import { useState, useRef, useEffect } from 'react'

function GuestModal({ isOpen, onClose, formData, onInputChange, onSubmit, title, rooms = [] }) {
  const [countrySearch, setCountrySearch] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Initialize country search with the selected country value
  useEffect(() => {
    setCountrySearch(formData.country || '')
  }, [formData.country])

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  )

  const handleCountrySelect = (country) => {
    onInputChange({ target: { name: 'country', value: country } })
    setCountrySearch(country)
    setShowCountryDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false)
      }
    }

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCountryDropdown])

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
            <label>Qaysi davlat fukarosi *</label>
            <div className="searchable-dropdown" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Davlatni qidirish..."
                value={countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value)
                  setShowCountryDropdown(true)
                }}
                onFocus={() => setShowCountryDropdown(true)}
                className="dropdown-input"
              />
              {showCountryDropdown && (
                <div className="dropdown-options">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                      <div
                        key={index}
                        className={`dropdown-option ${formData.country === country ? 'selected' : ''}`}
                        onClick={() => handleCountrySelect(country)}
                      >
                        {country}
                      </div>
                    ))
                  ) : (
                    <div className="dropdown-no-results">Davlat topilmadi</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Passport Seriyasi va Raqami *</label>
            <input
              type="text"
              name="passport"
              value={formData.passport}
              onChange={onInputChange}
              placeholder="Masalan: AA123456"
            />
          </div>
          <div className="form-group">
            <label>Tugilgan Kun</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <label>Ism Familiya *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onInputChange}
              placeholder="Masalan: Alijon Aliyev"
            />
          </div>
          <div className="form-group">
            <label>Kelish Kuni *</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <label>Qolish Muddati (kun) *</label>
            <input
              type="number"
              name="stayDuration"
              value={formData.stayDuration}
              onChange={onInputChange}
              placeholder="Masalan: 5"
              min="1"
            />
          </div>
          <div className="form-group">
            <label>Xona Tanlang *</label>
            <select
              name="roomId"
              value={formData.roomId || ''}
              onChange={(e) => {
                const selectedRoom = rooms.find(r => r._id === e.target.value)
                onInputChange({
                  target: {
                    name: 'roomId',
                    value: e.target.value
                  }
                })
                if (selectedRoom) {
                  onInputChange({
                    target: {
                      name: 'pricePerDay',
                      value: selectedRoom.pricePerDay.toString()
                    }
                  })
                }
              }}
            >
              <option value="">Xona tanlang</option>
              {rooms.filter(room => room.status === 'available').map(room => (
                <option key={room._id} value={room._id}>
                  {room.roomNumber} - {room.pricePerDay.toLocaleString()} so'm/kun ({room.capacity} o'rin)
                </option>
              ))}
            </select>
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

export default GuestModal
