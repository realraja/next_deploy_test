// export const navOptions = [
//     {
//       id: "home",
//       label: "Home",
//       path: "/", 
//     },
//   ];
  export const navOptions = [
    { name: "home", href: "/", current: true },
    { name: "Posts", href: "/posts", current: false },
    { name: "Send Message", href: "/message", current: false },
  ];
  
  export const adminNavOptions = [
    { name: "home", href: "/", current: true },
    { name: "Manage Work", href: "/works", current: false },
    { name: "Employees", href: "/workers", current: false },
  ];

  export const userNavigation = [
    { name: "Your Profile", href: "/profile" },
    { name: "Sign out", href: "#" },
  ]; 
  
  export const registrationFormControls = [
    {
      id: "name",
      type: "text",
      placeholder: "Enter your name",
      label: "Name",
      componentType: "input",
    },
    {
      id: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
      componentType: "input",
    },
    {
      id: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
      componentType: "input",
    },
    {
      id: "village",
      type: "",
      placeholder: "",
      label: "Village",
      componentType: "select",
      options: [
        {
          id: "",
          label: "choose your village",
        },
        {
          id: "village-1",
          label: "village-1",
        },
        {
          id: "village-2",
          label: "village-2",
        },
        {
          id: "village-3",
          label: "village-3",
        },
        {
          id: "village-4",
          label: "village-4",
        },
        {
          id: "village-5",
          label: "village-5",
        },
        {
          id: "village-6",
          label: "village-6",
        },
        {
          id: "village-7",
          label: "village-7",
        },
        {
          id: "village-8",
          label: "village-8",
        },
        {
          id: "village-9",
          label: "village-9",
        },
        {
          id: "village-10",
          label: "village-10",
        },
      ],
    },
  ];
  
  
  export const loginFormControls = [
    {
      id: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
      componentType: "input",
    },
    {
      id: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
      componentType: "input",
    },
  ];
  
  export const adminAddProductformControls = [
    {
      id: "name",
      type: "text",
      placeholder: "Enter name",
      label: "Name",
      componentType: "input",
    },
    {
      id: "price",
      type: "number",
      placeholder: "Enter price",
      label: "Price",
      componentType: "input",
    },
    {
      id: "description",
      type: "text",
      placeholder: "Enter description",
      label: "Description",
      componentType: "input",
    },
    {
      id: "category",
      type: "",
      placeholder: "",
      label: "Category",
      componentType: "select",
      options: [
        {
          id: "men",
          label: "Men",
        },
        {
          id: "women",
          label: "Women",
        },
        {
          id: "kids",
          label: "Kids",
        },
      ],
    },
    {
      id: "deliveryInfo",
      type: "text",
      placeholder: "Enter deliveryInfo",
      label: "Delivery Info",
      componentType: "input",
    },
    {
      id: "onSale",
      type: "",
      placeholder: "",
      label: "On Sale",
      componentType: "select",
      options: [
        {
          id: "yes",
          label: "Yes",
        },
        {
          id: "no",
          label: "No",
        },
      ],
    },
    {
      id: "priceDrop",
      type: "number",
      placeholder: "Enter Price Drop",
      label: "Price Drop",
      componentType: "input",
    },
  ];
  
  export const AvailableSizes = [
    {
      id: "s",
      label: "S",
    },
    {
      id: "m",
      label: "M",
    },
    {
      id: "l",
      label: "L",
    },
  ];
  

  
  export const firebaseStroageURL =
    "gs://ecommerce-raja.appspot.com";
  
  export const addNewAddressFormControls = [
    {
      id: "fullName",
      type: "input",
      placeholder: "Enter your full name",
      label: "Full Name",
      componentType: "input",
    },
    {
      id: "address",
      type: "input",
      placeholder: "Enter your full address",
      label: "Address",
      componentType: "input",
    },
    {
      id: "city",
      type: "input",
      placeholder: "Enter your city",
      label: "City",
      componentType: "input",
    },
    {
      id: "country",
      type: "input",
      placeholder: "Enter your country",
      label: "Country",
      componentType: "input",
    },
    {
      id: "postalCode",
      type: "input",
      placeholder: "Enter your postal code",
      label: "Postal Code",
      componentType: "input",
    },
  ];

  export const firebaseConfig = {
    apiKey: "AIzaSyB4Qmn2kPRJAsQ181v-5JgyuNaKw8Ojwt8",
    authDomain: "ecommerce-raja.firebaseapp.com",
    projectId: "ecommerce-raja",
    storageBucket: "ecommerce-raja.appspot.com",
    messagingSenderId: "545731780028",
    appId: "1:545731780028:web:7195ab63f7eb84d89e1fb9",
    measurementId: "G-0ZQGLZ0ZD0"
  };
 
  