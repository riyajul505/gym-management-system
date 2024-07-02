import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import useCheckRole from "../Hooks/useCheckRole";

const AdminRoute = ({children}) => {
    const [adminRole, isLoading] = useCheckRole();
    const {user, loading} = useContext(AuthContext);
    if(loading || isLoading){
        return <div className="w-full h-[100vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    if(adminRole == 'admin'){
        return children
    }
    return <Navigate to={'/'}></Navigate>
};

export default AdminRoute;