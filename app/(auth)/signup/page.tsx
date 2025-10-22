import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AuthForm } from "../../../features/auth/components/AuthForm"

export default async function SignupPage() {
  const token = (await cookies()).get("token")?.value || ""
  if (token) redirect("/applications")

  return (
    <div>
      <div>
        <h1>Sign Up</h1>
        <AuthForm allowDemo={false} type="signup" />
      </div>
    </div>
  )
}
