/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Search } from './screens/Search';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Search />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
