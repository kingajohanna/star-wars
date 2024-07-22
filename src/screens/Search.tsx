import { useState } from 'react';
import { useSwapiSearch } from '../network/useSwapiSearch';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { ResultsList } from '../components/ResultsList';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error } = useSwapiSearch(searchQuery);

  return (
    <View style={styles.container}>
      <SearchBar setSearchQuery={setSearchQuery} />
      {loading && <ActivityIndicator size="large" />}
      {!!data.length && <ResultsList data={data} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
