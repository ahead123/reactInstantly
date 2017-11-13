import React from 'react'
import './ProfileImage.css'

const ProfileImage = ({ thumbnailURL, width, height, count, likes, caption, link }) => {
	return (   
  	<div className="col-lg-3" style={{ marginTop: 80}}>
  		<div className="card card-profile">
  		<a href={link} target="_blank" style={{textDecoration: 'none', color: 'black'}}>
  			<div className="card-block">
	  				<img 
	  					className="card-img-profile" 
	  					src={thumbnailURL}
	  					width={width}
		  				height={height} 
	  				/>
  				<h4 className="card-title">
  					<small><span className="badge badge-pill badge-primary">Comments {count}</span></small>
  					<small><span className="badge badge-pill badge-info">Likes {likes}</span></small>
  					<small><span className="badge badge-pill badge-success">Post</span></small>
  					<small>{ caption }</small>
  				</h4>
  			</div>
  		</a>
  		</div>  
	    	
	 </div>    	   
	)
}

export default ProfileImage