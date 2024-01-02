import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
const navigate=useNavigate();

  const addProduct=async()=>{

    console.log(!name);
    if(!name || !price || !category || !company){
      setError(true)
      return false;
    }
    console.log(name,price,category,company)
    const userId=JSON.parse(localStorage.getItem('user'))._id;
    let result=await fetch("http://localhost:5000/add-product",{
        method:'post',
        body: JSON.stringify({name, price,category,company}),
        headers:{
            "Content-Type":"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        
        }

    });
    result =await result.json();
    console.log(result);
    navigate('/');

  }
  return (
    <div className="product">
      <h1>Add product</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter product name"
        onChange={(e)=>{setName(e.target.value)}}
        value={name}
      />
      {error && !name && <span className="invalid-input">Enter valide name!</span>}
      <input
        type="text"
        className="inputBox"
        placeholder="Enter product price"
        onChange={(e)=>{setPrice(e.target.value)}}
        value={price}
      />
      {error && !price && <span className="invalid-input">Enter valide price!</span>}
      <input
        type="text"
        className="inputBox"
        placeholder="Enter product category"
        onChange={(e)=>{setCategory(e.target.value)}}
        value={category}
      />
      {error && !category && <span className="invalid-input">Enter valide catogory!</span>}
      <input
        type="text"
        className="inputBox"
        placeholder="Enter product company"
        onChange={(e)=>{setCompany(e.target.value)}}
        value={company}
      />
      {error && !company && <span className="invalid-input">Enter valide company!</span>}

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
