

export const addNewComment = async (comment,email) => {
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({comment,email}),
      });
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };