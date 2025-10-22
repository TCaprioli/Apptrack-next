"use client"
import { useState } from "react"
import { ApplicationData } from "../types"
import { ApplicationTable } from "./ApplicationTable"
import { APPLICATIONS_PER_PAGE, PageCount } from "./PageCount"

type ApplicationViewProps = {
  applications: ApplicationData[]
}

export const ApplicationView = ({ applications }: ApplicationViewProps) => {
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState<string>("")
  const visibleApplications = applications
    .slice(
      APPLICATIONS_PER_PAGE * page - APPLICATIONS_PER_PAGE,
      APPLICATIONS_PER_PAGE * page
    )
    .filter((app) =>
      app.company.toLowerCase().includes(searchInput.toLowerCase())
    )
  const [currentApplication, setCurrentApplication] = useState<number | null>(
    null
  )

  return (
    <div>
      <div>
        <input
          value={searchInput}
          placeholder="Search Companies..."
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <ApplicationTable
          applications={visibleApplications}
          setCurrentApplication={setCurrentApplication}
        />
      </div>
      <PageCount
        page={page}
        totalItems={applications.length}
        increment={() => setPage((prevState) => (prevState += 1))}
        decrement={() => setPage((prevState) => (prevState -= 1))}
      />
    </div>
  )
}
