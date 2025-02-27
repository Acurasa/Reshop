import { useEffect, useState } from "react"
import {Product} from "../models/product"
import Catalog from "../../features/catalog/Catalog";
import {Box, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import NavBar from "../../features/NavBar/NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>( [] );
  useEffect(()=>{
    fetch("http://localhost:5001/api/products").then(r => r.json()).then(d => setProducts(d))
  }, []);
  const [themeMode,setTheme] = useState(true);
  const palleteType = themeMode ? "dark" :  "light"

const changeTheme = ()=> {
  setTheme(prev=> !prev);
}


  const theme = createTheme({
    palette:{
      mode: palleteType,
      background: {
        default: (palleteType === "dark") ? "#000000" : "#fdfefe" 
      }  
    }
  })
  
  
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar themeMode={themeMode} changeMode={changeTheme} />
    <Box 
    sx={{
      minHeight: "100vh",
      background: themeMode 
      ? "radial-gradient(circle, #8B0000, #000000)"
      : "radial-gradient(circle,rgb(113, 248, 203), #fdfefe);"
    }}>
    <Container maxWidth="xl" sx={{mt: 14}}>
      <Catalog products={products}/>
    </Container>
    </Box>
    
    </ThemeProvider>
    
    
    
  )
}

export default App
