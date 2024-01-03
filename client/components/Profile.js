import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSingleUser } from '../store/singleUserStore'
import { fetchChallenges } from '../store/allChallengesStore'
import { updateSingleUser } from '../store/singleUserStore'


function Profile() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const challenges = useSelector((state) => state.allChallenges )
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

console.log("id", id)

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [dispatch,])

  useEffect(() => {
    dispatch(fetchChallenges())
    // Safe to add dispatch to the dependencies array
  }, [dispatch,])


const recentResult = () => {
  const recent = user.results ? user.results : []
    recent.sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 1);

  if (recent.length > 0) {
    return recent[0].date
  }

  return null;
};

const recentWorkout = () => {
  const recent = user.userworkouts ? user.userworkouts : []
    recent.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 1);

  if (recent.length > 0) {
    return recent[0].updatedAt.slice(0, 10)
  }

  return null;
};

const imageUrl = user.image ? `http://localhost:8080/${user.image}` : null;

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Set the URL for preview
  }
};


const handleUpload = async () => {
  if (!selectedFile) {
    alert('Please select a file to upload');
    return;
  }

  const formData = new FormData();
  formData.append('image', selectedFile);

  try {
    // Upload the photo to your server
    const uploadResponse = await fetch(`/api/users/${user.id}`, {
      method: 'PUT', // Change this to PUT
      body: formData,
    });

    if (uploadResponse.ok) {
      const responseData = await uploadResponse.json();
      // Assuming the server response contains the URL of the uploaded image
      dispatch(updateSingleUser({ id, image: responseData.imageUrl }));
      alert('Photo uploaded and profile updated successfully');
    } else {
      alert('Upload failed');
    }
  } catch (error) {
    console.error('Error uploading file:', error.response ? error.response.data : error);
    alert('Upload failed');
  }
};


  return (
    <div className="text-center">
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "25px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>{user.userName}'s Profile</b></h1>

    {user.image && (
    <div className="profile rounded text-center add"  style={{ marginBottom: "15px", marginTop: "25px",  marginLeft: "auto", marginRight: "auto", width: "15%" }}>
      <img  src={imageUrl} alt={`${user.userName}'s profile`} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  )}
    <div style={{fontSize:"25px"}} >
    <div><b>Total Workouts:</b> {user.userworkouts ? user.userworkouts.length : 0}</div>
    <div><b>Total Results:</b> {user.results ? user.results.length : 0}</div>
    <div><b>Total Challenges:</b> {user.challenges ? user.challenges.length : 0}</div>
    <div><b>Champs:</b>  {user.challenges
    ? user.challenges.filter(challenge => challenge.champ === id).length
    : 0}</div>
    <div><b>Most Recent Result: </b>{recentResult()} </div>
    <div><b>Most Recent Workout: </b>{recentWorkout()} </div>
    </div>
    <div style={{ margin: '20px 0' }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Photo</button>
        {previewUrl && (
          <div style={{ marginTop: '20px' }}>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '20%', height: 'auto' }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
