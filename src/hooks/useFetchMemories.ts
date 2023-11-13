import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { MemoryData } from "../types/Memory";
import { BASEURL } from "../constants/endpoints";

const useFetchMemories = () =>{
    const [memoryList,setMemoryList] = useState<MemoryData[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<AxiosError|null>(null);
    const url = `${BASEURL}/memories`;
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setLoading(true);
                const response:AxiosResponse = await axios.get(url);
                setMemoryList(response.data.memories);
            }catch(error){
                setError(error);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    return {
        memoryList,setMemoryList,loading,error
    }
}

export default useFetchMemories;
