// // First Try

// import { useState, useEffect } from "react";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState("");
//   const [count, setCount] = useState(0);
//   const [price, setPrice] = useState(0);

//   const fetchProduct = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/products");
//       // const response = await fetch(
//       //   `http://www.omdbapi.com/?t=${data.products[0].name}&apikey=${OMDB_API_KEY}`
//       // );
//       const data = await response.json();
//       console.log(data);
//       setProducts(data.products);
//       setCount(data.count);
//       return data.products;
//     } catch (error) {
//       console.log("No products available");
//     }
//   };

//   // useEffect(() => {
//   //   fetchProduct();
//   // }, [products, count]);

//   useEffect(() => {
//     fetchProduct().then((data) => console.log(data));
//   }, []);

//   return (
//     <div className="prodText">
//       <h1>Home</h1>
//       <div>
//         <h2>Products</h2>
//         <div>
//           {/* {products.map((product) => (
//             <div key={product._id}>
//               <h3>{product.name}</h3>
//               <p>{product.category}</p>
//               <p>{product.image}</p>
//               <p>Plot: {product.description}</p>
//               <p>Price: {product.price}€</p>
//             </div>
//           ))} */}
//           {products &&
//             products.map((product) => (
//               <div key={product._id}>
//                 <h3>{product.name}</h3>
//                 <p>{product.category}</p>
//                 <p>{product.image}</p>
//                 <p>Plot: {product.description}</p>
//                 <p>Price: {product.price}€</p>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// // Second Try

// import React, { useState, useEffect } from "react";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [count, setCount] = useState(0);

//   const fetchProduct = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/products");
//       const data = await response.json();
//       console.log(data);
//       setProducts(data.products);
//       setCount(data.count);
//     } catch (error) {
//       console.error("No products available", error);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   return (
//     <div className="prodText">
//       <h1>Home</h1>
//       <div>
//         <h2>Products</h2>
//         <div>
//           {products &&
//             products.map((product) => (
//               <div key={product._id}>
//                 <h3>{product.name}</h3>
//                 <p>{product.category}</p>
//                 <p>{product.image}</p>
//                 <p>Plot: {product.description}</p>
//                 <p>{product.price}€</p>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
