import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { list } from "../apis/product-api";
import Products from "./Products";
const Search = (props) => {
  const [values, setValues] = useState({
    category: "",
    search: "",
    results: [],
    redirectTo: false,
    searched: false,
  });
  const navigate = useNavigate();
  const search = async (e) => {
    if (values.search) {
      try {
        const data = await list({
          search: values.search || undefined,
          category: values.category,
        });
        setValues({ ...values, results: data, searched: true });
        navigate('/search', { state: { results: data } })
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.error);
        }
      }
    }
  };
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const enterKey = (e) => {};
  console.log(values.results)


  return (
    <>
      <select
        value={values.category}
        onChange={handleChange("category")}
        className="focus:outline-none"
      >
        <option value="All">All</option>
        {props.categories.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        className="bg-white pl-2  focus:outline-none"
        placeholder="Search..."
        type={"text"}
        onChange={handleChange("search")}
        name="search"
      />
      <button onClick={search} className="bg-white text-gray-600">
        <CiSearch fontSize={24} />
      </button>
    </>
    // <div>
    //   <div>

    //     <input
    //       type={"text"}
    //       onKeyDown={enterKey}

    //     />
    //     <button onClick={search}>Search</button>
    //     <br />

    //   </div>
    // </div>
  );
};

export default Search;
