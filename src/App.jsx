import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Pricing from "../pages/Pricing";
import Product from "../pages/Product";
import AppLayout from "../pages/AppLayout";
import CityList from "../components/CityList";
import City from "../components/City";
import CountryList from "../components/CountryList";
import Spinner from "../components/Spinner";
import Form from "../components/Form";
import { useState, useEffect } from "react";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(
    function () {
      setIsLoading(true);
      async function getdata() {
        const res = await fetch(`http://localhost:9100/cities`);
        const data = await res.json();
        setCities(data);
        setIsLoading(false);
      }
      getdata();
    },
    [setIsLoading]
  );

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index="*" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="app" element={<AppLayout cities={cities} />}>
            <Route
              index
              element={isLoading ? <Spinner /> : <Navigate to="cities" />}
            />
            <Route
              path="cities"
              element={
                isLoading ? (
                  <Spinner />
                ) : (
                  <CityList cities={cities} setCities={setCities} />
                )
              }
            />
            <Route
              path="cities/:id"
              element={
                <City setIsLoading={setIsLoading} isLoading={isLoading} />
              }
            />
            <Route
              path="countries"
              element={
                isLoading ? <Spinner /> : <CountryList country={cities} />
              }
            />
            <Route path="form" element={<Form setCities={setCities} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
