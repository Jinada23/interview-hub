import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { jobsMock } from '../../models/job';
import { useRouter } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import InlineDropdown from '@/components/ui/InlineDropdown';

export default function HomeScreen() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
    const [departmentFilter, setDepartmentFilter] = useState<'All' | string>('All');
    const { height } = useWindowDimensions();

    const departments = ['All', ...new Set(jobsMock.map(j => j.department))];

    const filteredJobs = jobsMock.filter(job =>
        job.name.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter === 'All' || job.status === statusFilter) &&
        (departmentFilter === 'All' || job.department === departmentFilter)
    );

    return (
        <View style={styles.container}>
            {/* Search bar */}
            <View style={styles.searchBar}>
                <MaterialIcons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
            </View>

            {/* Filters */}
            <View style={styles.filterRow}>
                <InlineDropdown
                    label="Show Jobs"
                    value={statusFilter}
                    options={['All', 'Active', 'Inactive']}
                    onChange={(val) => setStatusFilter(val as any)}
                />
                <InlineDropdown
                    label="Department"
                    value={departmentFilter}
                    options={departments}
                    onChange={(val) => setDepartmentFilter(val)}
                />
            </View>

            {/* Table */}
            <View style={[styles.tableContainer, { maxHeight: height - 250 }]}>
                <FlatList
                    data={filteredJobs}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    contentContainerStyle={{ paddingBottom: 12 }}
                    stickyHeaderIndices={[0]}
                    ListHeaderComponent={() => (
                        <View style={styles.tableHeader}>
                            <Text style={[styles.headerText, styles.colName, styles.headerJobs]}>
                                Jobs ({filteredJobs.length})
                            </Text>
                            <Text style={[styles.headerText, styles.colRecruiter]}>Recruiter</Text>
                            <Text style={[styles.headerText, styles.colManager]}>Hiring Manager</Text>
                            <Text style={[styles.headerText, styles.colStatus]}>Status</Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() =>
                                router.push({ pathname: '/(job)/applicants', params: { index: index.toString() } })
                            }
                        >
                            <View style={styles.tableRow}>
                                <Text numberOfLines={0} style={[styles.jobTextBold, styles.colName]}>
                                    {item.name}
                                </Text>
                                <Text numberOfLines={0} style={[styles.jobTextBold, styles.colRecruiter]}>
                                    {item.recruiter}
                                </Text>
                                <Text numberOfLines={0} style={[styles.jobTextBold, styles.colManager]}>
                                    {item.hiring_manager}
                                </Text>
                                <View style={styles.colStatus}>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            item.status === 'Active' ? styles.active : styles.inactive,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.badgeText,
                                                item.status === 'Active' ? styles.activeText : styles.inactiveText,
                                            ]}
                                        >
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 24,
        backgroundColor: '#fff',
    },
    searchBar: {
        marginTop: 24,
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
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        zIndex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',
    },
    headerText: {
        fontWeight: '500',
        fontSize: 13,
        color: '#bbb',
    },
    jobText: {
        fontSize: 14,
        color: '#333',
        flexWrap: 'wrap',
    },
    jobTextBold: {
        fontSize: 13,
        color: '#000',
        fontWeight: '500',
        flexWrap: 'wrap',
    },
    colName: { flex: 1.8 },
    colRecruiter: { flex: 1.3 },
    colManager: { flex: 1.5, marginRight: 8, },
    colStatus: {
        flex: 1,
        alignItems: 'center',
    },
    statusBadge: {
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 999,
        borderWidth: 1.2,
    },
    active: {
        backgroundColor: '#e6fff3',
        borderColor: '#2ecc71',
    },
    inactive: {
        backgroundColor: '#ffecec',
        borderColor: '#e74c3c',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
    activeText: { color: '#2ecc71' },
    inactiveText: { color: '#e74c3c' },
    headerJobs: {
        color: '#000',
        fontWeight: '500',
    }
});
