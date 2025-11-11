import { useEffect } from "react"

export const APPLICATIONS_PER_PAGE = 10

type PageCountProps = {
  page: number
  totalItems: number
  increment: () => void
  decrement: () => void
}

export const PageCount = (props: PageCountProps) => {
  useEffect(() => {
    // Maximum number of items that can be paginated.
    const maxItems = APPLICATIONS_PER_PAGE * props.page - APPLICATIONS_PER_PAGE
    if (
      props.totalItems > 0 &&
      props.page !== 1 &&
      props.totalItems === maxItems
    ) {
      props.decrement()
    }
  }, [props])
  return (
    <div>
      <button disabled={props.page === 1} onClick={props.decrement}>
        {"<"}
      </button>
      <span>{props.page}</span>
      <button
        disabled={props.totalItems <= APPLICATIONS_PER_PAGE * props.page}
        onClick={props.increment}
      >
        {">"}
      </button>
    </div>
  )
}
