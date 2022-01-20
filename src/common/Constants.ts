import ExpoConstants from 'expo-constants';
import * as Device from 'expo-device';

export default {
  device: {
    brand: Device.brand,
    model: Device.modelName,
  },
};
