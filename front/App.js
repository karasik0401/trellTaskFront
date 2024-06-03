
import { StyleSheet, Text, View, LogBox } from 'react-native';

import MainStackNavigator from './navigation/MainStackNavigator'
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <MainStackNavigator>
      
    </MainStackNavigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});