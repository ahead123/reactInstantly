import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import App from './components/App';
import Privacy from './components/Privacy';
import Dashboard from './components/Dashboard';
import NavigationLink from './components/NavigationLink';
import { navData } from './components/NavigationLink/NavLinkData';

class Routes extends Component {

	buildNav = () => {
		let navLinks = [<Link className="navbar-brand" to="/">instaReact</Link>]
		navData.forEach((item, index) => {
			 navLinks.push(<NavigationLink path={item.path} text={item.text} key={index} />)
		})
		return <ul className="navbar-nav mr-auto">{ navLinks }</ul>		
	}

	render(){
		return(
			<div className="container">
		   	
				<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">					
					{this.buildNav()}
				</nav>

		    <div className="container col-md-12" style={styles.navStyles}>
		    	<Route exact path="/" component={App} />
		      <Route path="/privacy" component={Privacy} />
		      <Route path="/dashboard" component={Dashboard} />
		    </div>

		  </div>
		)
	}
}

const styles = {
	navStyles: {
		paddingTop: 80
	}
}	

// Render App to DOM
render((
	<BrowserRouter>
		<Routes />
	</BrowserRouter>
), document.getElementById('react-fun'));
