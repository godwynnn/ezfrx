"use client"
import React, { useEffect, useState } from 'react'
import Hero from '@/app/hero'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { Urls } from '@/app/urls'
import { useSelector } from 'react-redux'



const url = Urls()
function AdminDashboard() {



    const [users, setUsers] = useState({
                                    'active_user_count':'',
                                    'total_amount':'',
                                    'user_data':[],
                                    'total_users':''

                                    })

    const authData = useSelector(state => state.reducer.authreducer)
    const logged_in = authData.logged_in

    const getUsers = () => {
        fetch(`${url.get_users}`, {
            method: 'GET',

            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            },

        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setUsers(data.data.user_data)
                setUsers({
                    'active_user_count':data.data.active_user_count,
                    'total_amount':data.data.amount_invested,
                    'user_data':data.data.user_data,
                    'total_users':data.data.user_count,
                    
                })
                // setUsers({'users_data':data.data.user_data,'user_count':data.data.user_count})
            })
    }



    useEffect(() => {
        getUsers()
    }, [])
    console.log('users', users)


    function manageUser(cred) {
        try {
            fetch(`${url.manage_user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.accessToken}`
                    // 'Content-Type': 'application/form-data',
                },
                body: JSON.stringify(cred)
            }).then(res => res.json())
                .then(data => console.log(data))
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <Hero>
                <div className='bg-[#0B1215] p-10  min-h-[100vh] w-full'>

                    <div className='w-[100%] min-h-[20%] grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 place-items-center  max-sm:grid-cols-1 gap-4'>
                        <div className="card lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[80%] bg-base-100 shadow-xl text-center">
                            <div className="card-body">
                                <h2 className="card-title">Total Users</h2>
                                <p>{users.total_users}</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>


                        <div className="card lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[80%] bg-base-100 shadow-xl text-center">
                            <div className="card-body">
                                <h2 className="card-title">Active Users</h2>
                                <p>{users.active_user_count}</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>

                        <div className="card lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[80%] bg-base-100 shadow-xl text-center">
                            <div className="card-body">
                                <h2 className="card-title">Total Amount Paid in</h2>
                                <p>{users.total_amount}</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>

                        <div className="card lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[80%] bg-base-100 shadow-xl text-center">
                            <div className="card-body">
                                <h2 className="card-title">Daily Paid in</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>
                    </div>

                    <br /><br />
                    <label class="input input-bordered flex items-center lg:w-[40%] md:w-[50%] sm:w-[60%] gap-2">
                        <input type="text" class="grow" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
                    </label>


                    <div className='w-[100%] min-h-[80%] bg-slate-200  rounded-lg mt-10'>
                        <div className="overflow-x-auto overflow-y-scroll  h-[70vh] ">
                            <table className="table max-sm:w-[100%] table-auto">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>

                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.user_data.map(user => {
                                            return (<tr>
                                                <th>
                                                    <label>
                                                        <input type="checkbox" className="checkbox" />
                                                    </label>
                                                </th>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{user.first_name} {user.last_name}</div>
                                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {user.email}
                                                    {/* <br />
                                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                                </td>
                                                <td>{user.is_subscribed}</td>
                                                <th>
                                                    <details className="dropdown">
                                                        <summary className="btn btn-ghost btn-xs">details</summary>

                                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                                                            {user.role === 'USER' ?

                                                                <li onClick={() => {
                                                                    manageUser({ 'email': user.email, 'new_role': 'ADMIN', 'old_role': user.role })
                                                                }}>

                                                                    <a  >Admin</a></li>
                                                                :
                                                                <li onClick={() => {
                                                                    manageUser({ 'email': user.email, 'new_role': 'USER', 'old_role': user.role })
                                                                }}><a>User</a></li>

                                                            }

                                                            <li><a>Remove</a></li>




                                                        </ul>
                                                    </details>
                                                </th>
                                            </tr>)
                                        })
                                    }


                                </tbody>


                            </table>
                        </div>
                    </div>



                </div>
            </Hero>
        </>
    )
}

export default AdminDashboard