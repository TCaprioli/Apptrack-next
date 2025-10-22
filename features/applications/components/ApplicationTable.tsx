import { ApplicationData } from "../types"
import { ApplicationItem } from "./ApplicationItem"

type ApplicationTableProps = {
  applications: ApplicationData[]
  setCurrentApplication: (application: number) => void
}

export const ApplicationTable = (props: ApplicationTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Title</th>
          <th>Location</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.applications.map((app) => (
          <ApplicationItem
            key={app.id}
            app={app}
            setCurrentApplication={() => props.setCurrentApplication(app.id)}
          />
        ))}
      </tbody>
    </table>
  )
}
