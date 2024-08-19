import React, { useState } from "react";
import {
  AimOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  EditOutlined,
  GatewayOutlined,
  LayoutOutlined,
  MailOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, NavLink } from "react-router-dom";

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <NavLink to="/login">Login</NavLink>,
  },
  // {
  //   key: "2",
  //   icon: <AppstoreOutlined />,
  //   label: <NavLink to="/admin/all-orders">All Orders</NavLink>,
  //   children: [
  //     {
  //       key: "21",
  //       label: "To be Designed",
  //       icon: <EditOutlined />,
  //       children: [
  //         {
  //           key: "211",
  //           label: <NavLink to="/admin/all-orders">Design</NavLink>,
  //         },
  //         {
  //           key: "212",
  //           label: <NavLink to="/admin/all-orders">E.E</NavLink>,
  //         },
  //       ],
  //     },
  //     {
  //       key: "22",
  //       icon: <AimOutlined />,
  //       label: <NavLink to="/admin/all-orders">AI</NavLink>,
  //     },
  //   ],
  // },
  {
    key: "8",
    icon: <ShopOutlined />,
    label: <NavLink to="/print-orders">Print Orders</NavLink>,
  },
  {
    key: "9",
    icon: <ShopOutlined />,
    label: <NavLink to="/search-order">Customer Address Search</NavLink>,
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
const SideBar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["231"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      className="block mg:hidden"
      items={items}
    />
  );
};
export default SideBar;
