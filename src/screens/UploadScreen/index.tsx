import { StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Foundation } from '@expo/vector-icons';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape'
import { Picker } from '@react-native-picker/picker';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import useInterval from '../../hooks/useInterval';

import { TVideo, ProcessStore } from '~/stores/ProcessStore';


export default function UploadScreen({ navigation }: any) {
  // const navigation = useNavigation();
  const [recording, setRecording] = React.useState(null as any);
  const [sound, setSound] = React.useState(null as any);
  const [location, setLocation] = React.useState('' as string);
  const [status, setStatus] = React.useState(null as any);
  const [player, setPlayer] = React.useState(() => { });
  const [isRecording, setIsRecording] = React.useState(false);
  const [data, setData] = React.useState([] as any);
  const [selection1, setSelection1] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    return () => {
      if (sound?.unloadAsync) {
        sound?.unloadAsync();
      }
    }
  }, []);

  useInterval(() => {
    setData([...data, Math.round(status?.metering)]);
  }, isRecording ? 100 : null);

  const recordAudio = async () => {
    try {
      const { recording: recordingObject, status } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      console.log(status, recordingObject);
    } catch (error) {
      console.log(error);

    }
  };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording, status } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');

      const sid = setInterval(async () => {
        const status = await recording.getStatusAsync();
        setStatus(status);
        if (status.isDoneRecording && !status.isRecording) clearInterval(sid);
      });
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setLocation(uri);
    console.log('Recording stopped and stored at', uri);
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      { uri }
    );
    console.log(sound);
    setSound(sound);
    await ProcessStore.uploadAudio(uri);
  }

  return (
    <View style={styles.container}>
      <AreaChart
        style={{ height: 200, width: '100%' }}
        data={data}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{ fill: 'rgba(25, 132, 213, 0.8)' }}
      >
        <Grid />
      </AreaChart>
      {/* <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <Text style={styles.textNormal}>등가소음도</Text>
        <Text style={styles.textNormal}>최고소음도</Text>
        <Text style={styles.textNormal}>최고소음도 기준 초과</Text>
      </View> */}
      <TouchableOpacity 
        onPress={isRecording ? stopRecording : startRecording} 
        activeOpacity={0.8}
        style={{ width: 180, height: 180, justifyContent: 'center', alignItems: 'center' }}
      >
        <Foundation 
          name="record" 
          size={isRecording ? Math.min(120, Math.max(100 + Math.round(status?.metering ?? 0), 30))*1.5 : 80} 
          color={isRecording ? "red" : "pink"} 
        />
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold', fontSize: 28 }}>{Math.round(status?.metering ?? 0)}dB</Text>
      <Text style={{ fontSize: 14 }}>{new Date(status?.durationMillis ?? 0).toISOString().substr(11, 8)}</Text>
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <Text style={styles.textNormal}>기저 질환</Text>
          <Picker
            selectedValue={selection1}
            onValueChange={(itemValue, itemIndex) =>
              setSelection1(itemValue)
            }
            mode="dropdown"
            style={{ width: 100, height: 40, backgroundColor: 'transparent' }}
            itemStyle={{ fontSize: 14, height: 40, fontWeight: 'bold'}}
          >
            <Picker.Item label="천식" value="천식" />
            <Picker.Item label="당뇨" value="당뇨" />
            <Picker.Item label="심장병" value="심장병" />
            <Picker.Item label="직접 입력" value="직접 입력" />
          </Picker>

        </View>
        <Text style={styles.textNormal}>흡연 여부</Text>
      </View>
    </View>
  );
}

// const 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: '#4F5EFF',
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderColor: 'white',
    borderWidth: 2,
    // Shadow
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  textNormal: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 20,
    marginVertical: 2.5
  }
});
