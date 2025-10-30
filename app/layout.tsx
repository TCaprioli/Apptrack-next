import CssBaseline from "@mui/material/CssBaseline"
import { AuthButton } from "../features/auth/components/AuthButton"
export const metadata = {
  title: "Apptrack",
}
export default function RootLayout({
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
        <AuthButton />
        {children}
      </body>
    </html>
  )
}
