import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { jobsMock } from '../../models/job';
import { useRouter } from 'expo-router';
import InlineDropdown from '@/components/ui/InlineDropdown';

export default function ApplicantsScreen() {
  const { index } = useLocalSearchParams();
  const job = jobsMock[Number(index)];
  const router = useRouter();
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <InlineDropdown
          label="Show Candidates"
          value="All"
          options={['All', 'Shortlisted', 'Interviewed']}
          onChange={(val) => console.log('Selected:', val)}
        />
        <InlineDropdown
          label="Department"
          value="All"
          options={['All', job.department]}
          onChange={(val) => console.log('Selected:', val)}
        />
      </View>

      {/* Table */}
      <View style={[styles.tableContainer, { maxHeight: height - 300 }]}>
        <FlatList
          data={job.candidates}
          keyExtractor={(item, i) => item.name + i}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{ paddingBottom: 12 }}
          ListHeaderComponent={() => (
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, styles.colName]}>Candidate</Text>
              <Text style={[styles.headerText, styles.colDate]}>Interview date</Text>
              <Text style={[styles.headerText, styles.colAction]}></Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={[styles.cellTextBold, styles.colName]}>{item.name}</Text>
              <Text style={[styles.cellTextBold, styles.colDate]}>{item.interviewDate}</Text>
              <View style={styles.colAction}>
                <TouchableOpacity onPress={() => router.push('/interview')}>
                  <View style={styles.interviewBtn}>
                    <Text style={styles.interviewText}>Interview</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

  searchBar: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    zIndex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  headerText: {
    fontWeight: '500',
    fontSize: 13,
    color: '#bbb',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
  },
  cellTextBold: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  colName: { flex: 1.8 },
  colDate: { flex: 1.5, marginRight: 8 },
  colAction: { flex: 1, alignItems: 'flex-end' },
  interviewBtn: {
    backgroundColor: '#e0fff3',
    borderColor: '#2ecc71',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  interviewText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2ecc71',
  },
});
