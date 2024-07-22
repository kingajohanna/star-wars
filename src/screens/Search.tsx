import { useState } from 'react';
import { useSwapiSearch } from '../network/useSwapiSearch';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { ResultsList } from '../components/ResultsList';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error } = useSwapiSearch(searchQuery);

  return (
    <View style={styles.container}>
      <SearchBar setSearchQuery={setSearchQuery} />
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!!data.length && <ResultsList data={data} />}
      {!data.length && <Image source={require('../assets/logo.png')} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 8,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  error: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});
