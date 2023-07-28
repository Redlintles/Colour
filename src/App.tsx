import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/Frame/Header/Header";
import Footer from "components/Frame/Footer/Footer";

import { lazy, Suspense } from "react";
import PageTextContextProvider from "context/PageTextContext";
import Loading from "components/Frame/Loading/Loading";
import { ColorBarContextProvider } from "context/ColorBarContext";

const Home = lazy(() => import("pages/Home/Home"));
const ColorConverter = lazy(
  () => import("pages/ColorConverter/ColorConverter")
);
const Gradgen = lazy(() => import("pages/Gradgen/Gradgen"));
const PalleteGen = lazy(() => import("pages/PalleteGen/PalleteGen"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageTextContextProvider>
          <Header />
          <main>
            <ColorBarContextProvider>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/Colour/" element={<Home />} />
                  <Route
                    path="/Colour/converter"
                    element={<ColorConverter />}
                  />
                  <Route path="/Colour/gradgen" element={<Gradgen />} />
                  <Route path="/Colour/palletegen" element={<PalleteGen />} />
                </Routes>
              </Suspense>
            </ColorBarContextProvider>
          </main>
          <Footer />
        </PageTextContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
