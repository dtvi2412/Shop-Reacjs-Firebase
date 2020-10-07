import React, { useEffect, useState } from "react";
import "./Country.scss";
import RemoveIcon from "@material-ui/icons/Remove";

import { connect, useDispatch, useSelector } from "react-redux";
import { CHANGE_NAME_COUNTRY } from "../../../Redux/Types/type";
const Country = ({ closeCountry }) => {
  const dispatch = useDispatch();
  const country = useSelector((country) => country.coursesReducer.country);

  //Load Country
  const handleLoadCountry = () => {
    return country.map((country) => {
      return <option key={country.id}>{country.name}</option>;
    });
  };
  const [nameCountry, setNameCountry] = useState("Hà Nội");
  const handleSelect = (e) => {
    // console.log(e.target.value);
    setNameCountry(e.target.value);
  };
  const handleChangeName = () => {
    dispatch({
      type: CHANGE_NAME_COUNTRY,
      name: nameCountry,
    });

    closeCountry();
  };
  return (
    <div className="country">
      <div className="country__content">
        <div className="country__content__close" onClick={closeCountry}>
          <RemoveIcon />
        </div>
        <div className="country__content__info">
          <h1>Select Destination</h1>
          <div className="country__content__info__detail">
            <p>Country</p>
            {/* Form Select Material */}

            <select
              className="select"
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              {handleLoadCountry()}
            </select>
            <button
              onClick={() => {
                handleChangeName();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(Country);
