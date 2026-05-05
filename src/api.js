const API_BASE_URL = 'http://localhost:5000/api'

export const apiCall = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'API error')
    }
    
    return await response.json()
  } catch (err) {
    console.error('API Error:', err)
    throw err
  }
}

// Guest API Functions
export const guestAPI = {
  getAll: () => apiCall('/guests'),
  getById: (id) => apiCall(`/guests/${id}`),
  create: (data) => apiCall('/guests', 'POST', data),
  update: (id, data) => apiCall(`/guests/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/guests/${id}`, 'DELETE'),
  search: (q) => apiCall(`/guests/search?q=${q}`),
  getDashboardStats: () => apiCall('/guests/stats/dashboard'),
  getPersonByPassport: (seria, number, dateOfBirth) => apiCall('/guests/info/passport', 'POST', {
    seria,
    number,
    dateOfBirth
  })
}

// Room API Functions
export const roomAPI = {
  getAll: () => apiCall('/rooms'),
  getById: (id) => apiCall(`/rooms/${id}`),
  create: (data) => apiCall('/rooms', 'POST', data),
  update: (id, data) => apiCall(`/rooms/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/rooms/${id}`, 'DELETE'),
  getAvailable: () => apiCall('/rooms/available')
}
