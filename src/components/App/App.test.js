import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import SleepBehaviour from '../SleepBehaviour/SleepBehaviour';
import App from './App';

configure({ adapter: new Adapter() })

describe('<App />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render sleep behaviour component', () => {
    expect(wrapper.find(SleepBehaviour)).toHaveLength(1);
  })
});