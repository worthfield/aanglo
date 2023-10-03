import React, { useState, useEffect } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { list, listCategories } from "../../apis/product-api";

const BottomBar = () => {
  const [toggleDown, setToggleDown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    searches: "",
    category: "All",
    results: [],
    searched: false
  });
  const navigate = useNavigate();
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

      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCategory = async(category)=>{
    try{
      const data = await list({
        category:category
      })
      setValues({...values,results:data,searched:true});
      navigate('/search',{state:{results:data}})
    }
    catch(error){

      console.log(category)
    }

  }

  return (
    <div className="container mx-auto hidden mt-2 mb-4 gap-10  lg:flex">
      <div className="relative">
        <div
          onClick={() => setToggleDown(!toggleDown)}
          className="flex cursor-pointer items-center group py-4 px-7 bg-red-500 gap-8 rounded-t-md font-bold justify-between text-white"
        >
          <div className="flex items-center gap-2">
            <CgMenuGridO size={28} />
            <p className="text-lg">All departments</p>
          </div>
          <AiFillCaretDown
            size={20}
            className={`${
              toggleDown && "rotate-180"
            } transition duration-300 delay-100 ease-in-out`}
          />
        </div>
        {toggleDown && (
          <div className="bg-white w-full border-b-2 rounded-b-md absolute z-50">
            {categories.map((category, index) => {
              return (
                <div key={index} onClick={()=>handleCategory(category)} className="border-b-2 cursor-pointer border-dashed p-3">
                  {category}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex items-center border-2 w-[50%]  rounded-3xl justify-between pl-4 ">
        <input
          type="text"
          placeholder="Search here..."
          onChange={handleChange}
          value={values.searches}
          className="w-full focus:outline-none text-gray-500 focus:text-black"
        />
        <div className=" flex items-center">
          <select
            value={values.category}
            onChange={handleCategoryChange}
            className="mx-2 text-gray-500  focus:text-black focus:outline-none"
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
            className="px-10 py-3 cursor-pointer border-l-2"
            onClick={handleSearch}
          >
            <BsSearch size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
