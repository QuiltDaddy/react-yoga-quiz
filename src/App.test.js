import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter
      basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
const tree = renderer
  .create(
    <BrowserRouter
      basename={process.env.PUBLIC_URL}>
      <App testing={true} />
    </BrowserRouter>)
  .toJSON();
expect(tree).toMatchSnapshot();  
});
