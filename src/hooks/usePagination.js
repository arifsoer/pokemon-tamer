/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react"

export const DOTS = '...'

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const range = (start, end) => {
    const length = end - start + 1

    return Array.from({length}, (_, idx) => idx + start)
  }

  const totalPageCount = Math.ceil(totalCount / pageSize)

  const paginationRange = useMemo(() => {

    const totalPageShowed = siblingCount + 5

    // case 1 : the total page need to be showed less than actual
    if (totalPageShowed >= totalPageCount) {
      return range(1, totalCount)
    }

    // generate left or and right sibling
    const leftSibling = Math.max(currentPage - siblingCount, 1)
    const rightSibling = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftSibling = leftSibling > 2
    const shouldShowRightSibling = rightSibling < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    // case 2 : no left sibling
    if(!shouldShowLeftSibling && shouldShowRightSibling) {
      let leftItem = 3 + 2 * siblingCount
      let leftRange = range(1, leftItem)

      return [...leftRange, DOTS, totalPageCount]
    }

    // case 3 : No right to show
    if(shouldShowLeftSibling && !shouldShowRightSibling) {
      let rightItem = 3 + 2 * siblingCount
      let rightRange = range(totalPageCount - rightItem, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    // case 4 : with left and right
    if(shouldShowLeftSibling && shouldShowRightSibling) {
      let midleRange = range(leftSibling, rightSibling)
      return [firstPageIndex, DOTS, ...midleRange, DOTS, lastPageIndex]
    }

  },[totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}