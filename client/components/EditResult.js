import React from 'react'
import { useParams,  } from 'react-router-dom'
import { useSelector, useDispatch,  } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState,  } from 'react'
import { fetchResult,updateSingleResult} from '../store/singleResultsStore'

function EditResult() {
  const dispatch = useDispatch()
  let history = useHistory();
  const { resultId } = useParams();
  useEffect(() => {
    dispatch(fetchResult(resultId))
    // Safe to add dispatch to the dependencies array
  }, [])
  const result = useSelector((state) => state.singleResult )

  const [time, setTime] = useState(result.time);


  const handleChange = (event) => {
    event.preventDefault()
    setTime(event.target.value)
    // setCreatedBy(id)
    // console.log("HA", like)
    // console.log("NAME", name)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    result.time = time

    dispatch(updateSingleResult(result))
    history.push(`/results`)
  }



  return (
    <div >
    <div><b>EditResult</b></div>
    <form className ="row text-center">
      <div className ="row text-center">
        <div>
        <label> <h2 htmlFor="eventName" style={{marginRight: "10px"}}>Event Name: </h2></label>
          <input className ="text-center" name='name'  type="text" value={result.eventName}/>
        </div>
        <div>
        <label><h2 htmlFor="time" style={{marginRight: "10px"}}>Time: </h2></label>
          <input name='time' className ="text-center" onChange={handleChange}  type="text" placeholder={result.time}/>
        </div>
      </div>
      <Link className='btn btn-primary' to={`/profile`} onClick={handleSubmit} style={{width: "10rem",  marginRight: "auto", marginLeft: "auto", marginTop: "10px"}} > Submit</Link>
      <Link className='btn btn-warning' to={`/profile`}  style={{width: "10rem", marginRight: "auto", marginLeft: "auto", marginTop: "10px"}} > Cancel </Link>
    </form>
    </div>
  )
}

export default EditResult
