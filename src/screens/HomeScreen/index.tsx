import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NativeForms, { NativeFormsModal } from 'native-forms';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
import MainButton from '~/components/MainButton';
import { RootTabScreenProps } from '~/types';
import { Images } from '~/common';

import { ProcessStore } from '~/stores/ProcessStore';

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image source={Images.home_cough} style={{ width: 200, height: 200, margin: 50 }} />
      <MainButton onPress={() => {
        navigation.navigate('Survey');
      }} title="START"/>
    </View>
  );
}

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
  }
});
