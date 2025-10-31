import { createContext } from "react"
type AuthContextType = {
  isLoggedIn: boolean
  verify: () => Promise<void>
  login: (isLoggedIn: boolean) => void
}
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  verify: async () => {},
  login: () => {},
})
