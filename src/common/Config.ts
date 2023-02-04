import ExpoConstants from 'expo-constants';

const SERVER_URL = 'http://hyuaal.kro.kr:8000';
// const SERVER_URL = 'http://localhost:8000';
// const SERVER_URL = 'http://13.125.120.72:8000';
// const SERVER_URL = 'http://hyusoundlab.kro.kr:5000';

export default {
  SERVER_URL,
  DEV_SERVER_URL: __DEV__ ? 'http://localhost:8000' : SERVER_URL,
  APP_VERSION: ExpoConstants.manifest?.version,
};
