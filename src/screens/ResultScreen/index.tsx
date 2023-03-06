import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, ActivityIndicator, Switch } from 'react-native';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
import { RootTabScreenProps } from '~/types';
import LottieView from 'lottie-react-native';
import { VictoryBar, VictoryLabel } from "victory-native";
import { Images, BaseStyle } from '~/common';

import { observer } from 'mobx-react';
import { TVideo, ProcessStore } from '~/stores/ProcessStore';


const Result = observer(({ navigation }: any) => {
  const [isCheck, setCheck] = useState(false);
  const animation = React.useRef(null);
  const getCountFromString = (str: string, location: number) => {
    const subStr = str.split('\n');
    return subStr[location].split(': ')[1]; 
  }

  React.useEffect(() => {
    ProcessStore.setLoading();
    return () => {
      ProcessStore.setLoading();
    }
  }, []);

  // * Loading animation 
  if (ProcessStore.loading) return (
    <View style={styles.container}>
      <LottieView
        source={require('./loading-2.json')}
        style={{ width: 200, height: 200 }}
        autoPlay loop
        resizeMode='contain'
        ref={animation}
      />
      {/* <Image source={Images.loading} style={{ width: 200, height: 200, margin: 50 }} /> */}
      <Text style={styles.text}>분석중...</Text>
    </View>
  )
  
  return (
    <View style={styles.container}>
      {ProcessStore.result?.result ? 
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}> 분석 결과 </Text>
          <Text style={styles.text}> 큰소리 발생 횟수 : { getCountFromString(ProcessStore.result?.result[0], 0) } </Text>
          <Text style={styles.text}> 기침 횟수 : { getCountFromString(ProcessStore.result?.result[0], 1) } </Text>
          <View style={{ flexDirection: 'row', paddingHorizontal: 22, marginVertical: 20 }}>
            <Button onPress={() => setCheck(prev => !prev)}
              title={isCheck ? "닫기" : "분석 결과 그래프 보기"} 
              style={{ flex: 1 }} 
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {isCheck ? <Image
              style={{ width: 400, height: 200 }}
              source={{ uri: ProcessStore.result?.result[1] }}
            /> : null}
          </View>
        </View>
      : null}

      <View style={{ flexDirection: 'row', paddingHorizontal: 22, marginVertical: 20 }}>
        <Button onPress={() => navigation.replace('Survey')} title={"설문부터\n다시하기"} style={{ flex: 1 }} />
        <View style={{ width: 12 }} />
        <Button onPress={() => navigation.replace('Upload')} title={"녹음부터\n다시하기"} style={{ flex: 1 }} />
      </View>

    </View>
  )
});


const PercentBar = ({ label, value, color='black' }: { label: string, value: number, color?: string }) => {

  const [parentWeight, setParentWidth] = React.useState(0);
  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  return (
    <View style={{ flexDirection: 'row', height: 30, alignItems: 'center', paddingHorizontal: 16, marginVertical: 4 }}>
      <Text style={{ flex: 1, color: color, fontWeight: 'bold' }}>{label}</Text>
      <View style={{ flex: 4, height: 30, flexDirection: 'row', alignItems: 'center' }} onLayout={onLayout}>
        <View style={{ width: parentWeight, height: 30, backgroundColor: color, opacity: 0.2, borderRadius: 8 }} />
        <View style={{ width: parentWeight * value, height: 30, backgroundColor: color, borderRadius: 8, position: 'absolute', justifyContent: 'center', alignItems: 'flex-end'}} >
          {value > 0.1 && <Text style={{ color: 'white', paddingHorizontal: 4, fontSize: 12 }} numberOfLines={1}>{Math.round(value * 100)}%</Text>}
          {value <= 0.1 && <Text style={{ color: color, paddingHorizontal: 4, fontSize: 12, marginRight: -parentWeight*0.1 }} numberOfLines={1}>{Math.round(value * 100)}%</Text>}
        </View>
      </View>
    </View>
  )
}


const Button = ({ onPress, title, style }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ ...styles.button, ...style }}
    activeOpacity={0.7}
  >
    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18, lineHeight: 20 }}>{title}</Text>
  </TouchableOpacity>
);


export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: BaseStyle.color.theme,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BaseStyle.color.subtheme,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseStyle.color.theme,
    borderRadius: 8,
  }
});
