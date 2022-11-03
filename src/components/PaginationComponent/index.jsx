import { Pagination } from "react-bootstrap";
import "./styles.css";

function PaginationComponent(props) {
  const total = 3;
  const itemsPerPage = 1;
  const totalPages = props.totalPages;
  const currentPage = props.currentPage;

  const createPaginationItem = (i) => {
    return (
      <Pagination.Item
        className="paginationitem"
        key={i}
        active={i === currentPage}
        onClick={() => props.setPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  };

  const paginationItems = [];

  if (totalPages > 10) {
    if(currentPage > totalPages - 5) {
      paginationItems.push(createPaginationItem(1));
      paginationItems.push(<Pagination.Ellipsis />);
      for (let i = totalPages-6; i <= totalPages; i++) {
        paginationItems.push(createPaginationItem(i));
      }
    } else if(currentPage < 6) {
      for (let i = 1; i <= 7; i++) {
        paginationItems.push(createPaginationItem(i));
      }
      paginationItems.push(<Pagination.Ellipsis />);
      paginationItems.push(createPaginationItem(totalPages));
    } else {
      // Add the first item (page 1)
      paginationItems.push(createPaginationItem(1));
      // Add an ellipsis
      paginationItems.push(<Pagination.Ellipsis />);
      const midpoint = currentPage;
      // Create page numbers in the middle
      for (let i = midpoint - 2; i <= midpoint + 2; i++) {
        paginationItems.push(createPaginationItem(i));
      }
      // Add an ellipsis
      paginationItems.push(<Pagination.Ellipsis />);
      // Add the last item (page N)
      paginationItems.push(createPaginationItem(totalPages));
    }
  } else if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(createPaginationItem(i));
    }
  }

  if (totalPages > 1) {
    return (
      <Pagination className="paginationInfo">
        <Pagination.Prev
          onClick={() => props.setPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => props.setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  }
}
export default PaginationComponent;
