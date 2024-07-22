import { FC, useEffect, useState } from 'react';
import { Character } from '../types/SwapiCharacter';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ButtonGroup from './ButtonGroup';
import { colors } from '../theme/colors';

interface ResultsListProps {
  data: Character[];
}

interface Header {
  key: keyof Character;
  label: string;
}

type SortOrder = { key: keyof Character; order: 'asc' | 'desc' };

const headers: Header[] = [
  { key: 'name', label: 'Name' },
  { key: 'eye_color', label: 'Eye Color' },
  { key: 'created', label: 'Created Date' },
];

const pageSizeOptions = [25, 50, 100, 150];

export const ResultsList: FC<ResultsListProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<Character[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / pageSize);

  useEffect(() => {
    defaultSortData();
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  useEffect(() => {
    sortData();
  }, [sortOrder]);

  const defaultSortData = () => {
    const blueEyedCharacters = data.filter((character) => character.eye_color === 'blue');
    const otherCharacters = data.filter((character) => character.eye_color !== 'blue');

    blueEyedCharacters.sort((a, b) => a.name.localeCompare(b.name));

    otherCharacters.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    const combinedData = [...blueEyedCharacters, ...otherCharacters];
    setSortedData(combinedData);
  };

  const sortData = () => {
    let sortedArray = [...data];
    if (!sortOrder) return;

    sortedArray.sort((a, b) => {
      if (a[sortOrder.key] < b[sortOrder.key]) {
        return sortOrder.order === 'asc' ? -1 : 1;
      }
      if (a[sortOrder.key] > b[sortOrder.key]) {
        return sortOrder.order === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sortedArray);
  };

  const handleSort = (key: keyof Character) => {
    setSortOrder((prev) => {
      if (prev?.key === key) {
        return { key, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { key, order: 'asc' };
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderHeaderItem = (key: keyof Character, label: string) => (
    <TouchableOpacity style={styles.headerCell} onPress={() => handleSort(key)} key={key}>
      <Text style={styles.headerText}>
        {label} {sortOrder?.key === key ? (sortOrder.order === 'asc' ? '↑' : '↓') : ''}
      </Text>
    </TouchableOpacity>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
          <Text style={styles.headerText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{`Page ${currentPage} of ${totalPages}`}</Text>
        <TouchableOpacity
          onPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.headerText}>Next</Text>
        </TouchableOpacity>
      </View>
      <ButtonGroup options={pageSizeOptions} selectedOption={pageSize} setSelectedOption={setPageSize} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>{headers.map((header) => renderHeaderItem(header.key, header.label))}</View>
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.dataRow}>
            <Text style={styles.dataCell}>{item.name}</Text>
            <Text style={styles.dataCell}>{item.eye_color}</Text>
            <Text style={styles.dataCell}>{new Date(item.created).toLocaleDateString()}</Text>
          </View>
        )}
      />
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.greenOpacity,
    paddingHorizontal: 10,
  },
  dataCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: colors.yellow,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 3,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: colors.green,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.yellow,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.green,
  },
  footerContainer: {
    paddingVertical: 10,
  },
});
