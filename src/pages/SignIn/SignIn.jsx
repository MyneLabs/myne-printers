import React from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom"; // updated for React Router v6
import loginImage from "../../assets/Image/login.png"; // Add the correct path to your image
import axiosInstance from "../../services/axios";

const SignIn = () => {
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await axiosInstance.post("/printingDistributor/login", {
        email: values.Email,
        password: values.password,
      });

      if (response.status === 200) {
        message.success("Login successful!");
        location.href = "/"; // updated for React Router v6
      }
    } catch (error) {
      console.error("Failed to login:", error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-3/5 flex flex-col justify-between bg-[#1890FF]">
        <h1 className="text-white text-[30px] font-medium mt-6 ml-16">
          Myne Labs
        </h1>
        <div className="flex justify-center items-end mb-6">
          <img src={loginImage} alt="Login Image" />
        </div>
      </div>
      <div className="w-4/5 flex justify-start items-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className=" text-[rgba(0,0,0,0.85)] font-[Satoshi] text-[30px] font-medium leading-[40px] mb-10">
            Login to your Printers Pannel
          </h1>
          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Enter Email address"
              className="text-black font-medium text-[14px]"
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your Email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid Email!",
                },
              ]}
            >
              <Input
                placeholder="Enter Email address"
                type="email"
                size="large"
                style={{ height: "44px" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
              labelCol={{ span: 6 }}
            >
              <Input.Password
                placeholder="Password"
                size="large"
                type="password"
                style={{ height: "44px" }}
              />
            </Form.Item>
            <div className="text-[#1890FF] text-[16px] mb-10">
              <Link to="/auth/reset-password">Forgot Password? Reset</Link>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  width: "130px",
                  marginTop: "12px",
                  padding: "8px 15px",
                  height: "42px",
                  borderRadius: "28px",
                  fontSize: "16px",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
