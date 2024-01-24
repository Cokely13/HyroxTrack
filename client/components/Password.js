import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore'


export default function Password() {
  // const {register, handleSubmit } = useForm()
  const {id} = useSelector((state) => state.auth )
  const dispatch = useDispatch()
  let history = useHistory();
  const [password, setPassword] = useState();
  const user = useSelector((state) => state.singleUser )
  const [name, setName] = useState(user.username);
  const [editProfile, setEditProfile] = useState()
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])



const handleUpdate =(event) => {
  event.preventDefault()
  setName(user.username)
  setAvatar(user.imageUrl)
  setPassword(user.password)
  setEditProfile(id)
}



const handleChange = (event) => {
  event.preventDefault()
  setName(event.target.value)
}



const handleChange3 = (event) => {
  event.preventDefault()
  setPassword(event.target.value)
  // console.log("HA", like)
}





const handleClick = (e) => {
  e.preventDefault();
  const newUser = {
    id: user.id,
    username: name,
    password: password,
  };
  dispatch(updateSingleUser(newUser));
  console.log("Done")
  history.push('/profile');
};


  return (
    <div style={{ marginLeft: "auto", marginRight: 'auto', textAlign: "center"}}>
       <div >
        {/* <form className="col" onSubmit={handleSubmit(handleClick)}> */}
  <div>
    {/* <div className="col">
      <label>
        <h2 htmlFor="username" style={{ marginRight: "10px" }}>
          User Name:{" "}
        </h2>
      </label>
      <input
        name="username"
        onChange={handleChange}
        type="text"
        placeholder={user.username}
      />
    </div> */}
    <div className="col">
      <label>
        <h2 htmlFor="password" style={{ marginRight: "10px" }}>
          Password:{" "}
        </h2>{" "}
      </label>
      <input
        name="password"
        onChange={handleChange3}
        type="text"
        placeholder="Change Password"
      />
    </div>
  </div>
{/* </form> */}
    <h2 className='text-center'><button className='btn btn-primary' onClick={handleClick}>Update Profile</button></h2>
  </div>
    </div>
  )
}
