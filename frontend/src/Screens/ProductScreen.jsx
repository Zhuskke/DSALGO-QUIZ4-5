import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form } from "react-bootstrap";
import Rating from "../Components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Grid,
  Divider,
  Button,
} from "@mui/material";

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const handleEdit = () => {
    // Handle edit logic, navigate to edit page
    navigate(`/product/${id}/edit`);
  };

  const style = {
    py: 0,
    width: "100%",
    maxWidth: 360,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            {/* <Image src={product.image} alt={product.name} fluid></Image> */}
            <Box>
              <Paper md={6}>
                <img
                  width="100%"
                  src={product.image}
                  alt={product.name}
                  fluid
                />
              </Paper>
            </Box>
          </Col>
          <Col md={3}>
            <List>
              <ListItem>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  {product.name}
                </Typography>
              </ListItem>
              <Divider component={"li"} />
              <ListItem>
                <Typography fontWeight="bold" color="text.secondary">
                  {product.description}
                </Typography>
              </ListItem>
              <Divider component={"li"} />
              <ListItem>
                <Typography>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </Typography>
              </ListItem>
            </List>
            {/* <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            </ListGroup> */}
          </Col>
          <Col md={3}>
            <List sx={style}>
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={6} sm={6}>
                    Price:
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    ${product.price}
                  </Grid>
                </Grid>
              </ListItem>
              <Divider component={"li"} />
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={6} sm={6}>
                    Availability:
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    {product.countInStock > 0 ? "In stock" : "Out of Stock"}
                  </Grid>
                </Grid>
              </ListItem>
              <Divider component={"li"} />
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={6} sm={6} className="py-2">
                    Qty:
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider component={"li"} />
              <ListItem>
                <Grid container>
                  <Grid item xs={12}>
                    {/* Adjust the grid item size as needed */}
                    <Button
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                      // variant="contained"
                      fullWidth
                      size="large"
                      style={{borderRadius: "20px"}}
                      // color="primary"
                      color="secondary"
                      // disabled={false}
                      variant="contained"
                    >
                      Add To Cart
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            {/* <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Availability</Col>
                    <Col>
                      {product.countInStock > 0 ? "In stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card> */}
          </Col>
          {userInfo && userInfo._id === product.user && (
            <Button onClick={handleEdit} variant="contained" color="primary">
              Edit
            </Button>
          )}
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
