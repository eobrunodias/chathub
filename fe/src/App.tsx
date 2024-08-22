import "./index.css"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { Footer } from "./components/Footer"
import { createContext, useState } from "react"
import { Header } from "./components/Header"

export type User = {
  _id: string
  name: string
}

type UserContextData = {
  user: User | null
  login: (name: string) => Promise<void>
  logout: () => void
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function App() {
  const [user, setUser] = useState<User | null>(null)

  async function login(name: string) {
    const data = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }).then((res) => res.json())

    setUser(data)
  }

  function logout() {
    setUser(null)
  }

  return (
    <div className="App">
      <Header />
      <UserContext.Provider value={{ user, login, logout }}>
        {user ? <Home /> : <Login />}
      </UserContext.Provider>
      <Footer />
    </div>
  )
}
