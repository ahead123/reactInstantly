import React from 'react'
import './UserProfile.css'

const UserProfile = ({ text, title, profile_picture }) => {
	return (
		<div className="card card-profile text-center">
			<img 
				className="card-img-top" 
				src="https://unsplash.it/340/160?image=354" 
			/>
			<div className="card-block">
				<img 
					className="card-img-profile" 
					src={profile_picture}
				/>
				<h4 className="card-title">
					{text}
					<small>{title}</small>
				</h4>
			</div>
		</div>
	)
}



export default UserProfile