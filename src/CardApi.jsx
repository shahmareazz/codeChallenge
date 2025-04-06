import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sampleContext } from "./App";
import { motion } from "framer-motion";

const CardApi = () => {
  const { product, setProduct } = useContext(sampleContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryFocused, setIsCategoryFocused] = useState(false);
  const [isSortFocused, setIsSortFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProduct(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  //-------------------- Filter and Sort Logic-------------------------
  const filteredProducts = product
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => (categoryFilter ? item.category === categoryFilter : true))
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  const categories = [...new Set(product.map((item) => item.category))];

  if (loading) return <h3 className="text-center"><Spinner animation="border" /></h3>;
  if (error) return <h3 className="text-center text-danger">{error}</h3>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#cdebc5" }}>
      <h1 className="text-center text-success">PRODUCT LIST</h1>

      {/*---------- Search & Filter Controls -----------------*/}

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          style={{
            width: "250px",
            borderColor: isSearchFocused ? "#198754" : "",
            boxShadow: isSearchFocused ? "0 0 0 0.2rem rgba(25, 135, 84, 0.25)" : ""}}/>

        <Form.Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          onFocus={() => setIsCategoryFocused(true)}
          onBlur={() => setIsCategoryFocused(false)}
          style={{
            width: "200px",
            borderColor: isCategoryFocused ? "#198754" : "",
            boxShadow: isCategoryFocused ? "0 0 0 0.2rem rgba(25, 135, 84, 0.25)" : ""}} >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>))}
        </Form.Select>

        <Form.Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          onFocus={() => setIsSortFocused(true)}
          onBlur={() => setIsSortFocused(false)}
          style={{
            width: "200px",
            borderColor: isSortFocused ? "#198754" : "",
            boxShadow: isSortFocused ? "0 0 0 0.2rem rgba(25, 135, 84, 0.25)" : ""  }} >
          <option value="">Sort by Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </Form.Select>
      </div>

      {/*--------------- Product Cards------------- */}

      
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {filteredProducts.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/product/${item.id}`)}
            style={{ cursor: "pointer" }}>
            <Card
              style={{
                width: "18rem",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)" }}>
              <Card.Img
                variant="top"
                src={item.images[0]}
                style={{ height: "180px", objectFit: "cover" }}/>
              <Card.Body className="text-center">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="text-success fw-bold">
                  ${item.price}
                </Card.Text>
                <Card.Text className="text-muted">{item.category}</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardApi;
