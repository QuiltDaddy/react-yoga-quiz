import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import theQuiz from '../theQuiz';
import './Answer.css';

class Answer extends Component {
  componentDidMount(){
    if (!this.props.testing) {
      ReactDOM.findDOMNode(this.refs['link']).focus();
    }
  }

  render() {
    const question = this.props.question > 0 ? this.props.question : 1
    const {correct, nextQuestion} = this.props;
    
    return (
      <>
        <img 
          className='pose'
          src={theQuiz[question].pose}
          alt={theQuiz[question].alt} />
        <br/>
        {(correct === 1) ? (
          <h3>
            Good Job! The correct answer is: {theQuiz[question].answers[theQuiz[question].correctAnswer]}.  You choose right!
          </h3>
        ):(
          <h3>
            Sorry, the correct answer is: {theQuiz[question].answers[theQuiz[question].correctAnswer]}.
          </h3>
        )}
        {(question !== 10) ? (
          <Link
            to={`/question/${question + 1}`}
            className='link'
            ref='link'
            onClick={nextQuestion}>
            Next Question
          </Link>
        ):(
          <Link
            to={'/results'}
            className='link'
            ref='link'>
            View Results
          </Link>
        )}
      </>
    );
  }
}

export default Answer;
