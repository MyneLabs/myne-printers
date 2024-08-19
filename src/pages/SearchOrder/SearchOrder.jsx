import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";

const SearchOrder = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [trackingId, setTrackingId] = useState("");
  const handleSearch = () => {
    // remove leading and trailing whitespaces
    setTrackingId("");
    const trimmedSearchText = searchText.trim();

    // if search text is empty, do nothing
    if (trimmedSearchText === "") {
      return;
    }

    // find the order with the given order number
    const order = data.find((order) => order.orderId === trimmedSearchText);
    setOrderDetails(order);
    setSearchText(trimmedSearchText);
    console.log(trimmedSearchText);
    console.log(order);

    if (!order) {
      console.log("Order not found");
      return;
    }
    setTrackingId(order.trackingId);
    // check for status number and update the status
    if (order?.status < 7) {
      // call api to update order status
      axiosInstance
        .post("/printingDistributor/updateStatusToUnderPacking", {
          order_id: order?._id,
        })
        .then((res) => {
          console.log(res.data);
          // update the status in the UI
          setOrderDetails({
            ...order,
            status: 7,
          });
          setData((prevData) => {
            const newData = prevData.map((item) => {
              if (item.orderId === order.orderId) {
                return {
                  ...item,
                  status: 7,
                };
              }
              return item;
            });
            return newData;
          });
        });
    }
  };

  const handleUpdateTrackingID = () => {
    // remove leading and trailing whitespaces
    const trimmedTrackingId = trackingId.trim();
    // if search text is empty, do nothing
    if (trimmedTrackingId === "") {
      return;
    }
    console.log(trimmedTrackingId);

    axiosInstance
      .post("/printingDistributor/updateStatusToDispatched", {
        order_id: orderDetails?._id,
        tracking_id: trimmedTrackingId,
      })
      .then((res) => {
        console.log(res.data);
        // update the status in the UI
        setOrderDetails({
          ...orderDetails,
          status: 8,
          trackingId: trimmedTrackingId,
        });
        setData((prevData) => {
          const newData = prevData.map((item) => {
            if (item.orderId === orderDetails.orderId) {
              return {
                ...item,
                status: 8,
                trackingId: trimmedTrackingId,
              };
            }
            return item;
          });
          return newData;
        });
      });
  };

  useEffect(() => {
    // Fetch data from API

    axiosInstance.get("/printingDistributor/getAllOrders").then((res) => {
      // console.log("hi");
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-2xl m-3"> Search for customers address</h1>
      <div className="flex">
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for the order number"
          className="w-1/2 m-3"
        />
        <SearchOutlined className="" onClick={handleSearch} />
      </div>
      {!orderDetails ? (
        <div className="text-3xl m-4 text-red-600">Order ID not found</div>
      ) : (
        <div>
          <div className="text-3xl m-4">Order Details:</div>
          <div className="text-xl m-4">
            <div>Order ID: {orderDetails?.orderId}</div>
            <div>{orderDetails?.shipTo?.person}</div>
            <div>{orderDetails?.shipTo?.address?.city}</div>
            <div> {orderDetails?.shipTo?.address?.country}</div>
            <div>{orderDetails?.shipTo?.address?.pincode}</div>
            <div> {orderDetails?.shipTo?.address?.state}</div>
            <div> {orderDetails?.shipTo?.address?.street}</div>
          </div>

          <Input
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter tracking ID"
            className="w-1/2 m-2"
          />
          <Button
            type="primary"
            className="m-2 w-auto"
            onClick={handleUpdateTrackingID}
          >
            Update
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchOrder;
