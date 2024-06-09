'use client'
import ComponentLevelLoader from '@/components/Loader/componentlevel';
import { GlobalContext } from '@/context';
import { addNewMessage } from '@/services/message';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {

    const {componentLevelLoader,setComponentLevelLoader,isAuthUser,user} = useContext(GlobalContext);

    const [subject,setSubject] = useState('');
    const [message,setMessage] = useState('');

    function isValidForm() {
        return subject &&
        subject.trim() !== ""&&
        message &&
        message.trim() !== ""
          ? true
          : false;
      }
      const formData = {
        name: user?.name,
        subject: subject,
        message: message,
        email: user?.email
      };

      const router = useRouter()
      
    //   console.log(formData);

    const handleOnClick = async() =>{
        if(!isAuthUser){
            toast.error('Login to send message', {
                position: toast.POSITION.TOP_RIGHT, 
            });
            setComponentLevelLoader({ loading: false, id: "" });
            router.push('/login');
            return;
        }
        setComponentLevelLoader({ loading: true, id: "" });
        
        const res = await addNewMessage(formData);

    console.log(res);

        if (res.success) {
        toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT, 
        });
        setSubject('');
        setMessage('');
        setComponentLevelLoader({ loading: false, id: "" });
        } else {
        toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
        setComponentLevelLoader({ loading: false, id: "" });
        }
    }

  return (
    <div>
      <section className= "bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">

          <div>
            {
              user?.role === 'admin'?(
<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center  text-white">Send Notification to Workers!</h2>
              ):(
                <>
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center  text-white">Message Us</h2>
            <p className="mb-8 lg:mb-16 font-light text-center  text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                </>
              )
            }
          </div>
            
                <div className="space-y-8">
                <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">Subject</label>
                    <input type="text" value={subject} maxLength='70' onChange={(e)=>setSubject(e.target.value)} id="subject" className="block p-3 w-full text-sm rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light" placeholder="Let us know how we can help you" required />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium  text-gray-400">Your message</label>
                    <textarea id="message" value={message} onChange={(e)=>setMessage(e.target.value)} rows="6" className="block p-2.5 w-full text-sm  rounded-lg shadow-sm border  focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type='submit'  onClick={handleOnClick} className="disabled:opacity-50 py-3 px-5 text-sm font-medium text-center bg-black text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800" disabled={!isValidForm()}>
                    {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Sending"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Send message"
                  )}</button>
                </div>
        </div>
      </section>
    </div>
  )
}

export default page
