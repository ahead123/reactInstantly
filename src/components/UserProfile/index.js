import React from 'react'
import './UserProfile.css'

const UserProfile = ({ text, title, profile_picture, followers, following, posts }) => {
	return (
		<div className="card card-profile text-center">
			<img 
				className="card-img-top" 
				src="https://goo.gl/uoM8jp" 
			/>
			<div className="card-block">
				<img 
					className="card-img-profile" 
					src={profile_picture}
				/>
				<h4 className="card-title">
					{text}
					<small>{title}</small>
					<small><span className="badge badge-primary">Followers { followers }</span></small>
  				<small><span className="badge badge-info">Following { following }</span></small>
  				<small><span className="badge badge-success">Posts { posts }</span></small>
				</h4>
			</div>
		</div>
	)
}



export default UserProfile