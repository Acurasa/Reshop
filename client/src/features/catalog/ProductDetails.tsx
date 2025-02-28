import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../app/models/product";


export default function ProductDetails() {
    const {id} = useParams();
    const [product,setProduct] = useState<Product | null >(null);

    useEffect(()=> {
        fetch(`https://localhost:5001/api/products/${id}`)
        .then(p => p.json).then(pr => setProduct(pr)).catch(err => console.log(err));
    }, [])
  return (
    <div>ProductDetails</div>
  )
}
