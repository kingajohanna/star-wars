import { FC, useEffect, useState } from 'react';
import { Character } from '../types/SwapiCharacter';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface ResultsListProps {
  data: Character[];
}

export const ResultsList: FC<ResultsListProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<Character[]>([]);

  useEffect(() => {
    defaultSortData();
  }, [data]);

  const defaultSortData = () => {
    const blueEyedCharacters = data.filter((character) => character.eye_color === 'blue');
    const otherCharacters = data.filter((character) => character.eye_color !== 'blue');

    blueEyedCharacters.sort((a, b) => a.name.localeCompare(b.name));

    otherCharacters.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    const combinedData = [...blueEyedCharacters, ...otherCharacters];
    setSortedData(combinedData);
  };

  return (
    <>
      <View style={styles.dataRow}>
        <Text style={styles.dataCell}>Name</Text>
        <Text style={styles.dataCell}>Eye color</Text>
        <Text style={styles.dataCell}>Created at</Text>
      </View>
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.dataRow}>
            <Text style={styles.dataCell}>{item.name}</Text>
            <Text style={styles.dataCell}>{item.eye_color}</Text>
            <Text style={styles.dataCell}>{new Date(item.created).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  dataCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
});
