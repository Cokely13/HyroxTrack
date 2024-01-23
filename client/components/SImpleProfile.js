import React, { useState } from 'react';

function SimpleProfile() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        console.log("File selected", event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Set the URL for preview
        }
    };

    return (
        <div className="text-center">
            <h1>Simple Profile</h1>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && (
                <div>
                    <p>File Name: {selectedFile.name}</p>
                    {previewUrl && (
                        <div>
                            <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', height: 'auto' }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SimpleProfile;
