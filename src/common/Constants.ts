import { Platform } from 'react-native';
import ExpoConstants from 'expo-constants';
import * as Device from 'expo-device';

export default {
  device: {
    brand: Device.brand,
    model: Device.modelName,
    os: Platform.OS,
  },
};
