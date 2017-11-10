import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './Home';
import Privacy from './Privacy';
import NavigationLink from './NavigationLink'
import { navData } from './NavLinkData'

class Routes extends Component {

	buildNav = () => {
		let navLinks = []
		navData.forEach((item, index) => {
			 navLinks.push(<NavigationLink path={item.path} text={item.text} key={index} />)
		})
		return <ul className="nav">{ navLinks }</ul>		
	}

	render(){
		return(
			<div className="container">
		   	
				<div className="container col-md-12">
					 {this.buildNav()}
				</div>

		    <div className="container col-md-12">
		    	<Route exact path="/" component={Home} />
		      <Route path="/users" component={Home} />
		      <Route path="/privacy-policy" component={Privacy} />
		    </div>

		  </div>
		)
	}
}	

// Render App to DOM
ReactDOM.render((
	<BrowserRouter>
		<Routes />
	</BrowserRouter>
), document.getElementById('react-fun'));
