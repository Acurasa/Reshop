import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

type Props = {
    themeMode : boolean,
    changeMode : ()=> void
}

export default function NavBar({themeMode, changeMode}: Props) {
  return (
    <AppBar position="fixed"
    sx={{
      backgroundColor: themeMode ? "#1A1A1A" : "#B2F5EA",
      transition: "background-color 0.3s ease-in-out"
    }}>
        <Toolbar>
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
        </Toolbar>
    </AppBar>
  )
}
