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
      <Text style={{ color: BaseStyle.color.theme, fontSize: 18, fontWeight:'bold'}}>Analyzing...</Text>
    </View>
  )
  
  return (
    <View style={styles.container}>
      {ProcessStore.result?.result ? 
        <View style={{ flex: 6, marginHorizontal: 20, }}>
          <ScrollView style={{ flex: 1 }}>
            <Text style={styles.title}> Analysis Result </Text>
            <View style={styles.resultContainer}>        
              <View style={{ marginBottom: 40, marginTop: 15, }}>
                <Text style={styles.text}>[ Disease Analysis ]</Text>
                <PercentBar label='Normal' value={ProcessStore?.result?.result?.probs[1]} color='#3b76db' />
                <PercentBar label='Pneumonia' value={ProcessStore?.result?.result?.probs[0]} color='#FC2666' />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>
                  <Text style={{ fontSize: 16 }}> Disease Analysis Result: </Text>
                  {ProcessStore?.result?.result?.probs[1] > ProcessStore?.result?.result?.probs[0] ? 
                    <Text style={{ fontSize: 18, color: '#3b76db', fontWeight: 'bold' }}> Normal </Text> 
                    : <Text style={{ fontSize: 18, color: '#fc2666', fontWeight: 'bold' }}> Pneumonia </Text>}
                  <Text style={{ fontSize: 16 }}>
                    {ProcessStore?.result?.result?.probs[1] > ProcessStore?.result?.result?.probs[0] ? 
                      'is likely.' 
                      : 'is suspected.'}
                  </Text>
                </View>
              </View>

              <View style={{ marginBottom: 40 }}>
                <Text style={styles.text}>[ Sound Analysis ]</Text>
                <PercentBar label='Coughing from others' value={ProcessStore?.result?.result?.probs[2]} color='#a088e3' />
                <PercentBar label='Noise' value={ProcessStore?.result?.result?.probs[3]} color='#a088e3' />
              </View>

              <Text style={styles.text}>[ Cough Analysis ]</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 16, marginLeft: 20, color: BaseStyle.color.subtheme, fontWeight: 'bold' }}> Loud Sounds: </Text>
                <Text style={{ fontSize: 16, marginRight: 20, color: BaseStyle.color.subtheme, fontWeight: 'bold' }}>{ ProcessStore.resultCough?.result?.event_counts === 1 ? '1 time' : `${ProcessStore.resultCough?.result?.event_counts} times` }</Text> 
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 16, marginLeft: 20, color: BaseStyle.color.theme, fontWeight: 'bold' }}> Cough Count: </Text>
                <Text style={{ fontSize: 16, marginRight: 20, color: BaseStyle.color.theme, fontWeight: 'bold' }}>{ ProcessStore.resultCough?.result?.cough_counts === 1 ? '1 time' : `${ProcessStore.resultCough?.result?.cough_counts} times` }</Text> 
              </View>


              <View style={{ flex: 1, paddingHorizontal: 22, marginVertical: 20 }}>
                <Button onPress={() => setCheck(prev => !prev)}
                  title={isCheck ? "Close" : "View Analysis Graph"} 
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
        <Button onPress={() => navigation.replace('Survey')} title={"Restart Survey"} style={{ flex: 1, textAlign: 'center' }} />
        <View style={{ width: 12 }} />
        <Button onPress={() => navigation.replace('Upload')} title={"Restart Recording"} style={{ flex: 1, textAlign: 'center' }} />
      </View>
    </View>
  )
});


const PercentBar = ({ label, value, color='black' }: { label: string, value: number, color?: string }) => {

  const [parentWidth, setParentWidth] = React.useState(0);
  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row', height: 35, alignItems: 'center', paddingHorizontal: 8, marginVertical: 4 }}>
      <Text style={{ flex: 1.5, color: color, fontWeight: 'bold', paddingRight: 8 }}>{label}</Text>
      <View style={{ flex: 4, height: 30, flexDirection: 'row', alignItems: 'center' }} onLayout={onLayout}>
        <View style={{ width: parentWidth * value, height: 30, backgroundColor: color, borderRadius: 8, position: 'absolute', justifyContent: 'center', alignItems: 'flex-end'}} >
          {value > 0.1 && <Text style={{ color: 'white', paddingHorizontal: 4, fontSize: 12 }} numberOfLines={1}>{Math.round(value * 100)}%</Text>}
          {value <= 0.1 && <Text style={{ color: color, paddingHorizontal: 4, fontSize: 12, marginRight: -parentWidth*0.1 }} numberOfLines={1}>{Math.round(value * 100)}%</Text>}
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
    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, lineHeight: 20 }}>{title}</Text>
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
    fontSize: 40,
    fontWeight: 'bold',
    color: BaseStyle.color.theme,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
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
