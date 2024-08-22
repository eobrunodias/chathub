import { FormEvent, useContext } from "react"
import { UserContext } from "../App"
import { IoEnterOutline } from "react-icons/io5"

export function Login() {
  const { login } = useContext(UserContext)

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const name = formData.get("name")!.toString()
    login(name)
  }
  return (
    <div className="min-h-screen-minus-header flex flex-col justify-center items-center bg-slate-900">
      <div className="px-4 w-full py-8 max-w-7xl my-0 mx-auto ">
        <h2 className="text-2xl mb-4 text-white text-center">
          Create your user to start! 😃
        </h2>
        <form className="inline-form" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <input
              className="input-text"
              type="text"
              name="name"
              id="name"
              placeholder="Type your username"
              required
            />
            <button className="btn-input-text">
              <IoEnterOutline size={32} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
