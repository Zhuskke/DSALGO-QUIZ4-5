import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../actions/productActions';

function ProductEditScreen() {
  const { id } = useParams(); // Getting id from URL params directly

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    countInStock: '',
  });

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { loading: updateLoading, error: updateError, success } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (success) {
      // Redirecting to products list after successful update
      window.location.href = '/products'; // Using window.location to redirect
    } else {
      if (!product || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setFormData({
          name: product.name,
          image: product.image,
          brand: product.brand,
          category: product.category,
          description: product.description,
          price: product.price,
          countInStock: product.countInStock,
        });
      }
    }
  }, [dispatch, id, product, success]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: id,
      name: formData.name,
      image: formData.image,
      brand: formData.brand,
      category: formData.category,
      description: formData.description,
      price: formData.price,
      countInStock: formData.countInStock,
    };
    dispatch(updateProduct(updatedProduct));
  };
  return (
    <div className="container">
      <h1 className="my-4">Edit Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="countInStock" className="form-label">Count in Stock</label>
          <input
            type="number"
            className="form-control"
            id="countInStock"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {updateLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
      {updateError && <p className="text-danger">{updateError}</p>}
    </div>
  );
}

export default ProductEditScreen;
