import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StudentTable from './StudentTable';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() }); 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StudentTable data={[]} columns={[]} title={""} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
    const component = renderer.create(
        <StudentTable data={[]} columns = {[]} title={''} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correct title', () => {
    const component = shallow(<StudentTable title ={'hello'}/>);
    expect(component.find('.table-title')).toHaveLength(1);
    expect(component.find('.table-title').text()).toBe('hello');
});

it('applies correct cell formatting', () => {
  
});
