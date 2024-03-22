import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUserProducts, deleteProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import moment from 'moment';

const UserProductScreen = () => {
  const dispatch = useDispatch();
  const userProductsList = useSelector(state => state.userProductsList);
  const { loading, error, products } = userProductsList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listUserProducts());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <h1>My Products</h1>
      {loadingDelete && <Alert variant="info">Deleting Product...</Alert>}
      {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>RATING</th>
              <th>REVIEWS</th>
              <th>STOCK</th>
              <th>ADDED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.rating}</td>
                <td>{product.numReviews}</td>
                <td>{product.countInStock}</td>
                <td>{moment(product.createdAt).format('YYYY-MM-DD')}</td>
                <td>
                  <Link to={`/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Link to="/upload">
        <Button>Create Product</Button>
      </Link>
    </>
  );
};

export default UserProductScreen;