// API client for backend - works with both localStorage fallback and real DB
const API_URL = import.meta.env.VITE_API_URL || ''

export const isApiEnabled = () => Boolean(API_URL)

function getAuthHeader() {
  const token = localStorage.getItem('exp_admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, { method = 'GET', body, auth = false, isPublic = true } = {}) {
  if (!isApiEnabled()) throw new Error('API not enabled')
  const headers = { 'Content-Type': 'application/json', ...getAuthHeader() }
  // For public GET, no auth needed
  if (isPublic && method === 'GET') {
    delete headers.Authorization
  }
  if (auth) {
    // need token, if missing throw
    if (!getAuthHeader().Authorization) throw new Error('No token')
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })
  const data = await res.json().catch(()=>({}))
  if (!res.ok) throw new Error(data.message || `API error ${res.status}`)
  return data
}

export const api = {
  // Auth
  login: (username, password) => request('/api/auth/login', { method: 'POST', body: { username, password }, isPublic: true }),
  changePassword: (oldPassword, newPassword, newUsername) => request('/api/auth/change-password', { method: 'POST', body: { oldPassword, newPassword, newUsername }, auth: true }),

  // Viewer
  getViewer: () => request('/api/viewer', { isPublic: true }),
  incrementViewer: () => request('/api/viewer/increment', { method: 'POST', isPublic: true }),

  // Messages
  createMessage: (data) => request('/api/messages', { method: 'POST', body: data, isPublic: true }),
  getMessages: () => request('/api/messages', { auth: true }),
  updateMessage: (id, data) => request(`/api/messages/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteMessage: (id) => request(`/api/messages/${id}`, { method: 'DELETE', auth: true }),

  // Classes
  getClasses: () => request('/api/classes', { isPublic: true }),
  createClass: (data) => request('/api/classes', { method: 'POST', body: data, auth: true }),
  updateClass: (id, data) => request(`/api/classes/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteClass: (id) => request(`/api/classes/${id}`, { method: 'DELETE', auth: true }),

  // Subjects
  getSubjects: (classId) => request(`/api/subjects?classId=${classId || ''}`, { isPublic: true }),
  getAllSubjects: () => request('/api/subjects', { isPublic: true }),
  createSubject: (data) => request('/api/subjects', { method: 'POST', body: data, auth: true }),
  updateSubject: (id, data) => request(`/api/subjects/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteSubject: (id) => request(`/api/subjects/${id}`, { method: 'DELETE', auth: true }),

  // Chapters
  getChapters: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/api/chapters${q ? `?${q}` : ''}`, { isPublic: true })
  },
  createChapter: (data) => request('/api/chapters', { method: 'POST', body: data, auth: true }),
  updateChapter: (id, data) => request(`/api/chapters/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteChapter: (id) => request(`/api/chapters/${id}`, { method: 'DELETE', auth: true }),

  // Projects
  getProjects: () => request('/api/projects', { isPublic: true }),
  createProject: (data) => request('/api/projects', { method: 'POST', body: data, auth: true }),
  updateProject: (id, data) => request(`/api/projects/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteProject: (id) => request(`/api/projects/${id}`, { method: 'DELETE', auth: true }),

  // Ads
  getAds: () => request('/api/ads', { isPublic: true }),
  createAd: (data) => request('/api/ads', { method: 'POST', body: data, auth: true }),
  updateAd: (id, data) => request(`/api/ads/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteAd: (id) => request(`/api/ads/${id}`, { method: 'DELETE', auth: true }),

  // Logs
  getLogs: () => request('/api/logs', { isPublic: true }),
  createLog: (data) => request('/api/logs', { method: 'POST', body: data, auth: true }),
  updateLog: (id, data) => request(`/api/logs/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteLog: (id) => request(`/api/logs/${id}`, { method: 'DELETE', auth: true }),

  // Experience
  getExperience: () => request('/api/experience', { isPublic: true }),
  createExperience: (data) => request('/api/experience', { method: 'POST', body: data, auth: true }),
  updateExperience: (id, data) => request(`/api/experience/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteExperience: (id) => request(`/api/experience/${id}`, { method: 'DELETE', auth: true }),

  // Education
  getEducation: () => request('/api/education', { isPublic: true }),
  createEducation: (data) => request('/api/education', { method: 'POST', body: data, auth: true }),
  updateEducation: (id, data) => request(`/api/education/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteEducation: (id) => request(`/api/education/${id}`, { method: 'DELETE', auth: true }),

  // Engaged
  getEngaged: () => request('/api/engaged', { isPublic: true }),
  createEngaged: (data) => request('/api/engaged', { method: 'POST', body: data, auth: true }),
  updateEngaged: (id, data) => request(`/api/engaged/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteEngaged: (id) => request(`/api/engaged/${id}`, { method: 'DELETE', auth: true }),

  // Config (personal, skills, etc)
  getConfig: (key) => request(`/api/config/${key}`, { isPublic: true }),
  getAllConfigs: () => request('/api/config', { isPublic: true }),
  saveConfig: (key, data) => request(`/api/config/${key}`, { method: 'PUT', body: { data }, auth: true }),

  // Upload
  uploadFile: async (file) => {
    if (!isApiEnabled()) throw new Error('API not enabled')
    const form = new FormData()
    form.append('file', file)
    const token = localStorage.getItem('exp_admin_token')
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message)
    return data
  }
}
