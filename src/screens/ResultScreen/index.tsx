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
import { ScrollView } from 'react-native-gesture-handler';


const Result = observer(({ navigation }: any) => {
  const [isCheck, setCheck] = useState(true);
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
    <View style={{ flex:1, alignContent: 'center', alignItems: 'center', justifyContent:'center'}}>
      <LottieView
        source={require('./loading-2.json')}
        style={{ width: 200, height: 200 }}
        autoPlay loop
        resizeMode='contain'
        ref={animation}
      />
      {/* <Image source={Images.loading} style={{ width: 200, height: 200, margin: 50 }} /> */}
      <Text style={{ color: BaseStyle.color.theme, fontSize: 18, fontWeight:'bold'}}>분석중...</Text>
    </View>
  )
  
  return (
    <View style={styles.container}>
      {ProcessStore.result?.result ? 
        <View style={{ flex: 6, marginHorizontal: 20, }}>
          <ScrollView style={{ flex: 1 }}>
            <Text style={styles.title}>분석 결과 </Text>
            <View style={styles.resultContainer}>        
              <View style={{ marginBottom: 40, marginTop: 15, }}>
                <Text style={styles.text}>[ 질병 분석 ]</Text>
                <PercentBar label='정상' value={ProcessStore?.result?.result?.probs[1]} color='#3b76db' />
                <PercentBar label='폐렴' value={ProcessStore?.result?.result?.probs[0]} color='#FC2666' />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>
                  <Text style={{ fontSize: 16 }}>질병 분석 결과 </Text>
                  {ProcessStore?.result?.result?.probs[1] > ProcessStore?.result?.result?.probs[0] ? 
                    <Text style={{ fontSize: 22, color: '#3b76db', fontWeight: 'bold' }}>정상 </Text> 
                    : <Text style={{ fontSize: 22, color: '#fc2666', fontWeight: 'bold' }}>폐렴 </Text>}
                  <Text style={{ fontSize: 16 }}>으로 추정됩니다.</Text>
                </View>
              </View>

              <View style={{ marginBottom: 40 }}>
                <Text style={styles.text}>[ 음원 분석 ]</Text>
                <PercentBar label='타인 기침' value={ProcessStore?.result?.result?.probs[2]} color='#a088e3' />
                <PercentBar label='잡음' value={ProcessStore?.result?.result?.probs[3]} color='#a088e3' />
              </View>

              <Text style={styles.text}>[ 기침 횟수 분석 ]</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 16, marginLeft: 20, color: BaseStyle.color.subtheme, fontWeight: 'bold' }}> 큰소리 횟수 : </Text>
                <Text style={{ fontSize: 16, marginRight: 20, color: BaseStyle.color.subtheme, fontWeight: 'bold' }}>{ ProcessStore.resultCough?.result?.event_counts }회 </Text> 
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 16, marginLeft: 20, color: BaseStyle.color.theme, fontWeight: 'bold' }}> 기침 횟수 : </Text>
                <Text style={{ fontSize: 16, marginRight: 20, color: BaseStyle.color.theme, fontWeight: 'bold' }}>{ ProcessStore.resultCough?.result?.cough_counts }회 </Text> 
              </View>

              <View style={{ flex: 1, paddingHorizontal: 22, marginVertical: 20 }}>
                <Button onPress={() => setCheck(prev => !prev)}
                  title={isCheck ? "닫기" : "분석 결과 그래프 보기"} 
                  style={{ flex: 1 }} 
                />
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {isCheck ? <Image
                style={{ width: 400, height: 200 }}
                source={{ uri: "data:image/png;base64," + ProcessStore.resultCough?.result?.image }}
              /> : null}
            </View>
          </ScrollView>
        </View>
      : null}
      <View style={{ flex: 0.5, flexDirection: 'row', paddingHorizontal: 25, marginVertical: 30 }}>
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
    <View style={{ flex: 1, flexDirection: 'row', height: 35, alignItems: 'center', paddingHorizontal: 16, marginVertical: 4 }}>
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
  },
  resultContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: 'bold',
    color: BaseStyle.color.theme,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#383f4a',
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
