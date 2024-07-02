import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
const useClasses = () => {
    const axiosPublic = useAxiosPublic();
    const {data: classes =[], refetch, isPending, isLoading} = useQuery({
        queryKey: ['classes'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/classes');
            return res.data;
        }
    })
    return [classes, isPending, refetch];
};

export default useClasses;