// SwapiSearchComponent.js
import React, { FC, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  setSearchQuery: (query: string) => void;
}

export const SearchBar: FC<Props> = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Star Wars Characters"
        placeholderTextColor={colors.yellow}
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: colors.green,
    color: colors.yellow,
  },
});
