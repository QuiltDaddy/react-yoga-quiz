import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
  render() {
    return (
      <>
        <h1>
          Peace is not found, it is created.
          <br/>
          The page you are searching for is also not found,
          <br/>
          so this page was created.
        </h1>
        <Link
          to={'/question/1'}
          className='link'>
          Go To Quiz
        </Link>
      </>
    );
  }
}

export default NotFoundPage;
