"use client"
import { useState } from "react"
import { UserApi } from "../../../server/users"
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"

type AuthFormProps = {
  allowDemo: boolean
  type: "login" | "signup"
}

export const AuthForm = (props: AuthFormProps) => {
  const user = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors: { email?: string; password?: string } = {}

    // Validate password
    if (password.length < 8 || password.length > 32) {
      validationErrors.password = "Password must be between 8 and 32 characters"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    }

    if (props.type === "login") {
      try {
        await UserApi.login({ email, password })
        user.login(true)
        router.push("/applications")
      } catch (error) {
        console.error("Login failed:", error)
      }
    } else {
      try {
        await UserApi.register({ email, password })
        user.login(true)
        router.push("/applications")
      } catch (error) {
        console.error("Registration failed:", error)
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
      {props.allowDemo && (
        <button
          onClick={async () => {
            try {
              await UserApi.login({
                email: "test@mail.com",
                password: "password",
              })
              user.login(true)
              router.push("/applications")
            } catch (error) {
              console.error("Demo login failed", error)
            }
          }}
        >
          Demo
        </button>
      )}
    </div>
  )
}
