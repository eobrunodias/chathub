import { User, UserContextData } from "./@types"
import { createContext, useContext, useState } from "react"
import Login from "./components/Login"

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function Home() {
  const { user, logout } = useContext(UserContext)

  return (
    <>
      <header>
        <h2>Olá, {user!.name}! 👋</h2>
        <nav>
          <button onClick={logout}>Sair</button>
        </nav>
      </header>

      <h3 className="form-title">
        Crie um tópico para conversar sobre seus assuntos favoritos
      </h3>
      <form className="inline-form">
        <input type="text" name="title" id="title" />
        <button>Criar</button>
      </form>
    </>
  )
}

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
      <h1>WebSocket</h1>
      <UserContext.Provider value={{ user, login, logout }}>
        {user ? <Home /> : <Login />}
      </UserContext.Provider>
    </div>
  )
}
