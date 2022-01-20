import ExpoConstants from 'expo-constants';

const SERVER_URL = 'http://soundscape.kro.kr:8000';

export default {
  SERVER_URL,
  DEV_SERVER_URL: __DEV__ ? 'http://localhost:8000' : SERVER_URL,
  APP_VERSION: ExpoConstants.manifest?.version,
};
