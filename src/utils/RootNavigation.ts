import * as React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';


const navigationRef = React.createRef<any>();

// 이 문서 참고: https://reactnavigation.org/docs/upgrading-from-4.x#reset

function navigate(name: string, params: any = {}) {
  const navigation = useNavigation();
  navigation.navigate(name, params);
}

function reset(params: any) {
  const navigation = useNavigation();
  navigation.reset(params);
}

function push(name: string, params: any = {}) {
  const navigation = useNavigation();
  navigation.push(name, params);
}

function goBack(params: any = {}) {
  const navigation = useNavigation();
  navigation.goBack();
}

function dispatch(params: any) {
  const navigation = useNavigation();
  navigation.dispatch(params);
}

export default {
  navigate,
  goBack,
  reset,
  dispatch,
  push,
};
