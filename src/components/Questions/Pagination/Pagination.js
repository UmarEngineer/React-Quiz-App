import "./Pagination.css";

const Pagination = ({ list, handlePagination, handleSelectBtn }) => {
  return (
    <div className="question-pagination">
      {list &&
        list.map((btnItem) => (
          <button
            key={btnItem}
            onClick={() => handlePagination(btnItem)}
            className={`paginationBtn ${handleSelectBtn(btnItem)}`}
          >
            {btnItem + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
