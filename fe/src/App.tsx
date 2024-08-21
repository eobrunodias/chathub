import { User, UserContextData } from "./@types"
import { createContext, useState } from "react"
import Login from "./components/Login"
import { Home } from "./components/Home"

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function App() {
  const [user, setUser] = useState<User | null>(null)

  async function login(name: string) {
    const data = await fetch("http://localhost:3333/users", {
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
      <h1>WebSocket</h1>
      <UserContext.Provider value={{ user, login, logout }}>
        {user ? <Home /> : <Login />}
      </UserContext.Provider>
    </div>
  )
}
