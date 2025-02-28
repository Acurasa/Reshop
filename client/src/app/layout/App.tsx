import {useState } from "react"
import {Box, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import NavBar from "../../features/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
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
      <Outlet />
    </Container>
    </Box>
    
    </ThemeProvider>
    
    
    
  )
}

export default App
