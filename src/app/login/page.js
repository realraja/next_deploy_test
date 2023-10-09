"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import { loginFormControls } from "@/utiles";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormdata);
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader
  } = useContext(GlobalContext);

  const router = useRouter();

  // console.log(formData);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await login(formData);

    // console.log(res);

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT, 
      });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token,{ expires: 365 });
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  // console.log(isAuthUser, user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="bg-gray-700 min-h-[93vh] relative">
      <div className="flex flex-col items-center justify-between md:pt-0 md:pr-10 md:pb-0 md:pl-10 my-20 md:my-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full px-5 md:pr-10 md:pl-10 lg:flex-row">
          <div className="w-full mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start md:p-10 p-5  bg-gray-800 shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : null
                )}
                <button
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Logging In"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to website ?</p>
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Notification /> */}
    </div>
  );
}


/*
"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { loginFormControls } from "@/utiles";
import { useRouter } from "next/navigation";



// const isRegistered = true;

export default function Login() {

  const router = useRouter(); 

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {loginFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        // onChange={(event) => {
                        //   setFormData({
                        //     ...formData,
                        //     [controlItem.id]: event.target.value,
                        //   });
                        // }}
                        // value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  <button
                    className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
                    // disabled={!isFormValid()}
                    // onClick={handleRegisterOnSubmit}
                  >Login</button>

              <div className="flex flex-col gap-2">
                <p>New to website ?</p>
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                    onClick={() => router.push("/register")}
                   >
                    Register
                  </button>
                </div>
                  {/* <button
                    className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
                    // disabled={!isFormValid()}
                    // onClick={handleRegisterOnSubmit}
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
                  </button> }
                  </div>
              
                  </div>
                </div>
              </div>
            </div>
            {/* <Notification /> }
          </div>
        );
      }
      
      
      
      
      
      
      
      
      
*/ 