import React from 'react'
import { Link } from 'react-router-dom'

const NavigationLink = ({ path, text }) => {
	return(
		<li className="nav-item">
			<Link to={path} className="nav-link">{text}</Link>
		</li>
	)
}

export default NavigationLink