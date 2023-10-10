

export const getAllUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/allusers", {
        method: "GET",
      });
  
      const data = await res.json();
  
    //   console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  export const UpdateUserStatus = async(id) =>{
      try {
          const res = await fetch(`/api/allusers/${id}`,{
              method: 'PUT',
          });
          const data = await res.json();

          return data;

          // if(!data.success) return toast.error(data.message);

          // return toast.success(data.message);

          // router.refresh();

      } catch (error) {
          console.log('error in put',error);
      }
  
  }
  export const DeleteUserStatus = async(id) =>{
      try {
          const res = await fetch(`/api/allusers/${id}`,{
              method: 'DELETE',
          });
          const data = await res.json();

          return data;

          // if(!data.success) return toast.error(data.message);

          // return toast.success(data.message);

          // router.refresh();

      } catch (error) {
          console.log('error in put',error);
      }
  
  }