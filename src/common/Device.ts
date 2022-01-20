import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const iphoneXPaddingBottom = 28;

const isIphoneX = Platform.OS === 'ios'
  && !Platform.isPad
  && !Platform.isTVOS
  && (height >= 812 || width >= 812);

const isIphone = Platform.OS === 'ios';

export default {
  isIphoneX,
  isIphone,
  iphoneXPaddingBottom,
  ToolbarHeight: isIphoneX ? 35 : 0,
};
