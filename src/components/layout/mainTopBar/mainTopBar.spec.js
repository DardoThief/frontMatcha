import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainTopBar from './mainTopBar';


configure({ adapter: new Adapter() });

describe('<MainTopBar />', () => {
  it('компонент MainTopBar рендерится', () => {
    const wrapper = mount(
      <MainTopBar />,
    );
    expect(wrapper.find('.maintopbar__container').length).toBe(1);
  });
});

describe('<MainTopBar />', () => {
  it('компонент MainTopBar с пропсами', () => {
    const wrapper = mount(
      <MainTopBar notificationsList={[]} />,
    );
    expect(wrapper.find('.maintopbar__container').length).toBe(1);
  });
});
