import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Main";
import { Content } from "antd/es/layout/layout";

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));

  // Function to handle resizing
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // lg breakpoint is 1024px
  };

  useEffect(() => {
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Layout className="!bg-white flex-row h-full fixed w-full">
        {isMobile ? null : <Sidebar />}
        <Content className="px-10 xl:px-24 py-10 overflow-y-auto mb-20">
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};

export default AdminLayout;
