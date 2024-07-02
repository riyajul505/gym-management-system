import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import useAxiosPublic from './useAxiosPublic';

const useCheckRole = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {data: adminRole, isLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async ()=>{
            const res = await axiosPublic.get(`/check-role/${user?.email}`);
            return res.data;
        }
    });
    return [adminRole, isLoading]
};

export default useCheckRole;