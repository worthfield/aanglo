import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../Context-api";
import { BsSearch } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { list, listCategories } from "../../apis/product-api";

const ResSearch = () => {
  const { sethide } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    searches: "",
    category: "All",
    results: [],
    searched: false,
  });
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    try {
      const data = await listCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, searches: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setValues({ ...values, category: event.target.value });
  };
  const handleSearch = async () => {
    if (values.searches) {
      try {
        const data = await list({
          search: values.searches || undefined,
          category: values.category,
        });
        setValues({ ...values, results: data, searched: true });
        navigate('/search', { state: { results: data } })
        sethide(true)

      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-screen h-screen absolute z-[1000] bg-white top-0 left-0">
      <div className="flex pr-7 pt-7 justify-end">
        <AiFillCloseCircle
          onClick={() => sethide(true)}
          size={34}
          color="red"
        />
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center border-2   rounded-3xl justify-between pl-4 ">
          <input
            type="text"
            placeholder="Search here..."
              onChange={handleChange}
              value={values.searches}
            className="w-full focus:outline-none text-gray-500 p-2  rounded-md focus:text-black"
          />
          <div className=" flex items-center ml-2">
            <select
              value={values.category}
              onChange={handleCategoryChange}
              className="text-gray-500 p-2 focus:text-black rounded-md focus:outline-none"
            >
              <option value={"All"}>All categories</option>
              {categories.map((option, index) => {
                return (
                  <option
                    key={index}
                    value={option}
                    className="border-b-2 border-dashed p-3"
                  >
                    {option}
                  </option>
                );
              })}
            </select>

            <div
              className="ml-2 bg-gray-300 px-3 rounded-full py-3 cursor-pointer border-l-2"
              onClick={handleSearch}
            >
              <BsSearch size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResSearch;
