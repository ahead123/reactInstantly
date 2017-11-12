import React from 'react'
import './ProfileImage.css'

const ProfileImage = ({ thumbnailURL, width, height, count, likes, caption }) => {
	return (   
  	<div className="col-4" style={{ marginTop: 80}}>
  		<div className="card card-profile">
  			<div className="card-block">
  				<img 
  					className="card-img-profile" 
  					src={thumbnailURL}
  					width={width}
	  				height={height} 
  				/>
  				<h4 className="card-title">
  					<small><span className="badge badge-primary">Comments {count}</span></small>
  					<small><span className="badge badge-info">Likes {likes}</span></small>
  					<small><span className="badge badge-success">hashTag#</span> { caption }</small>
  				</h4>
  			</div>
  		</div>  
	    	
	 </div>    	   
	)
}

export default ProfileImage