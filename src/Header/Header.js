import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    }

    this.widthChange = this.widthChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.widthChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.widthChange);
  }

  widthChange() {
    this.setState({
      width: window.innerWidth
    });
  }

  render() {
    const {question, score, topScore} = this.props;

    return (
      <header role='banner'>
        {(this.state.width > 430) ? (
          <>
            <h2>Question: {question}</h2>
            <h1>Yoga Quiz</h1>
            <h2>Score: {score}/{topScore}</h2>
          </>
        ) : (
          <>
            <h1>Yoga Quiz</h1>
            <div>
              <h2>Question: {question}</h2>
              <h2>Score: {score}/{topScore}</h2>
            </div>
          </>
        )}
      </header>
    );
  }
}

export default Header;
