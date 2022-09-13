import { usePagination, DOTS } from '../hooks/usePagination'

const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  totalCount
}) => {
  const BsPagination = require('react-bootstrap/Pagination').default
  const paginationItems = usePagination({
    currentPage,
    pageSize,
    totalCount
  })

  const backButton = () => {
    onPageChange(currentPage - 1)
  }

  const nextButton = () => {
    onPageChange(currentPage + 1)
  }

  // generate view
  const items = []
  items.push(
    <BsPagination.Prev key={'prev'} onClick={backButton} disabled={currentPage === 1} />
  )
  paginationItems.forEach((item, ind) => {
    if (item === DOTS) {
      items.push(
        <BsPagination.Ellipsis key={ind+'elip'} disabled />
      )
    } else {
      items.push(
        <BsPagination.Item key={item} active={currentPage === item} onClick={() => onPageChange(item)}>{item}</BsPagination.Item>
      )
    }
  })
  items.push(
    <BsPagination.Next key={'next'} onClick={nextButton} disabled={currentPage === Math.ceil(totalCount / pageSize)} />
  )

  return (
    <BsPagination>{items}</BsPagination>
  )
}

export default Pagination