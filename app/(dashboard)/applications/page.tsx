import { ApplicationApi } from "../../../server/applications"
import { ApplicationView } from "../../../features/applications/components/ApplicationView"

export default async function Applications() {
  try {
    const applications = await ApplicationApi.getAllApplications()
    return (
      <div>
        <ApplicationView applications={applications} />
      </div>
    )
  } catch (error) {
    console.error(error)
    return <div>Error loading applications.</div>
  }
}
