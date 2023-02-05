import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import NativeForms, { NativeFormsModal } from 'native-forms';
import { ProcessStore } from '~/stores/ProcessStore';

import { BaseStyle } from '~/common';

import { useForm, Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';

import Agreement from './agreement';

type FormData = {
  name: string;
  age: string;
  gender: string;
  smoker: string;
  drinker: string;
  disease: string;
  symptom: string;
};

type FormProps = {
  onSubmit: (data: FormData) => void;
};

export default function Survey({ navigation }: any) {

  const [ form, setForm ] = React.useState({
    name: '',
    age: '',
    gender: '',
    smoker: '',
    drinker: '',
    disease: '',
    symptom: '',
  })

  const AddForm = ({ onSubmit }: FormProps) => {
    return (
      <ScrollView style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 22 }}>
        <Text style={styles.text}> 기본 정보 </Text>
        <TextInput
          style={styles.input}
          placeholder="이름"
          onChangeText={(text) => setForm({ ...form, name: text })}
          value={form.name}
        />
        <TextInput
          style={styles.input}
          placeholder="나이"
          onChangeText={(text) => setForm({ ...form, age: text })}
          value={form.age}
        />
        <RNPickerSelect
          placeholder={{ label: '성별을 선택해주세요', value: 'not-selected', color: '#9EA0A4' }}
          onValueChange={(value) => setForm({ ...form, gender: value })}
          items={[
            { label: '남성', value: 'male' },
            { label: '여성', value: 'female' },
            { label: '기타', value: 'etc' },
          ]}
        />

        <Text style={styles.text}> 흡연 여부 </Text>
        <RNPickerSelect
          placeholder={{ label: '흡연 여부를 선택해주세요', value: 'not-selected', color: '#9EA0A4' }}
          onValueChange={(value) => setForm({ ...form, smoker: value })}
          items={[
            { label: '매일', value: 'smoker' },
            { label: '가끔', value: 'occasional' },
            { label: '비흡연', value: 'non-smoker' },
          ]}
        />

        <Text style={styles.text}> 음주 여부 </Text>
        <RNPickerSelect
          placeholder={{ label: '음주 여부를 선택해주세요', value: 'not-selected', color: '#9EA0A4' }}
          onValueChange={(value) => setForm({ ...form, drinker: value })}
          items={[
            { label: '매일', value: 'drinker' },
            { label: '가끔', value: 'occasional' },
            { label: '안함', value: 'non-drinker' },
          ]}
        />

        <Text style={styles.text}> 기저 질환 </Text>
        <RNPickerSelect
          placeholder={{ label: '기저 질환을 선택해주세요', value: 'not-selected', color: '#9EA0A4' }}
          onValueChange={(value) => setForm({ ...form, disease: value })}
          items={[
            { label: '당뇨', value: 'diabetes' },
            { label: '천식', value: 'asthma' },
            { label: '심장병', value: 'heart' },
            { label: '기타 질환', value: 'etc' },
            { label: '없음', value: 'none' },
          ]}
        />

        <Text style={styles.text}> 현재 증상 </Text>
        <RNPickerSelect
          placeholder={{ label: '현재 증상을 선택해주세요', value: 'not-selected', color: '#9EA0A4' }}
          onValueChange={(value) => setForm({ ...form, symptom: value })}
          items={[
            { label: '가벼운 감기', value: 'cold' },
            { label: '열', value: 'fever' },
            { label: '코로나 감염', value: 'covid' },
            { label: '기타', value: 'etc' },
            { label: '없음', value: 'none' },
          ]}
        />

        <Button 
          onPress = {() => onSubmit(form)} 
          title="제출하기"
        />
      </ScrollView>
    );
  };

  const handleSubmit = (data: FormData) => {
    console.log(data);
  };

  const [agree, setAgree] = React.useState(false);

  React.useEffect(() => {
    ProcessStore.resetSurvey();
  },[]);

  if (!agree) return <Agreement onAgree={() => setAgree(true)} />;

  return (
    <View style={styles.container}>
      <AddForm onSubmit={handleSubmit} />
      {/* <NativeForms 
        form="https://my.nativeforms.com/zIXe20jZmQ0ZJpWSJ1Db"
        // formJSON={require('./survey.json')}
        onClose={() => navigation.goBack()}
        onSend={(surveyData: any) => {
          console.log(surveyData);
          ProcessStore.setSurvey(surveyData);
          navigation.replace('Upload');
        }}
      /> */}
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
    paddingHorizontal: 40,
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