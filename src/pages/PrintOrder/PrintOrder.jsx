import {
  ArrowDownOutlined,
  DropboxOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
const PrintOrder = () => {
  const [data, setData] = useState(["a", "a"]);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showPackage, setShowPackage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [showMoreInfoData, setShowMoreInfoData] = useState(null);
  const [showPackageData, setShowPackageData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    axiosInstance.get("/printingDistributor/getAllOrders").then((res) => {
      // console.log("hi");
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    // Fetch data from API
    fetchData();
  }, [refetch]);

  useEffect(() => {
    // Fetch data from API
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <h1 className="text-2xl m-3">Print Order</h1>
        <p className="m-3">To be printed orders</p>
      </div>
      <div className="flex gap-6 flex-wrap">
        {data.map((item, index) => (
          <PrintOrderCard
            setShowMoreInfo={setShowMoreInfo}
            setShowPackage={setShowPackage}
            key={index}
            data={item}
            setRefetch={setRefetch}
            refetch={refetch}
            setShowMoreInfoData={setShowMoreInfoData}
            setShowPackageData={setShowPackageData}
          />
        ))}
      </div>
      <MoreInfoModal
        setShowMoreInfo={setShowMoreInfo}
        showMoreInfo={showMoreInfo}
        showMoreInfoData={showMoreInfoData}
      />
      <PackageModal
        setShowPackage={setShowPackage}
        showPackage={showPackage}
        showPackageData={showPackageData}
      />
    </div>
  );
};

export default PrintOrder;

const PrintOrderCard = ({
  setShowPackage,
  setShowMoreInfo,
  data,
  setRefetch,
  refetch,
  setShowPackageData,
  setShowMoreInfoData,
}) => {
  const handleDownload = () => {
    console.log(data);
    if (data.status < 6) {
      console.log("status less than 6");
      axiosInstance
        .post("/printingDistributor/updateStatus", {
          order_id: data?._id,
        })
        .then((res) => {
          console.log(res.data);
          setRefetch(!refetch);
        });
    }
    console.log("downloading");
  };
  return (
    <div className="w-[250px] h-[300px] flex flex-col bg-gray-100 shadow-md rounded-lg overflow-hidden">
      <div className="flex-grow">
        <img
          src={data?.orderLayouts?.[0]?.images?.[0]?.mediaLink}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-around p-2 bg-gray-300">
        <InfoCircleOutlined
          className="text-black cursor-pointer px-2 py-1 text-xl"
          onClick={() => {
            setShowMoreInfoData(data);
            setShowMoreInfo(true);
          }}
        />
        <DropboxOutlined
          className="text-white cursor-pointer px-2 py-1 text-xl"
          onClick={() => {
            setShowPackageData(data);
            setShowPackage(true);
          }}
        />
        <ArrowDownOutlined
          className={`cursor-pointer px-2 py-1 text-xl ${
            data?.status < 6 ? "text-black" : "text-blue-800"
          }`}
          onClick={handleDownload}
        />
      </div>
    </div>
  );
};

const MoreInfoModal = ({ showMoreInfo, setShowMoreInfo, showMoreInfoData }) => {
  console.log(showMoreInfoData);
  return (
    <Modal open={showMoreInfo} onCancel={() => setShowMoreInfo(false)}>
      <div>
        <h1 className="text-2xl m-3">Order Details</h1>
        <div className="text-xl m-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            doloribus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            doloribus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            doloribus!
          </p>
        </div>
      </div>
    </Modal>
  );
};

const PackageModal = ({ setShowPackage, showPackage, showPackageData }) => {
  console.log(showPackageData);
  return (
    <Modal open={showPackage} onCancel={() => setShowPackage(false)}>
      <div>
        <h1 className="text-2xl m-3">Package Details</h1>
        <div className="text-xl m-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            doloribus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            doloribus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            doloribus!
          </p>
        </div>
      </div>
    </Modal>
  );
};
