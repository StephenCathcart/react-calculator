import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Select from './Select';

configure({ adapter: new Adapter() })

describe('<Select />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Select
      label='label'
      value=''
      required={true}
      changed={() => { }}
      options={[]} />);
  });

  it('should render default props', () => {
    expect(wrapper.find('label').text()).toBe('label');
    expect(wrapper.find('select').props().value).toBe('');
    expect(wrapper.find('select').props().required).toBe(true);
  })

  it("should include one option by default", () => {
    expect(wrapper.find("option").length).toEqual(1);
  });

  it("should include two options", () => {
    wrapper.setProps({
      options: [{ value: 'value', displayValue: 'displayValue' }]
    });
    expect(wrapper.find("option").length).toEqual(2);
  });

  it("should call changed prop", () => {
    const onChangedMock = jest.fn();
    wrapper.setProps({
      changed: onChangedMock
    });
    wrapper.find('select').simulate('change');
    expect(onChangedMock).toBeCalledTimes(1);
  });
});