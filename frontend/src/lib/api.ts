import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface Project {
  id: number
  title: string
  slug: string
  description: string
  content: string
  image: string | null
  url: string | null
  github_url: string | null
  is_published: boolean
  skills: Skill[]
  created_at: string
}

export interface Skill {
  id: number
  name: string
  icon: string | null
  proficiency: number | null
  category: Category
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export interface Certification {
  id: number
  name: string
  issuer: string
  issue_date: string
  expiration_date: string | null
  credential_id: string | null
  credential_url: string | null
  image: string | null
  created_at: string
}
