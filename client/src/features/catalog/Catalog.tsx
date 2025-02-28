import { useEffect, useState } from "react";
import ProductList from "./ProductList"
import { Product } from "../../app/models/product";

 

export default function Catalog() {

  const [products, setProducts] = useState<Product[]>( [] );
  useEffect(()=>{
    fetch("http://localhost:5001/api/products").then(r => r.json()).then(d => setProducts(d))
  }, []);

  return (
    <>
       <ProductList products={products}/>
    </>
  )
}
