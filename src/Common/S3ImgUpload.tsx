import axios from "axios";


export const HandleFileInput = async (e: any, headers : any) => {
    const img = e.target.files[0];
    console.log(img);
  
    const formData = new FormData();
    formData.append("file", img);
    
    try {
      const s3UrlResponse = await axios.get("/board/s3url", { headers });
      console.log(s3UrlResponse);
  
      const presignedURL = s3UrlResponse.data.data;
  
      await fetch(presignedURL, {
        method: "PUT",
        headers: {
          "Content-Type": img.type,
        },
        body: img,
      });
      console.log(s3UrlResponse.data.data.split('?')[0]);
      const imgURL = s3UrlResponse.data.data.split('?')[0];
      return imgURL;
      // axios.post("/board/imgurl", {
      //   imgURL:imgURL
      // },{
      //   headers: headers
      // })

    // axios.post("/board/img", formData,{
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }).then(res => {
    //   console.log(res.data.location)
    //   alert('성공')
    // }).catch(err => {
    //   alert('실패')
    // })
    } catch (error: any) {
      console.log(error);
      return {success:false, msg:error.response.status}
     
  }

  }
