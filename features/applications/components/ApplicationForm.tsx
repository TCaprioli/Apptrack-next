"use client"
import { useState } from "react"

const defaultValues = {
  jobTitle: "",
  company: "",
  location: null,
  applicationDate: null,
  status: "applied",
  notes: null,
}

type ApplicationFormProps = {
  application: number | null
}
type ApplicationInput = {
  jobTitle: string
  company: string
  location: string | null
  applicationDate: string | null
  status: string
  notes: string | null
}
export const ApplicationForm = (props: ApplicationFormProps) => {
  const [applicationInput, setApplicationInput] =
    useState<ApplicationInput>(defaultValues)
  const [display, setDisplay] = useState<boolean>(true)
  const onSubmit = async () => {
    console.log("submited", applicationInput)
  }
  const resetState = () => setApplicationInput(defaultValues)
  return (
    <div>
      <div>
        <h2>{props.application ? "Update" : "Add New"} Application</h2>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            await onSubmit()
          } catch (err) {
            console.error(err)
          }
        }}
      >
        <label htmlFor="jobTitle">
          Job Title:
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={applicationInput.jobTitle}
            onChange={(e) =>
              setApplicationInput((prevState) => ({
                ...prevState,
                jobTitle: e.target.value,
              }))
            }
            required
          />
        </label>
        <label htmlFor="company">
          Company:
          <input
            type="text"
            id="company"
            name="company"
            value={applicationInput.company}
            onChange={(e) =>
              setApplicationInput((prevState) => ({
                ...prevState,
                company: e.target.value,
              }))
            }
            required
          />
        </label>
        <label htmlFor="location">
          Location:
          <input
            type="text"
            id="location"
            name="location"
            value={applicationInput.location ?? ""}
            onChange={(e) =>
              setApplicationInput((prevState) => ({
                ...prevState,
                location: e.target.value !== "" ? e.target.value : null,
              }))
            }
          />
        </label>
        <label htmlFor="applicationDate">
          Application Date:
          <input
            type="date"
            id="applicationDate"
            name="applicationDate"
            value={applicationInput.applicationDate ?? ""}
            onChange={(e) =>
              setApplicationInput((prevState) => ({
                ...prevState,
                applicationDate: e.target.value !== "" ? e.target.value : null,
              }))
            }
          />
        </label>

        <label htmlFor="status">
          Status:
          <select
            id="status"
            name="status"
            value={applicationInput.status}
            onChange={(e) =>
              setApplicationInput((prevState) => ({
                ...prevState,
                status: e.target.value,
              }))
            }
            required
          >
            <option value="applied">Applied</option>
            <option value="interviewed">Interviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        {/* TODO: Add notes */}
        <div>
          <button type="submit">Submit</button>
          {props.application && (
            <button
              onClick={() => {
                resetState()
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
