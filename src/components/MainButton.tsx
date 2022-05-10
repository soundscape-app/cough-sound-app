import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const MainButton = ({ onPress, title }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.button}
  >
    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>{title}</Text>
  </TouchableOpacity>
);

export default MainButton;

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