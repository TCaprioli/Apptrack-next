import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AuthForm } from "../../../features/auth/components/AuthForm"

export default async function LoginPage() {
  const token = (await cookies()).get("token")?.value || ""
  if (token) redirect("/applications")

  return (
    <div>
      <div>
        <h1>Log In</h1>
        <AuthForm allowDemo={true} type="login" />
      </div>
    </div>
  )
}
