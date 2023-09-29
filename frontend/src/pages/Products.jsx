// src/Products.js
import React, { useState, useEffect } from "react";

function Products() {
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Aquí puedes hacer una solicitud a tu backend para obtener la lista de productos
    //fetch("/products") 
    fetch(serverDomain + '/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    // Asegúrate de que la ruta sea correcta
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.categoryId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
