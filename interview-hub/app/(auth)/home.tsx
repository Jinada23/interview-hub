import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Job, jobsMock } from '../../models/job';
import DropdownPicker from '@/components/DropdownPicker';

export default function HomeScreen() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
    const [departmentFilter, setDepartmentFilter] = useState<'All' | string>('All');

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
                <DropdownPicker
                    label="Show Jobs"
                    value={statusFilter}
                    options={['All', 'Active', 'Inactive']}
                    onChange={(val) => setStatusFilter(val as any)}
                />
                <DropdownPicker
                    label="Department"
                    value={departmentFilter}
                    options={departments}
                    onChange={(val) => setDepartmentFilter(val)}
                />
            </View>

            {/* Table header & list */}
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, styles.colName]}>Jobs ({filteredJobs.length})</Text>
                    <Text style={[styles.headerText, styles.colRecruiter]}>Recruiter</Text>
                    <Text style={[styles.headerText, styles.colManager]}>Hiring Manager</Text>
                    <Text style={[styles.headerText, styles.colStatus]}>Status</Text>
                </View>

                <FlatList
                    data={filteredJobs}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    contentContainerStyle={{ paddingBottom: 12 }}
                    renderItem={({ item }) => (
                        <View style={styles.tableRow}>
                            <Text style={[styles.jobText, styles.colName]}>{item.name}</Text>
                            <Text style={[styles.jobText, styles.colRecruiter]}>{item.recruiter}</Text>
                            <Text style={[styles.jobText, styles.colManager]}>{item.hiring_manager}</Text>
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
        backgroundColor: '#fff',
    },
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
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        elevation: 2,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',
    },
    headerText: {
        fontWeight: '600',
        fontSize: 13,
        color: '#999',
    },
    jobText: {
        fontSize: 14,
        color: '#333',
    },
    colName: { flex: 1.8 },
    colRecruiter: { flex: 1.3 },
    colManager: { flex: 1.5 },
    colStatus: {
        flex: 1,
        alignItems: 'flex-end',
    },
    statusBadge: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 999,
        borderWidth: 1.5,
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
        fontSize: 12,
        fontWeight: '600',
    },
    activeText: { color: '#2ecc71' },
    inactiveText: { color: '#e74c3c' },
});
