export interface Birthday {
  id: string
  first_name: string
  last_name: string
  photo_url: string | null
  birth_date: string
  phone: string | null
  email: string | null
  notification_time: string
  notification_enabled: boolean
  created_at: string
  updated_at: string
}

export type ViewMode = "cards" | "list" | "table"

export interface Settings {
  id: string
  key: string
  value: string
  created_at: string
  updated_at: string
}
