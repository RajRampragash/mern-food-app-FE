import styled, { ThemeProvider } from "styled-components";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import {lightTheme} from "./utils/them/Them"
import Home from "./pages/Home.jsx"
import { useState } from "react";
import Authentication from "./pages/Authentication.jsx";
import Fav from "./pages/Fav.jsx";
import Cart from "./pages/Cart.jsx";
import FoodDetails from "./pages/FoodDetails.jsx"
import FoodListing from "./pages/FoodListing.jsx"
import { useSelector } from "react-redux";


const Container = styled.div``;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar setOpenAuth={setOpenAuth} openAuth={openAuth} currentUser={currentUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Fav />} />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/dishes/:id" element={<FoodDetails />} /> 
            <Route path="/dishes" element={<FoodListing />} /> 
          </Routes>
          {openAuth && <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}
 
export default App;
