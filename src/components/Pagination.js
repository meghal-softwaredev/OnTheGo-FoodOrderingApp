import React,{useState} from "react";

const Pagination = ({ data, RenderComponent, pageLimit, dataLimit }) => {

const [pages] = useState(Math.round(data.length / dataLimit));
const [currentPage, setCurrentPage] = useState(1);
function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }
function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    if(start<0){
      start=0;
    }
    let arr = [];
    for(let i=start+1; i<=pageLimit; i++){
      arr.push(i);
    }
    return arr;
  };
  
  return (
    <div className="main">
      <div className="grid-container">     
      {getPaginatedData().map((d, idx) => {
         return <div className="grid-item">
        {<RenderComponent key={idx} data={d} />}
        </div>
        })}

        </div>
  
      <div className="pagination" style={{textAlign:"center"}}>
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>
  
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}
  
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>
    </div>
  );  
}
export default Pagination;