import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useTrainersData = () => {
    const axiosPublic = useAxiosPublic();
    const {data: trainers=[], isLoading,refetch} = useQuery({
        queryKey: ['trainers'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/trainers');
            return res.data;
        }
    });
    return [trainers,isLoading, refetch]
};

export default useTrainersData;