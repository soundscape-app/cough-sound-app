import { StyleSheet, Dimensions } from 'react-native';
import ExpoConstants from 'expo-constants';

import OpenColor from './OpenColor';

export default {
  layout: {
    window: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    screen: {
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
    }
  },
  color: {
    ...OpenColor,
    primary: '#000000',
    lightPurple: '#6D48F0',
    purple: 'rgb(85, 51, 207)',
    facebook: 'rgb(25, 119, 243)',
    naver: 'rgb(0, 199, 60)',
    kakao: 'rgb(249, 224, 0)',
    kakaoFont: 'rgb(49, 49, 49)',
    transparent: 'transparent',
  },
  navigationHeaderStyle: {
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  navigationHeaderShadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 1.41,
    elevation: 2,
  },
  font: {
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 20,
    xxl: 22,
    xxxl: 24,
  },
  radius: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 12,
    l: 20,
    xl: 25,
  },
  space: {
    inset_xxxs: 1,
    inset_xxs: 2,
    inset_xs: 4,
    inset_s: 8,
    inset_m: 16,
    inset_l: 32,
    inset_xl: 64,
    stack_xs: 4,
    stack_s: 8,
    stack_m: 16,
    stack_l: 32,
    stack_xl: 64,
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 32,
    xl: 64,
  },
};
