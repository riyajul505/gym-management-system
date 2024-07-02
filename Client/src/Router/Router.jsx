import {
  createBrowserRouter
} from "react-router-dom";
import AddNewClass from "../Components/Classes/AddNewClass";
import AllClasses from "../Components/Classes/AllClasses";
import Error from "../Components/Common/Error";
import AddNewForum from "../Components/Forums/AddNewForum";
import Community from "../Components/Forums/Community";
import AllSubscriber from "../Components/Newsletter/AllSubscriber";
import AdminPayment from "../Components/Payment/AdminPayment";
import Payment from "../Components/Payment/Payment";
import AllTrainers from "../Components/Trainers/AllTrainers";
import BeATrainer from "../Components/Trainers/BeATrainer";
import AddNewSlot from "../Components/Trainers/Dashboard/AddNewSlot";
import TrainerBooking from "../Components/Trainers/TrainerBooking";
import TrainerDetails from "../Components/Trainers/TrainerDetails";
import Dashboard from "../Layout/Dashboard";
import Root from "../Layout/Root";
import ManageBookings from "../Pages/Booking/ManageBookings";
import AllTrainersForAdmin from "../Pages/Dashboard/Admin/AllTrainersForAdmin";
import AppliedTrainer from "../Pages/Dashboard/Admin/AppliedTrainer";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import BookedClass from "../Pages/UserDashboard/BookedClass";
import ProfilePage from "../Pages/UserDashboard/ProfilePage";
import UserActivity from "../Pages/UserDashboard/UserActivity";
import AddPostRoute from "./AddPostRoute";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import TrainerRoute from "./TrainerRoute";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <Error/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
        {
          path: '/trainer',
          element: <AllTrainers/>
        },
        {
          path: '/trainer/:id',
          element: <TrainerDetails/>,
          loader: ({params})=> fetch(`https://ph-12-server.vercel.app/trainer/${params.id}`),
        },
        {
          path: '/booking/:id',
          element: <PrivateRoute><TrainerBooking/></PrivateRoute>,
          loader: ({params})=> fetch(`https://ph-12-server.vercel.app/trainer/${params.id}`),
        },
        {
          path: '/payment/:id',
          element: <PrivateRoute><Payment/></PrivateRoute>,
          loader: ({params})=> fetch(`https://ph-12-server.vercel.app/trainer/${params.id}`),
        },
        {
          path: "/be-a-trainer",
          element: <PrivateRoute><BeATrainer/></PrivateRoute>,
        },
        {
          path: '/classes',
          element: <AllClasses/>
        },
        {
          path: '/community',
          element: <Community/>,
          loader: ()=> fetch('https://ph-12-server.vercel.app/community-post')
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children: [
        {
          path: '/dashboard',
          element: <PrivateRoute><DashboardHome/></PrivateRoute>
        },
        {
          path: '/dashboard/add-new-forum',
          element: <AddPostRoute><AddNewForum/></AddPostRoute>
        },
        // user dashboard
        {
          path: '/dashboard/profile-page',
          element: <PrivateRoute><ProfilePage/></PrivateRoute>,
        },
        {
          path: '/dashboard/user-activity',
          element: <PrivateRoute> <UserActivity/> </PrivateRoute>
        },
        {
          path: '/dashboard/booked-slot',
          element: <PrivateRoute><BookedClass/></PrivateRoute>
        },
        // trainer dashboard
        {
          path:'/dashboard/manage-slot',
          element: <TrainerRoute><ManageBookings/></TrainerRoute>,
        },
        {
          path: '/dashboard/add-new-slot',
          element: <TrainerRoute><AddNewSlot/></TrainerRoute>,
        },
        // admin dashboard
        {
          path: '/dashboard/applied-trainers',
          element: <AdminRoute><AppliedTrainer/></AdminRoute>,
        },
        {
          path: '/dashboard/balance',
          element: <AdminRoute><AdminPayment/></AdminRoute>,
          loader: ()=> fetch('https://ph-12-server.vercel.app/payments-summary')
        },
        {
          path: '/dashboard/get-newsletter-subscribers',
          element: <AdminRoute><AllSubscriber/></AdminRoute>,
          loader: ()=> fetch('https://ph-12-server.vercel.app/all-newsletter-subscriber')
        },
        {
          path: '/dashboard/all-trainers',
          element: <AdminRoute><AllTrainersForAdmin/></AdminRoute>
        },
        {
          path: '/dashboard/add-new-class',
          element: <AdminRoute><AddNewClass/></AdminRoute>
        }
      ]
    }
  ]);


export default router;