import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const NewCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

  const handleOnChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categoryName) {
      // Convertir el nombre de la categoría a minúsculas
      const lowercaseCategoryName = categoryName.toLowerCase();

      // Verificar si la categoría ya existe
      const existingCategoriesResponse = await fetch(serverDomain + '/categorias', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (existingCategoriesResponse.ok) {
        const existingCategories = await existingCategoriesResponse.json();
        const categoryExists = existingCategories.some((category) => category.name.toLowerCase() === lowercaseCategoryName);

        if (categoryExists) {
          toast.error('La categoría ya existe.');
        } else {
          // Crear la categoría si no existe
          const response = await fetch(serverDomain + '/categorias', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: lowercaseCategoryName }),
          });

          if (response.ok) {
            toast.success('Categoría creada exitosamente');
            setCategoryName(''); // Limpiar el campo de nombre de categoría
          } else {
            toast.error('Error al crear la categoría. Por favor, inténtalo de nuevo.');
          }
        }
      } else {
        toast.error('Error al verificar las categorías existentes. Por favor, inténtalo de nuevo.');
      }
    } else {
      toast.error('Por favor, ingresa el nombre de la categoría.');
    }
  };

  return (
    <div className="p-4 mt-16">
      <form className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white" onSubmit={handleSubmit}>
        <label htmlFor="categoryName">Nombre de la Categoría</label>
        <input
          type="text"
          name="categoryName"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={categoryName}
        />

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">Crear Categoría</button>
      </form>
    </div>
  );
};

export default NewCategory;
