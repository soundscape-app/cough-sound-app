// import superagent from 'superagent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';

import { StorageKey } from '~/common';

const loginToken = {
  get: () => AsyncStorage.getItem(StorageKey.LOGIN_TOKEN),
  remove: () => AsyncStorage.removeItem(StorageKey.LOGIN_TOKEN),
  set: (token: string) => AsyncStorage.setItem(StorageKey.LOGIN_TOKEN, token),
};

const installIdentifier = {
  get: async () => {
    let identifier = await AsyncStorage.getItem(StorageKey.INSTALL_IDENTIFIER);
    if (!identifier) {
      const randomString = Math.random().toString(36).slice(2);
      identifier = `${randomString}-${Device.osInternalBuildId}`;
      await AsyncStorage.setItem(StorageKey.INSTALL_IDENTIFIER, identifier);
    }
    return identifier;
  },
};

export default {
  installIdentifier,
  loginToken,
};
