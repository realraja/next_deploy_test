import { NextResponse } from "next/server";

export const PostNewUsersWork = async (formData) => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const finalData = await response.json();
  
      return finalData;
    } catch (e) {
      console.log("error", e);
      const data = NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again later",
      });
      return data.json();
    }
  };