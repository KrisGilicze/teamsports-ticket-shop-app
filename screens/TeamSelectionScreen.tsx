import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Appbar, List, Searchbar } from 'react-native-paper';
import { View } from '../components/Themed';
import BackendDatabaseService from '../services/BackendDatabaseService';
import AsyncStorageService from '../services/AsyncStorageService';

export default function TeamSelectionScreen() {
    const [loading, setLoading] = useState(true);
    const [instances, setInstances] = useState([]);
    const [filteredInstances, setFilteredInstances] = useState([]);
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const callback = useCallback(() => {
        const results = instances.filter((instance) => {
            return instance.club
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        });
        setFilteredInstances(results);
        console.log({ effect: searchQuery });
    }, [searchQuery]);

    useEffect(() => {
        const backendDatabaseService = new BackendDatabaseService();
        const fetchData = async () => {
            const myInstances = await backendDatabaseService.getInstances();
            setInstances(myInstances);
            setFilteredInstances(myInstances);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {}, 400);
        return () => {
            callback();
            clearTimeout(handler);
        };
    }, [callback]);

    const goBack = () => console.log('Went back');

    const onTeamPressed = async (domain: string, name: string) => {
        const asyncStorageService = new AsyncStorageService();
        try {
            await asyncStorageService.setDomain(domain);
            await asyncStorageService.setInstanceName(name);
        } catch (e) {
            console.log(e);
        }
    };

    const RenderInstances = () => {
        if (filteredInstances.length === 0) {
            return <Text>Leider wurden keine Vereine gefunden...</Text>;
        }
        const instArray = [];
        for (let i = 0; i < filteredInstances.length; i++) {
            if (filteredInstances[i] && filteredInstances[i].club) {
                const name = filteredInstances[i].club;
                const description = filteredInstances[i].domain;
                instArray.push(
                    <List.Item
                        title={name}
                        description={description}
                        key={'list_key_' + i}
                        onPress={() => {
                            onTeamPressed(
                                filteredInstances[i].domain,
                                filteredInstan[i].club
                            );
                        }}
                        left={(props) => (
                            <List.Icon {...props} icon="application-import" />
                        )}
                    />
                );
            }
        }
        return (
            <List.Section>
                <List.Subheader>Some title</List.Subheader>
                {instArray}
            </List.Section>
        );
    };

    const MyHeader = () => {
        return (
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content
                    title="Vereinsauswahl"
                    subtitle="Bitte wähle deinen Verein aus"
                />
                {/* <Appbar.Action icon="magnify" onPress={handleSearch} /> */}
            </Appbar.Header>
        );
    };

    if (loading) {
        return (
            <View>
                <MyHeader />
                <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color="#ccc" />
                    {/* <Text>Loading...</Text> */}
                </View>
            </View>
        );
    }

    const handleChangeSearch = (term: string) => {
        setSearchQuery(term);
    };

    return (
        <View>
            <MyHeader />
            {/* <RenderSearchbar /> */}
            <Searchbar
                placeholder={'Vereinsname'}
                onChangeText={handleChangeSearch}
                value={searchQuery}
            />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 30,
                }}>
                <RenderInstances />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
