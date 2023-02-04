import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
import { RootTabScreenProps } from '~/types';
// import LottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import { VictoryBar, VictoryLabel } from "victory-native";
import { Images, BaseStyle } from '~/common';

import { observer } from 'mobx-react';
import { TVideo, ProcessStore } from '~/stores/ProcessStore';


const Result = observer(({ navigation }: any) => {

  const animation = React.useRef(null);

  React.useEffect(() => {
    ProcessStore.setLoading();
    return () => {
      ProcessStore.setLoading();
    }
  }, []);

  // * Loading animation 
  if (ProcessStore.loading) return (
    <View style={styles.container}>
      {/* <LottieView
        source={require('./loading-2.json')}
        style={{ width: 200, height: 200 }}
        autoPlay loop
        resizeMode='contain'
        ref={animation}
      /> */}
      <ActivityIndicator size="large" color={BaseStyle.color.theme} />
      {/* <Image source={Images.loading} style={{ width: 200, height: 200, margin: 50 }} /> */}
      <Text style={styles.text}>분석중...</Text>
    </View>
  )
  
  return (
    <View style={styles.container}>
      {ProcessStore.result?.result?.highest ? 
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>{ProcessStore.result?.result?.highest.name}</Text>
          <Text style={styles.text}>일 가능성이</Text>
          <Text style={styles.title}>{Math.round(ProcessStore.result?.result?.highest.rate*100)}%</Text>
          <Text style={styles.text}>로 가장 높습니다</Text>
        </View>
      : null}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {ProcessStore.result?.result?.rates ? ProcessStore.result.result.rates.map((item: any, index: number) => (
          <PercentBar key={index} label={item.name} value={item.rate} color={item.color ?? 'black'} />
        )) : null}
      </View>
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
    fontSize: 60,
    fontWeight: 'bold',
    color: BaseStyle.color.theme,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BaseStyle.color.theme,
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
