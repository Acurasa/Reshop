import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useFetchBasketQuery } from "../basket/basketApi";
import { ShoppingCart } from "@mui/icons-material";

const midLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" }
]



const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
]

const navStyle = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  '&:hover': {
    color: "grey.500"
  },
  '&.active': {
    color: "#bfeac9"
  }
}

type Props = {
  themeMode: boolean,
  changeMode: () => void
}

export default function NavBar({ themeMode, changeMode }: Props) {
  //const dispatch = useAppDispatch();
  const {data: basket } = useFetchBasketQuery();

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0


  return (
    <AppBar position="fixed"
      sx={{
        backgroundColor: themeMode ? "#1A1A1A" : "#B2F5EA",
        transition: "background-color 0.3s ease-in-out"
      }}>
      <Toolbar sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <Box display="flex" alignContent="center" >
          <Typography variant="h6"
            sx={
              {
                color: themeMode ? "#FFFFFF" : "#000000"
              }
            }>RESHOP</Typography>

          <Switch
            checked={themeMode}
            onChange={changeMode}
          />
        </Box>
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              key={path}
              to={path}
              sx={
                navStyle}>
              {title}
            </ListItem>
          ))
          }
        </List>
        <Box display="flex" alignContent="center">
          <IconButton component={Link} to="/basket" size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart/>
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                key={path}
                to={path}
                sx={navStyle}>
                {title}
              </ListItem>
            ))
            }
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
