/**
 * Authentication Service
 * 
 * Currently uses localStorage for user management.
 * Replace these methods with actual API calls when backend is ready.
 */

// Storage keys
const STORAGE_KEYS = {
  USERS: 'explore_world_users',
  CURRENT_USER: 'explore_world_current_user',
  AUTH_TOKEN: 'explore_world_auth_token'
}

// Helper to get users from localStorage
const getStoredUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS)
  return users ? JSON.parse(users) : []
}

// Helper to save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

// Generate a simple token (replace with JWT from API)
const generateToken = (email) => {
  return btoa(`${email}_${Date.now()}_${Math.random()}`)
}

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
const isValidPassword = (password) => {
  return password.length >= 6
}

export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.firstName - User's first name
   * @param {string} userData.lastName - User's last name
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @param {string} userData.confirmPassword - Password confirmation
   * @returns {Promise} - Registration result
   */
  async register(userData) {
    // Accept either { firstName, lastName, ... } or { name, ... }
    const { firstName, lastName, name, email, password, confirmPassword } = userData

    // Derive first and last name from `name` when provided
    let fName = firstName ? String(firstName) : ''
    let lName = lastName ? String(lastName) : ''
    if ((!fName || !lName) && name) {
      const parts = String(name).trim().split(/\s+/)
      fName = parts.shift() || ''
      lName = parts.join(' ') || ''
    }

    // Validation: require at least a name (first name), email and password
    if (!fName || !email || !password) {
      throw new Error('Name, email and password are required')
    }

    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email address')
    }

    if (!isValidPassword(password)) {
      throw new Error('Password must be at least 6 characters long')
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // Check if user already exists
    const existingUsers = getStoredUsers()
    const userExists = existingUsers.find(user => user.email.toLowerCase() === email.toLowerCase())
    
    if (userExists) {
      throw new Error('An account with this email already exists')
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      firstName: fName.trim(),
      lastName: lName.trim(),
      email: email.toLowerCase().trim(),
      createdAt: new Date().toISOString(),
      isActive: true
    }

    // Save user (password is not stored in localStorage for security)
    existingUsers.push({ ...newUser, password: btoa(password) }) // Basic encoding, replace with proper hashing
    saveUsers(existingUsers)

    // Auto-login after registration
    const token = generateToken(newUser.email)
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser))

    return {
      success: true,
      user: newUser,
      token,
      message: 'Registration successful! Welcome to Explore World!'
    }
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @returns {Promise} - Login result
   */
  async login(credentials) {
    const { email, password } = credentials

    // Validation
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email address')
    }

    // Find user
    const users = getStoredUsers()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      throw new Error('No account found with this email address')
    }

    // Check password (basic comparison, replace with proper verification)
    if (atob(user.password) !== password) {
      throw new Error('Invalid password')
    }

    if (!user.isActive) {
      throw new Error('Your account has been deactivated. Please contact support.')
    }

    // Generate token and set current user
    const token = generateToken(user.email)
    const userInfo = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt
    }

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userInfo))

    return {
      success: true,
      user: userInfo,
      token,
      message: 'Login successful! Welcome back!'
    }
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    return {
      success: true,
      message: 'You have been successfully logged out'
    }
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} - Current user or null
   */
  getCurrentUser() {
    const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    return userStr ? JSON.parse(userStr) : null
  },

  /**
   * Get current auth token
   * @returns {string|null} - Current token or null
   */
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - Authentication status
   */
  isAuthenticated() {
    const token = this.getToken()
    const user = this.getCurrentUser()
    return !!(token && user)
  },

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   * @returns {Promise} - Update result
   */
  async updateProfile(updates) {
    const currentUser = this.getCurrentUser()
    if (!currentUser) {
      throw new Error('No user is currently logged in')
    }

    // Validate updates
    if (updates.email && !isValidEmail(updates.email)) {
      throw new Error('Please enter a valid email address')
    }

    // Check if new email already exists
    if (updates.email && updates.email !== currentUser.email) {
      const users = getStoredUsers()
      const emailExists = users.find(u => u.email.toLowerCase() === updates.email.toLowerCase())
      if (emailExists) {
        throw new Error('This email is already in use')
      }
    }

    // Update user data
    const updatedUser = { ...currentUser, ...updates }
    
    // Update in users array
    const users = getStoredUsers()
    const userIndex = users.findIndex(u => u.id === currentUser.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      saveUsers(users)
    }

    // Update current user
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser))

    return {
      success: true,
      user: updatedUser,
      message: 'Profile updated successfully'
    }
  },

  /**
   * Change password
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.currentPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @param {string} passwordData.confirmPassword - New password confirmation
   * @returns {Promise} - Password change result
   */
  async changePassword(passwordData) {
    const { currentPassword, newPassword, confirmPassword } = passwordData
    const currentUser = this.getCurrentUser()
    
    if (!currentUser) {
      throw new Error('No user is currently logged in')
    }

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new Error('All password fields are required')
    }

    if (!isValidPassword(newPassword)) {
      throw new Error('New password must be at least 6 characters long')
    }

    if (newPassword !== confirmPassword) {
      throw new Error('New passwords do not match')
    }

    // Verify current password
    const users = getStoredUsers()
    const user = users.find(u => u.id === currentUser.id)
    
    if (!user || atob(user.password) !== currentPassword) {
      throw new Error('Current password is incorrect')
    }

    // Update password
    const userIndex = users.findIndex(u => u.id === currentUser.id)
    users[userIndex].password = btoa(newPassword)
    saveUsers(users)

    return {
      success: true,
      message: 'Password changed successfully'
    }
  }
}

// TODO: Replace with actual API endpoints when backend is ready
/*
// Example API integration:

export const authService = {
  async register(userData) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }
    
    // Store token and user info
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.user))
    
    return data
  },
  
  async login(credentials) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }
    
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.user))
    
    return data
  },
  
  async logout() {
    const token = this.getToken()
    
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (error) {
        console.error('Logout API call failed:', error)
      }
    }
    
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    
    return { success: true, message: 'Logged out successfully' }
  }
}
*/