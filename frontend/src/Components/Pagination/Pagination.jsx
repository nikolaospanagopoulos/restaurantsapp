import React from "react";

const Pagination = ({ loading, previousPage, nextPage, pageClick }) => {
  return (
    <div className="pagination">
      {!loading && nextPage === 2 ? (
        <div>
          <button onClick={() => pageClick(nextPage)}>Next</button>
        </div>
      ) : !loading && !nextPage ? (
        <div>
          <button onClick={() => pageClick(previousPage)}>Previous</button>
        </div>
      ) : !loading && nextPage !== "2" && previousPage !== "1" ? (
        <div>
          <button onClick={() => pageClick(previousPage)}>Previous</button>
          <button onClick={() => pageClick(nextPage)}>Next</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
