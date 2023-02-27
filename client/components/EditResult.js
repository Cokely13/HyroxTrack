import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchResult,updateSingleResult} from '../store/singleResultsStore'

function EditResult() {
  const dispatch = useDispatch()
  const { resultId } = useParams();
  const result = useSelector((state) => state.singleResult )

  useEffect(() => {
    dispatch(fetchResult(resultId))
    // Safe to add dispatch to the dependencies array
  }, [])

  return (
    <div >
    <div>EditResult</div>
    <form>
      <div className ="row text-center">
        <div>
        <label> <h2 htmlFor="username" style={{marginRight: "10px"}}>Event Name: </h2></label>
          <input name='name'  type="text" placeholder={result.eventName}/>
        </div>
        <div>
        <label><h2 htmlFor="username" style={{marginRight: "10px"}}>Time: </h2></label>
          <input name='image'  type="text" placeholder={result.time}/>
        </div>
      </div>
    </form>
    </div>
  )
}

export default EditResult
