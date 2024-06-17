import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';

export default function App() {
  return (
    <NativeRouter>
      <Main />
      <StatusBar style="auto" />
    </NativeRouter>
  );
}