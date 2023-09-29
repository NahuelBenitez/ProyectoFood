import React, { useEffect, useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { ImagetoBase64 } from '../utility/ImagetoBase64';

const CardProduct = ({ product }) => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    // Aquí realizamos una solicitud para obtener el nombre de la categoría
    // utilizando el ID de categoría del producto
    const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
    fetch(`${serverDomain}/categorias/${product.categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la categoría');
        }
        return response.json();
      })
      .then((data) => {
        setCategoryName(data.nombre);
      })
      .catch((error) => {
        console.error('Error al obtener la categoría', error);
      });
  }, [product.categoryId]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={product.image} alt={product.name} className="w-full h-auto rounded-md" />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">Category: {categoryName}</p>
        <p className="text-gray-600">Description: {product.description}</p>
        <p className="text-red-600 font-semibold mt-2">Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default CardProduct;
