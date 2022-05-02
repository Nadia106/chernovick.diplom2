import React from "react";

const SearchStatus = ({ length }) => {
    return (
        <h2>
      <span className={"badge " + (length > 0 ? "bg-secondary" : "bg-warning")}>
        {length > 0 ? `Найдено: ${length}` : "Не найдено"}
      </span>
        </h2>
    );
};

export default SearchStatus;
