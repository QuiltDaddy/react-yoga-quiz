import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Header from './Header';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
const tree = renderer
  .create(
    <Header
      question={1}
      score={0}
      topScore={1} />)
  .toJSON();
expect(tree).toMatchSnapshot();  
});
