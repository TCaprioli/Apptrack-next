import CssBaseline from "@mui/material/CssBaseline"
import { AuthButton } from "../features/auth/components/AuthButton"
import { AuthProvider } from "../features/auth/components/AuthProvider"
export const metadata = {
  title: "Apptrack",
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <CssBaseline />
        <AuthProvider>
          <AuthButton />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
