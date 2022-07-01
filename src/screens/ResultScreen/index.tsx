import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
import { RootTabScreenProps } from '~/types';
import LottieView from 'lottie-react-native';
import { VictoryBar, VictoryLabel } from "victory-native";

import { observer } from 'mobx-react';
import { TVideo, ProcessStore } from '~/stores/ProcessStore';


const Result = observer(({ navigation }: any) => {

  return (
    <View style={styles.container}>
      {ProcessStore.result?.result === undefined ? (
        <View style={styles.container}>
          <LottieView
            source={require('./loading-2.json')}
            style={{ width: 200, height: 200 }}
            autoPlay loop
            resizeMode='contain'
          />
          <Text style={styles.text}>Analyzing...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {ProcessStore.result?.result.rates.map((item: any, index: number) => (
              <PercentBar key={index} label={item.name} value={item.rate} color={item.color ?? 'black'} />
            ))}
          </View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginVertical: 20 }}>
            <Button onPress={() => navigation.replace('Survey')} title={"설문부터\n다시하기"} style={{ flex: 1 }} />
            <View style={{ width: 8 }}/>
            <Button onPress={() =>  navigation.replace('Upload')} title={"녹음부터\n다시하기"} style={{ flex: 1 }} />
          </View>
        </View>
      )}
    </View>
  );
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
          <Text style={{ color: 'white', paddingHorizontal: 4, fontSize: 12 }} numberOfLines={1}>{Math.round(value*100)}%</Text>
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(25, 132, 213, 0.8)'
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
    backgroundColor: 'rgba(25, 132, 213, 0.8)',
    borderRadius: 8,
  }
});
