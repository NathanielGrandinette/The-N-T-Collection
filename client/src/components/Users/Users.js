import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig'
import "./users.css"

const Users = () => {
  const [users, setUsers] = useState(null)
  const [refresh, setRefresh] = useState(false)

  const getUsers = async () => {
    const userList = await axios.get('/user')
    setUsers(userList.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const setUserRole = async (type, id) => {
    await axios.put(`/user/${id}`, {
      role: type
    })
    getUsers()
  }

  return (
    <div>
      {users && users.map((user) => {
        return (
          <div className="user-card">
            <div>
              {user.name}
            </div>
            <div>
              {user.email}
            </div>
            <div>
              <span
                style={{ backgroundColor: user.role === "user" ? 'green' : "white", cursor: 'pointer'}}
                onClick={() => setUserRole('user', user._id)}
              >
                User
              </span>
              &nbsp;|&nbsp;
              <span
                style={{ backgroundColor: user.role === "admin" ? 'green' : "white", cursor: 'pointer' }}
                onClick={() => setUserRole("admin", user._id)}
              >
                Admin
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Users