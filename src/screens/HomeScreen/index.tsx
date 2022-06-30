import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NativeForms, { NativeFormsModal } from 'native-forms';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
import MainButton from '~/components/MainButton';
import { RootTabScreenProps } from '~/types';
import { Images } from '~/common';

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image source={Images.home_cough} style={{ width: 200, height: 200, margin: 50 }} />
      <Button onPress={() => navigation.navigate('Survey')} title="START" />
    </View>
  );
}

const Button = ({ onPress, title }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.button}
    activeOpacity={0.7}
  >
    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>{title}</Text>
  </TouchableOpacity>
)

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
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 132, 213, 0.8)',
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
    // Shadow
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  }
});
