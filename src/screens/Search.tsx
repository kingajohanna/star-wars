import { useState } from 'react';
import { useSwapiSearch } from '../network/useSwapiSearch';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error } = useSwapiSearch(searchQuery);

  return (
    <View style={styles.container}>
      <TextInput value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList data={data} keyExtractor={(item) => item.url} renderItem={({ item }) => <Text>{item.name}</Text>} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
