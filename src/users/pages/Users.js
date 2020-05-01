import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {

    const USERS = [
        {
            id : 'u1',
            name : 'Md. Sharif Alam',
            image : "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg",
            places: 3
        }
    ]

    return (
        <UsersList items = {USERS}></UsersList>
    )
}

export default Users

