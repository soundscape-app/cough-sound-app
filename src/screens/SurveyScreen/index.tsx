import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import NativeForms, { NativeFormsModal } from 'native-forms';
import { ProcessStore } from '~/stores/ProcessStore';

import { BaseStyle } from '~/common';

import Agreement from './agreement';

export default function Survey({ navigation }: any) {
  const [agree, setAgree] = React.useState(false);

  React.useEffect(() => {
    ProcessStore.resetSurvey();
  },[]);

  if (!agree) return <Agreement onAgree={() => setAgree(true)} />;

  return (
    <View style={styles.container}>
      <NativeForms 
        formJSON={require('./cough-sound-app-survey-eng.json')}
        onClose={() => navigation.goBack()}
        onSend={(surveyData: any) => {
          console.log(surveyData);
          ProcessStore.setSurvey(surveyData);
          navigation.replace('Upload');
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({

  input: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1.5, 
    paddingHorizontal: 10, 
    marginVertical: 3, 
    borderRadius: 5,
  },

  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BaseStyle.color.theme,
    marginBottom: 10,
    marginTop: 20,
  },

  button: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseStyle.color.theme,
    borderRadius: 8,
  }
});