import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { RiDashboardFill } from "react-icons/ri";
import { FaLocationArrow, FaQuestionCircle, FaUsers } from "react-icons/fa";
import { RiShoppingBasketLine } from "react-icons/ri";
import { RiMenuAddFill } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Login from "../components/Login"

import logo from "/logo.png";
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const sharedLinks = (
    <>
        <li className='mt-3'>
            <Link to="/">
                <RiDashboardFill className='text-green' />Home
            </Link>
        </li>
        <li>
            <Link to="/menu"><FaCartShopping className='text-green' />Menu</Link>
        </li>
        <li>
            <Link to="/menu"><FaLocationArrow className='text-green' />Orders Tracking</Link>
        </li>
        <li>
            <Link to="/menu"><FaQuestionCircle className='text-green' />Customer Support</Link>
        </li>
    </>
)

const DashboardLayout = () => {
    const { loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    return (
        <div>
            {
                isAdmin ? (<div className="drawer sm:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                        {/* Page content here */}
                        <div className='flex items-center justify-between mx-4'>
                            <label htmlFor="my-drawer-2"
                                className="btn btn-primary drawer-button lg:hidden md:hidden"
                            ><MdDashboardCustomize className='text-green' />
                            </label>
                            <button className='btn btn-success rounded-full px-6 bg-green text-white sm:hidden'><FaRegUser />Logout</button>
                        </div>
                        <div className='mt-5 md:mt-2 mx-4'>
                            <Outlet />
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <li>
                                <Link to="/dashboard" className='flex justify-start mb-3'>
                                    <img src={logo} className='w-20' />
                                    <span className='badge badge-secondary'>admin</span>
                                </Link>
                            </li>
                            <hr />
                            <li className='mt-3'>
                                <Link to="/dashboard"><RiDashboardFill className='text-green' />Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/users"><RiShoppingBasketLine className='text-green' />Manage Bookings</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/add-menu"><RiMenuAddFill className=' text-green' />Add Menu</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manage-items"><GiNotebook className=' text-green' />Manage Items</Link>
                            </li>
                            <li className='mb-3'>
                                <Link to="/dashboard/users"><FaUsers className=' text-green' />All Users</Link>
                            </li>
                            <hr />
                            {/* shared nav Links  */}
                            {
                                sharedLinks
                            }
                        </ul>
                    </div>
                </div>) : <Login />
            }
        </div>
    )
}

export default DashboardLayout