import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { BsCloudUpload } from 'react-icons/bs';
import { ImagetoBase64 } from '../utility/ImagetoBase64';

const Newproduct = () => {
  const [data, setData] = useState({
    name: '',
    categoryId: '',
    image: '',
    price: '',
    description: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((prevData) => ({
      ...prevData,
      image: data,
    }));
  };

  const [categories, setCategories] = useState([]);
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

  useEffect(() => {
    fetch(serverDomain + '/categorias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error al obtener las categorías', error);
      });
  }, [serverDomain]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, categoryId, price } = data;

    if (!name || !image || !categoryId || !price) {
      toast.error('Enter required Fields');
    } else {
      const fetchData = await fetch(`${serverDomain}/uploadProduct`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const fetchRes = await fetchData.json();

      toast.success(fetchRes.message);

      setData({
        name: '',
        categoryId: '',
        image: '',
        price: '',
        description: '',
      });
    }
  };

  return (
    <div className="p-4 mt-20">
      <h3 className='text-3xl text-center text-red-500 mt-16 '><span className='shadow-md shadow-yellow-300'>New Product</span></h3>
      <form className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white mt-0 " onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" className="bg-slate-200 p-1 my-1" onChange={handleOnChange} value={data.name} />

        <label htmlFor="category">Category</label>
        <select
          name="categoryId"
          value={data.categoryId}
          onChange={handleOnChange}
          className="w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="image">Image</label>
        <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
          {data.image ? <img src={data.image} className="h-full" alt="Product" /> : <span className="text-5xl"><BsCloudUpload /></span>}
          <input type="file" accept="image/*" id="image" onChange={uploadImage} className="hidden" />
        </div>

        <label htmlFor="price" className="my-1">Price</label>
        <input type="text" className="bg-slate-200 p-1 my-1" name="price" onChange={handleOnChange} value={data.price} />

        <label htmlFor="description">Description</label>
        <textarea rows={2} value={data.description} className="bg-slate-200 p-1 my-1 resize-none" name="description" onChange={handleOnChange}></textarea>

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">Save</button>
      </form>
    </div>
  );
};

export default Newproduct;
