import ErrorHandler from './ErrorHandler';
import axios from 'axios';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

import { Config } from '~/common';
import Storage from './Storage';

const Request = {
  setHeader: async () => {
    const token = await Storage.loginToken.get();
    if (token) axios.defaults.headers.common['x-authorization'] = token;
    const installIdentifier = await Storage.installIdentifier.get();
    const deviceInfo = `${Config.APP_VERSION}; ${Platform.OS}; ${Device.osVersion}; ${Device.modelName}; ${installIdentifier}`;
    if (token) axios.defaults.headers.common['x-device-info'] = deviceInfo;
  },
  get: async (url: string, params: any = {}) => {
    let data = {} as any;
    await axios.get(Config.SERVER_URL + url, { params })
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        ErrorHandler.Api(error, "[Get Request Error]", url);
      })
    return data;
  },
  post: async (url: string, body: any = {}) => {
    let data = {} as any;
    await axios.post<any>(Config.SERVER_URL + url, body)
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        ErrorHandler.Api(error, "[Post Request Error]", url);
      })
    return data;
  },
  login: async (url: string, body: any = {}) => {
    let token = "";
    let message = "";
    await axios.post<any>(Config.SERVER_URL + url, body)
      .then(response => {
        token = response.headers['token'] ?? "";
      })
      .catch(error => {
        ErrorHandler.Api(error, "[Login Request Error]", url);
        const details = error.response.data?.details;
        message = details ?? "Unknown Error";
      })
    return { token, message };
  }
};

export default Request;