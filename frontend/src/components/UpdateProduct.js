import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    // console.log(params);
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result = await result.json();
    // console.log(result)

    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const UpdateProduct = async () => {
    // console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        
      },
    });

    result = await result.json();
    console.log(result);
    navigate('/');
  };
  return (
    <div className="product">
      <h1>Update product</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter product name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="Enter product price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="Enter product category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="Enter product company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      />
      <button  onClick={UpdateProduct}>Update Product</button>
    </div>
  );
};

export default UpdateProduct;
