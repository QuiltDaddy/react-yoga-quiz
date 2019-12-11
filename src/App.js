import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header/Header';
import LandingPage from './LandingPage/LandingPage';
import Question from './Question/Question';
import Answer from './Answer/Answer';
import Results from './Results/Results';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '/react-yoga-quiz',
      question: 0,
      score: 0,
      topScore: 0,
      answers: {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0
      },
      redirect: false,
      notFound: false
    };

    this.handleNavigation = this.handleNavigation.bind(this);this.turnOffRedirect = this.turnOffRedirect.bind(this);
    this.turnOffNotFound = this.turnOffNotFound.bind(this);
    this.navButtonEvent = this.navButtonEvent.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    // On back/forward nav button click control navigation
    window.onpopstate = this.navButtonEvent;

    // On url entry control navigation
    this.handleNavigation();
  }

  componentDidUpdate() {
    this.handleNavigation();
    this.turnOffRedirect();
    this.turnOffNotFound();
  }

  navButtonEvent(e) {
    // Prevent back/forward button to results page
    e.preventDefault();
    let path = window.location.pathname.replace(this.state.appName, '');
    if (path === '/results' && this.state.question !== 10) {
      this.setState({
        redirect: true
      });
    }
    this.handleNavigation();
  }

  handleNavigation() {
    // Maintain state on back/forward button navigation and url load
    let path = window.location.pathname.replace(this.state.appName, '');
    const questions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    if (path === '/' && this.state.question !== 0) {
      this.setState({
        question: 0,
        score: 0,
        topScore: 0
      });
    } // ensures correct state on LandingPage
    
    if (path.slice(0, 10) !== '/question/') { return; }
    // ensures path starts with '/question/'

    path = path.slice(10);

    const question = path.length < 3 && questions.includes(path);
    // boolean, on question page?

    const answer = path.includes('/answer') && questions.includes(path.replace('/answer', ''));
    // boolean, on answer page

    if (!question && !answer) { 
      this.setState({
        notFound: true
      });
    } // if incorrect path then let NotFoundPage handle it

    let update = parseInt(path) !== this.state.question;
    if (question && this.state.topScore + 1 !== this.state.question) { update = true; }
    if (answer && this.state.topScore !== this.state.question) { update = true; }
    // determines if state needs to update

    if (update) {
      let newAnswers = {};
      let newScore = 0;
      for (let x = 1; x <= 10; x++) {
        if (answer) {
          newAnswers[x] = x <= parseInt(path) ?
          this.state.answers[x] : 0;
        } else {
          newAnswers[x] = x < parseInt(path) ?
          this.state.answers[x] : 0;
        }
        newScore += newAnswers[x];
      }

      this.setState({
        question: parseInt(path),
        score: newScore,
        topScore: parseInt(path) - ((answer) ? 0 : 1),
        answers: newAnswers
      });
    } // updates out of sync states
  }

  turnOffRedirect() {
    if (this.state.redirect) {
      this.setState({
        redirect: false
      });
    }
  }

  turnOffNotFound() {
    if (this.state.notFound) {
      this.setState({
        notFound: false
      });
    }
  }

  nextQuestion(resetQuiz) {
    // Set state to next question or reset quiz
    if (resetQuiz === true) {
      this.setState({
        question: 1,
        score: 0,
        topScore: 0,
        answers: {
          1:0,
          2:0,
          3:0,
          4:0,
          5:0,
          6:0,
          7:0,
          8:0,
          9:0,
          10:0
        },
        redirect: false
      });
    } else {
      this.setState({
        question: this.state.question + 1
      });
    }
  }

  checkAnswer(question, answer) {
    // Update state with new answer
    let newAnswers = this.state.answers;
    newAnswers[question] = answer;

    let newScore = 0;
    for (let answer in newAnswers) {
      newScore += newAnswers[answer];
    }

    this.setState({
      answers: newAnswers,
      score: newScore,
      topScore: question
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    if (this.state.notFound) {
      this.nextQuestion(true);
      return <Redirect to='/404' />
    }

    return (
      <div className='App'>
        <Header
          question={this.state.question}
          score={this.state.score}
          topScore={this.state.topScore} />
        <main role='main'>
          <Switch>
            <Route 
              exact path='/'
              render={() => 
                <LandingPage
                  nextQuestion={this.nextQuestion}
                  testing={this.props.testing} />
              }/>
            <Route
              exact path='/question/:question'
              render={() => 
                <Question
                  question={this.state.question}
                  checkAnswer={this.checkAnswer} />
              }/>
            <Route
              exact path='/question/:question/answer'
              render={() => 
                <Answer 
                  question={this.state.question}
                  correct={this.state.answers[this.state.question]}
                  nextQuestion={this.nextQuestion} />
              }/>
            <Route
              path='/results'
              render={() => 
                <Results 
                  score={this.state.score}
                  nextQuestion={this.nextQuestion} />
              }/>
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
