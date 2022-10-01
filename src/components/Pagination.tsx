import React from 'react'
import { usePagination, DOTS } from '../hooks/usePagination'

interface Props {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalCount: number;
}

const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  totalCount
}: Props) => {
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
  paginationItems!.forEach((item:string | number, ind: number) => {
    if (item === DOTS) {
      items.push(
        <BsPagination.Ellipsis key={ind+'elip'} disabled />
      )
    } else {
      items.push(
        <BsPagination.Item key={item} active={currentPage === item} onClick={() => onPageChange(item as number)}>{item}</BsPagination.Item>
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