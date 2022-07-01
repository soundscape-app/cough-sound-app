import { StyleSheet, Alert, Platform, TouchableOpacity, TextInput } from 'react-native';
import * as React from 'react';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Foundation, MaterialIcons } from '@expo/vector-icons';
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
  const [status, setStatus] = React.useState(null as any);
  const [isRecording, setIsRecording] = React.useState(false);
  
  const [location, setLocation] = React.useState('' as string);
  const [duration, setDuration] = React.useState(0);
  const [data, setData] = React.useState([] as any);

  React.useEffect(() => {
    ProcessStore.resetResult();
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

  const durationFormat = (duration: any) => (
    new Date(duration ?? 0).toISOString().substr(11, 8)
  )

  function reset() {
    setData([]);
    setDuration(0);
    setLocation('');
  }

  async function upload() {
    if (location !== '') {
      navigation.replace('Result');
      ProcessStore.uploadAudio(location).then(() => {
        reset();
      }).catch((e: any) => {
        console.log(e);
      })
    }
  }

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
    setDuration(status?.durationMillis);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setLocation(uri);
    console.log('Recording stopped and stored at', uri);
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri });
    console.log(sound);
    setSound(sound);
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
      <TouchableOpacity 
        onPress={isRecording ? stopRecording : startRecording} 
        activeOpacity={0.8}
        style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}
      >
        <Foundation 
          name="record" 
          size={isRecording ? Math.min(120, Math.max(100 + Math.round(status?.metering ?? 0), 30)) : 80} 
          color={isRecording ? "red" : "pink"} 
        />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center' , alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 28 }}>{Math.round(status?.metering ?? 0)}dB</Text>
        <Text style={{ fontSize: 14 }}>{durationFormat(status?.durationMillis)}</Text>
      </View>

      {/* <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginVertical: 10 }}>
          <Text style={styles.textNormal}>기저 질환</Text>
          <Picker
            selectedValue={selection1}
            onValueChange={(itemValue, itemIndex) =>
              setSelection1(itemValue)
            }
            mode="dropdown"
            style={{ width: 120, height: 40, marginHorizontal: 10, backgroundColor: 'transparent' }}
            itemStyle={{ fontSize: 14, height: 40, fontWeight: 'bold'}}
          >
            <Picker.Item label="없음" value="없음" />
            <Picker.Item label="천식" value="천식" />
            <Picker.Item label="당뇨" value="당뇨" />
            <Picker.Item label="심장병" value="심장병" />
            <Picker.Item label="직접 입력" value="직접 입력" />
          </Picker>
          {selection1 == '직접 입력' && <TextInput
              style={{ borderRadius: 10, width: 120, height: 30, paddingHorizontal: 10, backgroundColor: 'rgba(0,0,0,0.05)'}}
              onChangeText={setText}
              value={text}
              placeholder="Enter here"
            />
          }
        </View>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 10 }}>
          <Text style={styles.textNormal}>흡연 여부</Text>
          <Picker
            selectedValue={selection2}
            onValueChange={(itemValue, itemIndex) =>
              setSelection2(itemValue)
            }
            mode="dropdown"
            style={{ width: 120, height: 40, marginHorizontal: 10, backgroundColor: 'transparent' }}
            itemStyle={{ fontSize: 14, height: 40, fontWeight: 'bold' }}
          >
            <Picker.Item label="안함" value="안함" />
            <Picker.Item label="보통" value="보통" />
            <Picker.Item label="매일" value="매일" />
          </Picker>
        </View>
      </View> */}

      <View style={{ 
        flexDirection: 'row', width: '100%', justifyContent: 'space-between', 
        paddingHorizontal: 20, marginVertical: 20 
      }}>
        <TouchableOpacity 
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)', //'rgba(25, 132, 213, 0.8)',
            borderRadius: 10, width: 50, height: 50,
            justifyContent: 'center', alignItems: 'center'
          }}
          activeOpacity={0.8}
          onPress={reset}
        >
          <MaterialIcons name="refresh" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            backgroundColor: location !== '' ? 'rgba(25, 132, 213, 0.8)' : 'rgba(0,0,0,0.3)',
            borderRadius: 10, height: 50, marginLeft: 20, flex: 1,
            alignItems: 'center', justifyContent: 'center',
            flexDirection: 'row',
          }}
          activeOpacity={0.8}
          onPress={upload}
        >
          <MaterialIcons name="file-upload" size={24} color="white" />
          <Text style={{ color: 'white', marginHorizontal: 10 }}>UPLOAD ({durationFormat(duration)})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
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
