import React from 'react'

const ProfileImage = ({ thumbnailURL, width, height }) => {
	return (
        <span>
        	<img 
        		className="img-fluid img-thumbnail" 
        		src={thumbnailURL}
        		width={width}
        		height={height} 
        	/>
        </span>
	)
}

export default ProfileImage