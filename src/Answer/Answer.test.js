import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Answer from './Answer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Answer
        question={1}
        correct={1} />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
const tree = renderer
  .create(
    <BrowserRouter>
      <Answer 
        question={1}
        correct={1}
        testing={true} />
    </BrowserRouter>)
  .toJSON();
expect(tree).toMatchSnapshot();  
});
