import { Outlet } from 'react-router-dom';
import Footerr from '../Components/Common/Footerr';
import Navbar from '../Components/Common/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar/>
            
            <div className='px-4'>
            <Outlet/>
            </div>
            
            <Footerr/>
        </div>
    );
};

export default Root;