import React from "react";
import { Toaster } from "react-hot-toast";

function Toast() {
  return (
    <Toaster
      containerStyle={{
        top: 80,
      }}
      toastOptions={{
        duration: 5000,
        // style: {
        //   background: '#0C0C10',
        //   color: '#D2D7DF',
        // },
        success: {
          duration: 5000,
          style: {
            background: "#4d7c0f",
            color: "#d9f99d",
          },
          iconTheme: {
            primary: "#d9f99d",
            secondary: "#4d7c0f",
          },
        },
        error: {
          duration: 5000,
          style: {
            background: "#f0d97f",
            color: "#806600",
          },
          iconTheme: {
            primary: "#806600",
            secondary: "#f0d97f",
          },
        },
      }}
    />
  );
}

export default Toast;
