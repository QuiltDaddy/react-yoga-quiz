import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import pose0 from '../Pictures/pose0.png';
import './LandingPage.css';

class LandingPage extends Component {
  componentDidMount(){
    if (!this.props.testing) {
      ReactDOM.findDOMNode(this.refs['link']).focus();
    }
  }

  render() {
    return (
      <>
        <img 
          className='pose'
          src={pose0}
          alt='Man and Woman Standing' />
        <br/>
        <Link
          to={'/question/1'}
          className='link'
          ref='link'
          onClick={this.props.nextQuestion}>
          Begin
        </Link>
      </>
    );
  }
}

export default LandingPage;
