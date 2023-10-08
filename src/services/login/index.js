import { NextResponse } from "next/server";

export const login = async (formData) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error); 
    const data = NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
    return data.json();
  }
};
