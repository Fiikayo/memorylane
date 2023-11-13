import { useState } from "react";
import { BASEURL } from "../constants/endpoints";
import axios from "axios";
import ImageRequestBody from "../types/ImageRequestBody";

const useUploadImages = ()=>{

    const [error,setError] = useState<string|null>(null)
    const [success,setSuccess] = useState<string|null>(null)
    const [uploadedImage,setUploadedImage] = useState<string|null>(null);
    const url = `${BASEURL}/upload-image`;

    const uploadImage = async (requestBody:ImageRequestBody) =>{
        try {
            const { data } = await axios.post(url, requestBody, {
                headers: { 'Content-Type': 'multipart/form-data' },
              })
              setUploadedImage(`${BASEURL}/${data.img}`)
              setSuccess('Image succesfully updated')
              console.log(data)
              setError(null)
        } catch (error) {
            setError(error.response.data.error)
            setSuccess(null);
        }
    }

    return {error, success, uploadedImage, uploadImage}
}

export default useUploadImages;
