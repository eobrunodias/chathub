export type User = {
  _id: string
  name: string
}

export type UserContextData = {
  user: User | null
  login: (name: string) => Promise<void>
  logout: () => void
}
