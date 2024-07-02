import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useLoadTrainer = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: trainer = [] , isLoading, refetch} = useQuery({
    queryKey: ["trainer", user.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainer-details/${user?.email}`);
      return res.data;
    },
  });
  return [trainer, isLoading, refetch]
};

export default useLoadTrainer;
