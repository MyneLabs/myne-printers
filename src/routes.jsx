import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  NavLink,
} from "react-router-dom";
import React from "react";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="/users" element={<Outlet />}>
        <Route path="" element={<div>hi</div>} />
        <Route path=":id" element={<div>hello</div>} />
      </Route>
    </>
  )
);
