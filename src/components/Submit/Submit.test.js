import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Submit from './Submit';

configure({ adapter: new Adapter() })

describe('<Submit />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Submit
      value='Submit'
      disabled={false}
    />);
  });

  it('should render default props', () => {
    expect(wrapper.find('input').props().type).toBe('submit');
    expect(wrapper.find('input').props().value).toBe('Submit');
    expect(wrapper.find('input').props().disabled).toBe(false);
  })
});