import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import pose0 from '../Pictures/pose0.png';
import quotes from '../quotes';
import './Results.css';

class Results extends Component {
  componentDidMount(){
    if (!this.props.testing) {
      ReactDOM.findDOMNode(this.refs['link']).focus();
    }
  }
  
  render() {
    const {score, nextQuestion} = this.props;
    
    return (
      <>
        <img 
          className='pose'
          src={pose0}
          alt='Man and Woman Standing' />
        <br/>
        <h3>You scored a {score} out of 10</h3>
        <Link
          to='/question/1'
          className='link'
          ref='link'
          onClick={() => nextQuestion(true)}>
          Play Again
        </Link>
        <h1 className='quote'>{quotes[score]}</h1>
      </>
    );
  }
}

export default Results;
