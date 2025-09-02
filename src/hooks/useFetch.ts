import { useState } from "react"
import { api } from "../api";

export const useFetch = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const get = async(url: string) => {

        try{

            setLoading(true);

            const response = await api.get(url)

            if(response.data){
             
                setLoading(false);

                return response?.data;

            }


        }catch(error){

            setError(error as string);

        }

    }

    const patch = async(url: string) => {

        try{

            setLoading(true);

            const response = await api.patch(url)

            if(response.data){
             
                setLoading(false);

                return response?.data;

            }

        }catch(error){

            setError(error as string);
        }

    }

    const post = async (url: string, body: object) => {

        const response = await api.post(url, body)

        return response.data;

    }

    return { error, loading, get, patch, post }

}