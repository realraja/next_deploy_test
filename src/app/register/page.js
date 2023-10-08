"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { firebaseConfig, firebaseStroageURL, registrationFormControls } from "@/utiles";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { registerNewUser } from "@/services/register";
import { GlobalContext } from "@/context";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { UserCircleIcon } from "@heroicons/react/24/solid";



const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${timeStamp}-${randomStringValue}-${getFile.name}`;
};

async function helperForUPloadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  name: "",
  email: "",
  password: "",
  village: "",
  photoURL: "",
  role: "employee",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const { pageLevelLoader, setPageLevelLoader , isAuthUser } = useContext(GlobalContext);

  const router = useRouter()

  const handleImage = async(event)=> {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0]
    );

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        photoURL: extractImageUrl,
      });
    }
    
  }

  // console.log(formData);

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""&&
      formData.photoURL &&
      formData.photoURL.trim() !== ""&&
      formData.village &&
      formData.village.trim() !== ""
      ? true
      : false;
  }

  // console.log(isFormValid());

  async function handleRegisterOnSubmit() {
    setPageLevelLoader(true);
    const data = await registerNewUser(formData);

   
    

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
    }

    console.log(data);
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="bg-gray-700 ">
      <div className="flex flex-col items-center justify-between px-5 pt-0 md:pr-10 md:mb-10 md:pl-10  mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col my-5 justify-center items-center w-full md:pr-10 md:pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0  max-w-2xl lg:w-5/12">
            <div className="flex flex-col items-center justify-start p-5 md:pt-10 md:pr-10 md:pb-10 md:pl-10 bg-gray-800 shadow-2xl rounded-xl  z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                {isRegistered
                  ? "Registration Successfull !"
                  : "Sign up for an account"}
              </p>
              {isRegistered ? (
                <button
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
                onClick={()=>router.push('/login')}
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0  space-y-8">
                  <div>
                    <p className="hidden md:block  absolute -mt-15 mr-0 mb-0 ml-2 font-medium text-white bg-gray-800">Photo</p>
                  </div>
                  <div className="md:flex w-full">
                    <UserCircleIcon className="h-12 w-12 m-auto text-gray-300" aria-hidden="true" />
                    <input
                    className="m-auto border w-full bg-gray-800 border-gray-300 cursor-pointer"
                    accept="image/*"
                    max="1000000"
                    type="file"
                    onChange={handleImage}
                    />
                  </div>
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  
                  <button
                    className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
                    disabled={!isFormValid()}
                    onClick={handleRegisterOnSubmit}
                  >
                    {pageLevelLoader ? (
                      <ComponentLevelLoader
                        text={"Registering"}
                        color={"#ffffff"}
                        loading={pageLevelLoader}
                      />
                    ) : (
                      "Register"
                    )}
                  </button>

                  <div className="flex flex-col gap-2">
                    <p>Already User ?</p>
                    <button
                      className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                      text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                      "
                      onClick={() => router.push("/login")}
                    >
                      Login
                    </button>
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Notification /> */}
    </div>
  );
}
