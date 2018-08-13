import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() }); 


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('generates correct titles', () => {
    const component = shallow(<App/>);
})