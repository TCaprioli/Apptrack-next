"use client"
import Button from "@mui/material/Button"
import { UserApi } from "../../../server/users"
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"

export const AuthButton = () => {
  const router = useRouter()
  const user = useAuth()
  return (
    <Button
      onClick={async () => {
        if (user.isLoggedIn) {
          user.login(false)
          await UserApi.logout()
          router.push("/login")
        } else {
          router.push("/login")
        }
      }}
    >
      {user.isLoggedIn ? "Log Out" : "Log In"}
    </Button>
  )
}
