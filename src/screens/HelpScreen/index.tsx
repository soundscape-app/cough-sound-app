import React from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
import { Config } from '~/common';
import * as Updates from 'expo-updates';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>APP VERSION: {Config.APP_VERSION}</Text>
      <TouchableOpacity
        onPress={async () => {
          try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
              Alert.alert(
                'Update Available',
                'An update is available. Would you like to update now?',
                [
                  {
                    text: 'Yes',
                    onPress: async () => {
                      const bundle = await Updates.fetchUpdateAsync();
                      if (bundle?.isNew) {
                        await Updates.reloadAsync();
                      }
                    },
                  },
                  {
                    text: 'No',
                    onPress: () => {},
                    style: 'cancel',
                  },
                ],
                { cancelable: false },
              );
            } else {
              Alert.alert('No Update Available');
            }
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <Text style={{ margin: 10, color: 'gray' }}>Check Update</Text>
      </TouchableOpacity>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/HelpScreen.tsx" /> */}
    </View>
  );
}

const updateAsync = async ({ reload = false }) => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      const bundle = await Updates.fetchUpdateAsync();
      if (reload && bundle?.isNew) {
        await Updates.reloadAsync();
      }
    }
  } catch (e) {
    // Sentry.Native.captureException(e);
  }
};

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
});
