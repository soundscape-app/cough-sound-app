import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import NativeForms, { NativeFormsModal } from 'native-forms';
import { ProcessStore } from '~/stores/ProcessStore';

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
        form="https://form.nativeforms.com/YRWeX1jZmEjSaZDVT1Db"
        // formJSON={require('./survey.json')}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});