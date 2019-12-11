import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import theQuiz from '../theQuiz';import './Question.css';

class Question extends Component {
  componentDidMount(){
    if (!this.props.testing) {
      ReactDOM.findDOMNode(this.refs['radio']).focus();
    }
  }

  render() {
    const question = this.props.question > 0 ? this.props.question : 1
    const {checkAnswer} = this.props;


    return (
      <>
        <img 
          className='pose'
          src={theQuiz[question].pose}
          alt={theQuiz[question].alt} />
        <br/>
        <form>
          <fieldset>
            <legend>Name the yoga pose:</legend>
            <ul>
              {theQuiz[question].answers.map((item, index) => 
                <li key={index}>
                  <label>
                    <input
                      type='radio'
                      name='answer'
                      value={index}
                      defaultChecked={index === 0}
                      ref={index === 0 ? 'radio' : null} />
                    {item}
                  </label>
                </li>
              )}
            </ul>
            <Link
              to={`/question/${question}/answer`}
              className='link'
              onClick={() => {
                checkAnswer(question, (
                  theQuiz[question].correctAnswer === 
                  parseInt(document.querySelector('input[name="answer"]:checked').value)
                ) ? 1 : 0)
              }}>
              Check Answer
            </Link>
          </fieldset>
        </form>
      </>
    );
  }
}

export default Question;
