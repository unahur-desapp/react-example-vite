import { Box, Stack, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Phrases } from "./components/05-mui/Mui04-input";
import { LanguagesPage } from "./components/11-languages/LanguagesPage001";
import { Preferences } from "./components/12-redux/Preferences";

function CustomLink({ to, label }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentOption = location.pathname === to;
  
  return <Typography variant='subtitle1' sx={{ ml: 6, cursor: 'pointer', color: isCurrentOption ? blue[100] : 'white'}} onClick={() => navigate(to)}>{label}</Typography>
}

function MenuBar() {
  return <Stack direction='row' alignItems='center' sx={{ width: '100%', height: '3rem', backgroundColor: blue[300], color: 'white' }}>
    <CustomLink to='/frases' label='Frases' />
    <CustomLink to='/lenguajes' label='Lenguajes' />
    <CustomLink to='/votos' label='Preferencias y votos' />
    <CustomLink to='/otro' label='Otra opción' />
  </Stack>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path='/frases' element={<Phrases />} />
      <Route path='/lenguajes' element={<LanguagesPage />} />
      <Route path='/votos' element={<Preferences />} />
      <Route path='/otro' element={<div>Otra opción</div>} />
      <Route path='/' element={
        <Box sx={{ typography: 'h5', color: grey[900], mx: 6, my: 4 }}>
          Elija una opción del menú
        </Box>
      } />
    </Routes>
  );
}
export function ComplexApp() {
  return <Stack direction="column">
    <MenuBar />
    <AppRouter />
  </Stack>
    ;
}


