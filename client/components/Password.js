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
  const [confirmPassword, setConfirmPassword] = useState('');
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


const handleChangeConfirmPassword = (event) => {
  event.preventDefault();
  setConfirmPassword(event.target.value);
};


const handleClick = (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return; // Stop the function if the passwords do not match
  }

  const newUser = {
    id: user.id,
    username: name,
    password: password,
  };
  dispatch(updateSingleUser(newUser));
  console.log("Done");
  history.push('/profile');
};


  return (
    <div style={{ marginLeft: "auto", marginRight: 'auto', textAlign: "center"}}>
       <div >
        {/* <form className="col" onSubmit={handleSubmit(handleClick)}> */}
  <div>
    <div className="col">
      <label>
        <h2 htmlFor="password" style={{ marginRight: "10px" }}>
          Password:{" "}
        </h2>{" "}
      </label>
      <input
        name="password"
        onChange={handleChange3}
        type="password"
        placeholder="Change Password"
      />
    </div>
  </div>
  <div className="col">
  <label>
    <h2 htmlFor="confirmPassword" style={{ marginRight: "10px" }}>
      Confirm Password:{" "}
    </h2>{" "}
  </label>
  <input
    name="confirmPassword"
    onChange={handleChangeConfirmPassword}
    type="password"
    placeholder="Confirm Password"
  />
</div>
    <h2 className='text-center'><button className='btn btn-primary' onClick={handleClick}>Update Password</button></h2>
  </div>
    </div>
  )
}
