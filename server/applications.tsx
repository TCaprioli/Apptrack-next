import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/applications"

export type ApplicationData = {
  id: number
  jobTitle: string
  company: string
  location: string | null
  applicationDate: string | null
  userID: number
  status: string
  notes: string | null
  createdAt: Date
  updatedAt: Date
}

export type CreateApplicationParams = {
  jobTitle: string
  company: string
  location: string | null
  applicationDate: Date | null
  status: string
  notes: string | null
}

export type UpdateApplicationParams = {
  id: number
  jobTitle: string
  company: string
  location: string | null
  applicationDate: Date | null
  status: string
  notes: string | null
}
interface ApplicationApi {
  getApplication: (id: number) => Promise<ApplicationData>
  getAllApplications: () => Promise<ApplicationData[]>
  createApplication: (args: CreateApplicationParams) => Promise<ApplicationData>
  updateApplication: (args: UpdateApplicationParams) => Promise<ApplicationData>
  deleteApplication: (id: number) => Promise<void>
}

export const ApplicationApi: ApplicationApi = {
  createApplication: async (args) => {
    const resp = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(args),
    })

    if (!resp.ok) {
      const text = await resp.text().catch(() => "")
      throw new Error(
        `Create application failed: ${resp.status} ${resp.statusText} ${text}`
      )
    }

    return resp.json()
  },
  getAllApplications: async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value || ""
    try {
      const resp = await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      })
      if (resp.status === 401) {
        redirect("/login")
      }

      return resp.json()
    } catch (error) {
      throw new Error("Failed to fetch applications")
    }
  },
  getApplication: async (id) => {
    const resp = await fetch(`${baseUrl}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    if (!resp.ok) {
      const text = await resp.text().catch(() => "")
      throw new Error(
        `Fetch application ${id} failed: ${resp.status} ${resp.statusText} ${text}`
      )
    }

    return resp.json()
  },
  updateApplication: async (args) => {
    const { id, ...payload } = args
    const resp = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const text = await resp.text().catch(() => "")
      throw new Error(
        `Update application ${id} failed: ${resp.status} ${resp.statusText} ${text}`
      )
    }

    return resp.json()
  },
  deleteApplication: async (id) => {
    const resp = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    if (!resp.ok) {
      throw new Error(
        `Delete application ${id} failed: ${resp.status} ${resp.statusText}`
      )
    }
  },
}
