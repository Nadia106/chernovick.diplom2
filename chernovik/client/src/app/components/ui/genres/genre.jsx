import React from "react";
import PropTypes from "prop-types";

const Genre = ({color, name, _id}) => {
  return (
    <span className={"badge m-1 bg-" + color} key={_id}>
      {name}
    </span>
  );
};
Genre.propTypes = {
  
  _id: PropTypes.string.isRequired,
  color: PropTypes.string,
  name: PropTypes.string
};
export default Genre;
