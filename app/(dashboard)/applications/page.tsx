import { ApplicationApi } from "../../../server/applications"
import { ApplicationView } from "../../../features/applications/components/ApplicationView"
import { ApplicationForm } from "../../../features/applications/components/ApplicationForm"

export default async function Applications() {
  try {
    const applications = await ApplicationApi.getAllApplications()
    return (
      <div>
        <ApplicationView applications={applications} />
        <ApplicationForm application={null} />
      </div>
    )
  } catch (error) {
    console.error(error)
    return <div>Error loading applications.</div>
  }
}
