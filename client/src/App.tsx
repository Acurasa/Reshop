import { useEffect, useState } from "react"
import {Product} from "./product"

function App() {
  const [products, setProducts] = useState<Product[]>( [] );

  useEffect(()=>{
    fetch("http://localhost:5001/api/products").then(r => r.json()).then(d => setProducts(d))
  }, []);

  const addProduct = () => {
    setProducts(prevState => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "product" + (prevState.length + 1),
        description: "Sample description",
        price: prevState.length * 100 + 100,
        pictureUrl: "https://via.placeholder.com/150",
        type: "Sample type",
        brand: "Sample brand",
        quantityInStock: 10
      }
    ]);
  };
  return (
    <>
      <h1>
        Reshop
      </h1>
      <ul>
        {products.map((item, i) => {
          return <li key={i}>{item.name} is: {item.price}</li>
        })}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </>
  )
}

export default App
