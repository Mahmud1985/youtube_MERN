import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video";
import { darkTheme, lightTheme } from "./utils/Theme";

const Container = styled.div`
  display:flex;
`

const Main = styled.div`
  flex:7;
  background-color:${({ theme }) => theme.bg};
`
const Wrapper = styled.div`
padding: 22px;
@media screen and (max-width:810px) {
  padding: 10px;
}
`

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [burger, setBurger] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu burger={burger} darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar burger={burger} setBurger={setBurger} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
};

export default App;