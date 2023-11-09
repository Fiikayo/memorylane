import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react"

const useFetchMemories = () =>{
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<AxiosError|null>(null);
    const url = 'http://localhost:4001/memories'
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setLoading(true);
                const response:AxiosResponse = await axios.get(url);
                console.log(response);
                setData(response.data);
            }catch(error){
                console.log(error);
                setError(error)
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    return {
        data,loading,error
    }
}

export default useFetchMemories;
