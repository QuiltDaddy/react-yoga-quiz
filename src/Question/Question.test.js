import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Question from './Question';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Question />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
const tree = renderer
  .create(
    <BrowserRouter>
      <Question testing={true} />
    </BrowserRouter>)
  .toJSON();
expect(tree).toMatchSnapshot();  
});
