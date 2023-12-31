//add a new product service

import Cookies from "js-cookie";

export const addNewMessage = async (formData) => {
  try {
    const response = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAMessage = async (id) => {
  try {
    const res = await fetch(`/api/message/admin/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};


export const getAllAdminProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/admin/all-products", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};


export const deleteAProduct = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productByCategory = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productById = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    const data = NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
    return data.json();
  }
};
