import React from "react";
import { FC } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar";
// import Header from "../components/Header";

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto text-white">
      <div>
        {/* <Header /> */}
        <NavBar />
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout;
