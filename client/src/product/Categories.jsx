import React,{useState} from "react";
import {Products} from '../Export'
const Categories = (props) => {
    const [products, setProducts] = useState([])
    const [selected, setSelected] = useState(props.categories[0])
    const handleCategoryChange =name=> (e)=>{
        setSelected(name,[e.target.value])

    }
  return (
    <div>
      <label htmlFor="select-category">Explore by category</label>
      <select
        id="select-category"
        value={selected}
        onChange={handleCategoryChange}
      >
        {props.categories.map((tile, i) => (
          <option key={i} value={tile}>
            {tile}
          </option>
        ))}
      </select>
      <hr />
      <Products products={products} searched={false} />
    </div>
  );
};

export default Categories;
