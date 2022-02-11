import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import '../CSS/usersDetails.css'
function UserDetails() {
    const params = useParams()
    const userID = params.userId
    const [userData, setUserData] = useState('')
    console.log('in user details -------------');
    useEffect(() => {
        console.log('in use effect');
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        fetch(`https://reqres.in/api/users/${userID}`, requestOptions)
            .then((response) => response.json())
            .then((data) => setUserData(data.data))
            .catch((err) => console.log(err))
    }, [userID])

    console.log(userData);

    if (!userData) {
        console.log('in if ---------');
        return <div className='loader'></div>
    }

    return (
        <div className='user_details_div'>
                <div className='user_name'>
                    {userData.first_name} {userData.last_name}
                </div>
                <div  className='details_div'>
                    <img src={userData.avatar} className='user_image'></img>
                    <div className='sub_details_div'>
                        <div className='user_id'><span className='id'>ID</span> : {userData.id}</div>
                        <div className='user_email'><span className='email'>Email</span> : {userData.email}</div>
                    </div>
                </div>
        </div>
        // <div>{userData.email}</div>
        // <div>{JSON.stringify(userData)}</div>
    )
}

export default UserDetails