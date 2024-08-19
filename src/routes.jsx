import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  NavLink,
} from "react-router-dom";
import React from "react";
import PrintOrder from "./pages/PrintOrder/PrintOrder";
import SignIn from "./pages/SignIn/SignIn";
import AdminLayout from "./Layouts/AdminLayout";
import SearchOrder from "./pages/SearchOrder/SearchOrder";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<SignIn />} />
      <Route path="/" element={<AdminLayout />}>
        <Route path="print-orders" element={<PrintOrder />} />
        <Route path="search-order" element={<SearchOrder />} />
        <Route path="about" element={<div>About</div>} />
        <Route path="users" element={<Outlet />}>
          <Route path="" element={<div>hi</div>} />
          <Route path=":id" element={<div>hello</div>} />
        </Route>
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </>
  )
);
