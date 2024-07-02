import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://ph-12-server.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
