import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Select from '../Select/Select';
import Submit from '../Submit/Submit';
import SleepBehaviour from './SleepBehaviour';
import { saveScore } from './SleepBehaviourAPI';

jest.mock('./SleepBehaviourAPI', () => (
  {
    ...(jest.requireActual('./SleepBehaviourAPI')),
    saveScore: jest.fn()
  }
))

configure({ adapter: new Adapter() })

describe('<SleepBehaviour />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SleepBehaviour />);
  });

  it('should render two select components', () => {
    expect(wrapper.find(Select)).toHaveLength(2);
  })

  it('should have correct title for submit button', () => {
    expect(wrapper.find(Submit).props().value).toBe("Calculate");
  })

  it('should have blank output by default', () => {
    expect(wrapper.find('p').text()).toBe("");
  })

  it('should be disabled by default', () => {
    expect(wrapper.state().disabled).toBe(true);
  })

  it('should set disabled to false when all selects have value', () => {
    wrapper.find(Select).at(0).props().changed({ target: { value: "10" } });
    wrapper.find(Select).at(1).props().changed({ target: { value: "5" } });

    expect(wrapper.state().disabled).toBe(false);
    expect(wrapper.find(Submit).props().disabled).toBe(false);
  })

  it('should display loading on submit and before request is resolved', () => {
    const response = { data: { score: 50 } };
    saveScore.mockReturnValue(Promise.resolve(response));

    wrapper.find(Select).at(0).props().changed({ target: { value: "10" } });
    wrapper.find(Select).at(1).props().changed({ target: { value: "5" } });
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(saveScore.mock.calls[0][0]).toStrictEqual({ score: 50 });
    expect(wrapper.find('p').text()).toBe("Loading");
  })

  it('should display score on submit after request is resolved', async () => {
    const response = { data: { score: 50 } };
    saveScore.mockReturnValue(Promise.resolve(response));

    wrapper.find(Select).at(0).props().changed({ target: { value: "10" } });
    wrapper.find(Select).at(1).props().changed({ target: { value: "5" } });
    await wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(saveScore.mock.calls[0][0]).toStrictEqual({ score: 50 });
    expect(wrapper.find('p').text()).toBe("score: 50");
  })

  it('should display error on submit after request is resolved', async () => {
    saveScore.mockReturnValue(Promise.reject(null));

    wrapper.find(Select).at(0).props().changed({ target: { value: "10" } });
    wrapper.find(Select).at(1).props().changed({ target: { value: "5" } });
    await wrapper.find('form').simulate('submit', { preventDefault: () => { } });
    await Promise.resolve();

    expect(wrapper.find('p').text()).toBe("api error");
  })
});