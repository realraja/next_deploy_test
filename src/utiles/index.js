// export const navOptions = [
//     {
//       id: "home",
//       label: "Home",
//       path: "/", 
//     },
//   ];
  export const navOptions = [
    { name: "home", href: "/", current: true },
    { name: "Send Message", href: "/message", current: false },
    { name: "Comment", href: "/comment", current: false },
  ];
  
  export const adminNavOptions = [
    { name: "home", href: "/", current: true },
    { name: "Employees", href: "/workers", current: false },
    { name: "Comment", href: "/comment", current: false },
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
  



  
  export const firebaseStroageURL =
    "gs://ecommerce-raja.appspot.com";
  


  export const firebaseConfig = {
    apiKey: "AIzaSyB4Qmn2kPRJAsQ181v-5JgyuNaKw8Ojwt8",
    authDomain: "ecommerce-raja.firebaseapp.com",
    projectId: "ecommerce-raja",
    storageBucket: "ecommerce-raja.appspot.com",
    messagingSenderId: "545731780028",
    appId: "1:545731780028:web:7195ab63f7eb84d89e1fb9",
    measurementId: "G-0ZQGLZ0ZD0"
  };


  export const optionMachine =[
    {
      id: "00",
      label: '00',
    },
    {
      id: "01",
      label: '01',
    },
    {
      id: "02",
      label: '02',
    },
    {
      id: "03",
      label: "03",
    },
    {
      id: "04",
      label: "04",
    },
    {
      id: "05",
      label: "05",
    },
  ]
  export const optionHours = [
    {
      id: "00",
      label: "00",
    },
    {
      id: "01",
      label: "01",
    },
    {
      id: "02",
      label: "02",
    },
    {
      id: "03",
      label: "03",
    },
    {
      id: "04",
      label: "04",
    },
    {
      id: "05",
      label: "05",
    },
    {
      id: "06",
      label: "06",
    },
    {
      id: "07",
      label: "07",
    },
    {
      id: "08",
      label: "08",
    },
    {
      id: "09",
      label: "09",
    },
    {
      id: "10",
      label: "10",
    },
    {
      id: "11",
      label: "11",
    },
    {
      id: "12",
      label: "12",
    },
    {
      id: "13",
      label: "13",
    },
    {
      id: "14",
      label: "14",
    },
    {
      id: "15",
      label: "15",
    },
    {
      id: "16",
      label: "16",
    },
    {
      id: "17",
      label: "17",
    },
    {
      id: "18",
      label: "18",
    },
    {
      id: "19",
      label: "19",
    },
    {
      id: "20",
      label: "20",
    },
    {
      id: "21",
      label: "21",
    },
    {
      id: "22",
      label: "22",
    },
    {
      id: "23",
      label: "23",
    },
  ]
  
  export const optionMinutes = [
    {
      id: "00",
      label: "00",
    },
    {
      id: "01",
      label: "01",
    },
    {
      id: "02",
      label: "02",
    },
    {
      id: "03",
      label: "03",
    },
    {
      id: "04",
      label: "04",
    },
    {
      id: "05",
      label: "05",
    },
    {
      id: "06",
      label: "06",
    },
    {
      id: "07",
      label: "07",
    },
    {
      id: "08",
      label: "08",
    },
    {
      id: "09",
      label: "09",
    },
    {
      id: "10",
      label: "10",
    },
    {
      id: "11",
      label: "11",
    },
    {
      id: "12",
      label: "12",
    },
    {
      id: "13",
      label: "13",
    },
    {
      id: "14",
      label: "14",
    },
    {
      id: "15",
      label: "15",
    },
    {
      id: "16",
      label: "16",
    },
    {
      id: "17",
      label: "17",
    },
    {
      id: "18",
      label: "18",
    },
    {
      id: "19",
      label: "19",
    },
    {
      id: "20",
      label: "20",
    },
    {
      id: "21",
      label: "21",
    },
    {
      id: "22",
      label: "22",
    },
    {
      id: "23",
      label: "23",
    },
    {
      id: "24",
      label: "24",
    },
    {
      id: "25",
      label: "25",
    },
    {
      id: "26",
      label: "26",
    },
    {
      id: "27",
      label: "27",
    },
    {
      id: "28",
      label: "28",
    },
    {
      id: "29",
      label: "29",
    },
    {
      id: "30",
      label: "30",
    },
    {
      id: "31",
      label: "31",
    },
    {
      id: "32",
      label: "32",
    },
    {
      id: "33",
      label: "33",
    },
    {
      id: "34",
      label: "34",
    },
    {
      id: "35",
      label: "35",
    },
    {
      id: "36",
      label: "36",
    },
    {
      id: "37",
      label: "37",
    },
    {
      id: "38",
      label: "38",
    },
    {
      id: "39",
      label: "39",
    },
    {
      id: "40",
      label: "40",
    },
    {
      id: "41",
      label: "41",
    },
    {
      id: "42",
      label: "42",
    },
    {
      id: "43",
      label: "43",
    },
    {
      id: "44",
      label: "44",
    },
    {
      id: "45",
      label: "45",
    },
    {
      id: "46",
      label: "46",
    },
    {
      id: "47",
      label: "47",
    },
    {
      id: "48",
      label: "48",
    },
    {
      id: "49",
      label: "49",
    },
    {
      id: "50",
      label: "50",
    },
    {
      id: "51",
      label: "51",
    },
    {
      id: "52",
      label: "52",
    },
    {
      id: "53",
      label: "53",
    },
    {
      id: "54",
      label: "54",
    },
    {
      id: "55",
      label: "55",
    },
    {
      id: "56",
      label: "56",
    },
    {
      id: "57",
      label: "57",
    },
    {
      id: "58",
      label: "58",
    },
    {
      id: "59",
      label: "59",
    },
  ]
 

  export const optionPeople =  [
    {
      id: 1,
      name: 'Wade Cooper',
      avatar:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'Arlene Mccoy',
      avatar:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Devon Webb',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
      id: 4,
      name: 'Tom Cook',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 5,
      name: 'Tanya Fox',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 6,
      name: 'Hellen Schmidt',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 7,
      name: 'Caroline Schultz',
      avatar:
        'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 8,
      name: 'Mason Heaney',
      avatar:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 9,
      name: 'Claudie Smitham',
      avatar:
        'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 10,
      name: 'Emil Schaefer',
      avatar:
        'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]
  