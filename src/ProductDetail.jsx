import { useParams } from "react-router-dom";
import { useContext } from "react";
import { sampleContext } from "./App";
import { Button } from "react-bootstrap";

const ProductDetail = () => {
  const { id } = useParams();
  const { product } = useContext(sampleContext);
  const selectedProduct = product.find((p) => p.id === parseInt(id));

  if (!selectedProduct) return <h3 className="text-center">Product not found!</h3>;

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>{selectedProduct.title}</h1>
        <img src={selectedProduct.images[0]} alt={selectedProduct.title} className="img-fluid rounded shadow-sm" style={{ maxHeight: "300px" }} />
        <p className="mt-3"><strong>Price:</strong> ${selectedProduct.price}</p>
        <p><strong>Category:</strong> {selectedProduct.category}</p>
        <p><strong>Rating:</strong> {selectedProduct.rating} / 5</p>
        <p><strong>Description:</strong> {selectedProduct.description}</p>
        <Button href="/" variant="success">Go Back</Button>
      </div>
    </div>
  );
};

export default ProductDetail;
