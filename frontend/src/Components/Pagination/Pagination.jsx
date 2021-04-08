import React from 'react';

const Pagination = ({loading,previousPage,nextPage,pageClick}) => {
    return ( 
        <div >
        {!loading && previousPage <= 2 && nextPage > 2 ? (
          <div>
            <button onClick={() => pageClick(previousPage)}>Previous</button>
            <button onClick={() => pageClick(nextPage)}>Next</button>
          </div>
        ) : !loading && nextPage === 2 && previousPage < 2 ? (
          <div>
            <button onClick={() => pageClick(nextPage)}>Next</button>
          </div>
        ) : !loading && !previousPage ? (
          <div>

          </div>
        ) :
        (
          !loading &&
          !nextPage && (
            <div>
              <button onClick={() => pageClick(previousPage)}>Previous</button>
            </div>
          ) 
        )
        }
      </div>
     );
}
 
export default Pagination;