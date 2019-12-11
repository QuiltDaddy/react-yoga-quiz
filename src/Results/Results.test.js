import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Results from './Results';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Results />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
const tree = renderer
  .create(
    <BrowserRouter>
      <Results testing={true} />
    </BrowserRouter>)
  .toJSON();
expect(tree).toMatchSnapshot();  
});
