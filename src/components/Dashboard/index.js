import React, { Component } from 'react';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      value: 'Logged in user dashboard'
    };
  }

	render() {
    const { value } = this.state
		return (
			<div className="page-header">
        { value }
			</div>
		);
	}
}
