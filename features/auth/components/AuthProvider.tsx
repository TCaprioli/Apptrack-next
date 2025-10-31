"use client"
import { useEffect, useState } from "react"
import { AuthContext } from "../context"
import { UserApi } from "../../../server/users"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const verifyUser = async () => {
    const userData = await UserApi.verify()
    setIsLoggedIn(userData !== null)
  }
  useEffect(() => {
    verifyUser()
  }, [])

  const providerValue = {
    isLoggedIn: isLoggedIn,
    verify: verifyUser,
    login: setIsLoggedIn,
  }

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
