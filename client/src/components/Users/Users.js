import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig'
import { TiDelete } from 'react-icons/ti'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import "./users.css"

const Users = () => {
  const [users, setUsers] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [userSearch, setUserSearch] = useState()

  const getUsers = async () => {
    const userList = await axios.get('/user')
    setUsers(userList.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const setUserRole = async (type, user) => {
    await axios.put(`/user/${user._id}`, {
      role: type
    })
    getUsers()
  }

  const setUserToDelete = (user) => {
    setOpenModal(true)
    setSelectedUser(user)
  }

  const confirmDelete = async () => {
    if(selectedUser.email === "admin@gmail.com") {
      return 
    }
    await axios.delete(`/user/${selectedUser._id}`)
    setOpenModal(false)
    getUsers()
  }

  const searchUser = (e) => {
    setUserSearch(e.target.value)
    if(e.target.value.length === 0) {
      getUsers()
      return
    }
    userSearch && setUsers(users.filter((user) => {
      if(user.name.toLowerCase().includes(userSearch.toLowerCase()) || user.email.toLowerCase().includes(userSearch.toLowerCase())) {
        return user
      }
    }))
  }

  return (
    <div>
      <div className="user-display">
        <input 
          className='user-search'
          placeholder="Search Users"
          value={userSearch}
          onChange={(e) => searchUser(e)}
          >
          </input>
        {users && users.map((user) => {
          return (
            <div className="user-card" key={user._id}>
              <div className="user-info">
                <div style={{fontWeight: "bolder", fontSize: "20px"}}>
                  {user.name}
                </div>
                <div>
                  {user.email}
                </div>
                <div className='role-select-div'>
                  {user.email !== "admin@gmail.com" ? 
                  <span
                    className='role-select'
                    style={{ backgroundColor: user.role === "user" ? '#A9B7A1' : "#F5F5F5", color: user.role === 'user' ? "black" : "#888888", cursor: 'pointer' }}
                    onClick={() => setUserRole('user', user)}
                  >
                    User
                  </span>
                  : "" }
                  <span
                    className='role-select'
                    style={{ backgroundColor: user.role === "admin" ? '#A9B7A1' : "#F5F5F5", color: user.role === 'admin' ? "black" : "#888888", cursor: 'pointer' }}
                    onClick={() => setUserRole("admin", user)}
                  >
                    Admin
                  </span>
                </div>
              </div>
              {user.email !== "admin@gmail.com" ?
              <div className="delete-user" onClick={() => setUserToDelete(user)}>
                <TiDelete />
              </div> : ""}
            </div>
          )
        })}
      </div>
      <Dialog
        open={openModal}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent className='dialogContent'>
          Are you sure you want to delete this user? This is permanent and cannot be undone.
        </DialogContent>
        <DialogActions>
          <button type="primary"
            onClick={() => setOpenModal(false)}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="primary"
            className="confirm-delete"
            onClick={() => confirmDelete()}
          >
            Confirm Delete
          </button>
        </DialogActions>
      </Dialog>
    </div>

  )
}

export default Users