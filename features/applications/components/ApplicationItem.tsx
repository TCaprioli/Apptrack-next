import { useState } from "react"
import { ApplicationData } from "../types"

type ApplicationItemProps = {
  app: ApplicationData
  setCurrentApplication: () => void
}
export const ApplicationItem = (props: ApplicationItemProps) => {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false)
  const onDelete = async (id: number) => {
    //intentional no-op
  }

  return (
    <tr>
      <td>{props.app.company}</td>
      <td>{props.app.jobTitle}</td>
      <td>{props.app.location}</td>
      <td>{props.app.status}</td>
      <td>
        {/* TODO: Add favorites */}
        <button onClick={() => setDisplayMenu(true)}>menu</button>
        {displayMenu && (
          <div>
            <ul>
              <li
                tabIndex={0}
                onClick={() => {
                  ;() => {
                    //intentional no-op
                  }
                }}
              >
                View
              </li>
              <li
                onClick={() => {
                  props.setCurrentApplication()
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    props.setCurrentApplication()
                  }
                }}
                tabIndex={0}
              >
                Edit
              </li>
              <li
                onClick={() => onDelete(props.app.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onDelete(props.app.id)
                  }
                }}
                tabIndex={0}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  )
}
