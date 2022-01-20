import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
import { RootTabScreenProps } from '~/types';
import { Images } from '~/common';


export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/Home.tsx" /> */}
      <Image source={Images.home_cough} style={{ width: 200, height: 200, margin: 50 }} />
      <TouchableOpacity 
        onPress={() => navigation.navigate('Survey')}
        style={styles.button}
      >
        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>START</Text>
      </TouchableOpacity>
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