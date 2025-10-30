type UserData = { id: number; email: string; token: string }

interface UserApi {
  login: (args: { email: string; password: string }) => Promise<UserData>
  register: (args: { email: string; password: string }) => Promise<UserData>
  logout: () => Promise<void>
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/users"

export const UserApi: UserApi = {
  login: async (args) => {
    const resp = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(args),
    })
    try {
      return await resp.json()
    } catch (error) {
      console.error("Error parsing JSON:", error)
      throw error
    }
  },
  register: async (args) => {
    const resp = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(args),
    })
    return resp.json()
  },
  logout: async () => {
    await fetch(`${baseUrl}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
  },
}
