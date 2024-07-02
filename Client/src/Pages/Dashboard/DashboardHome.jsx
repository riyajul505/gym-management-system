import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { Helmet } from 'react-helmet-async';

const DashboardHome = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <Helmet>
        <title>Admin Dashboard</title>
    </Helmet>
            Welcome to your dashboard: {user.displayName}
        </div>
    );
};

export default DashboardHome;