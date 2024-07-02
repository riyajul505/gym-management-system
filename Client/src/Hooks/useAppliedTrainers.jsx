import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useAppliedTrainers = () => {
    const axiosSecure = useAxiosSecure();
    const {data: appliedTrainers = [], refetch, isLoading} = useQuery({
        queryKey: ['appliedTrainers'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/applied-trainers');
            return res.data;
        }
    })
    return [appliedTrainers, refetch]
};

export default useAppliedTrainers;