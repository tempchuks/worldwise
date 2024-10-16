import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Pricing from "../pages/Pricing";
import Product from "../pages/Product";
import AppLayout from "../pages/AppLayout";
import CityList from "../components/CityList";
import City from "../components/City";
import CountryList from "../components/CountryList";

import Form from "../components/Form";
import AuthProvider from "./contexts/AuthProvider";
import { useEffect } from "react";
import ProtectedRoute from "./contexts/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index="*" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />

          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
