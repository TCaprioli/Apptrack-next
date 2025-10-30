"use client"
import Button from "@mui/material/Button"
import { UserApi } from "../../../server/users"
import { useRouter } from "next/navigation"

export const AuthButton = () => {
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        UserApi.logout()
        router.push("/login")
      }}
    >
      sign out
    </Button>
  )
}
