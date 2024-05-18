import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { FaTrash, FaUser } from "react-icons/fa6";
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const Users = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch('/users/admin/${user._id}').then(res => {
            alert(`${user.name} is now admin`)
            refetch();
        });
    };

    const handleDeleteUser = user => {
        axiosSecure.delete(`/users/${user._id}`).then(res => {
            alert(`${user.name} is removed from database`);
            refetch();
        })
    }

    return (
        <div>
            <div className='flex items-center justify-between my-4'>
                <h5>All Users</h5>
                <h5>Total Users:{users.length}</h5>
            </div>

            {/* table  */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra md:w-[870px]">
                        {/* head */}
                        <thead className='bg-green text-white rounded-lg'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 'admin' ? "admin" : (<button onClick={() => handleMakeAdmin(user)} className='btn btn-xs btn-circle bg-indigo-500'><FaUser className='text-green' /></button>)
                                            }
                                        </td>
                                        <td><button onClick={() => handleDeleteUser(user)} className='btn btn-xs btn-circle bg-yellow'><FaTrash className=' text-green' /></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div></div>
        </div>

    )
}

export default Users;