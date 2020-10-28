import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Appbar, List } from 'react-native-paper';
import { View } from '../components/Themed';
import BackendDatabaseService from '../services/BackendDatabaseService';
import AsyncStorageService from '../services/AsyncStorageService';

export default function TeamSelectionScreen() {
    const [loading, setLoading] = useState(true);
    const [instances, setInstances] = useState([]);

    useEffect(() => {
        const backendDatabaseService = new BackendDatabaseService();
        const fetchData = async () => {
            const myInstances = await backendDatabaseService.getInstances();
            setInstances(myInstances);
            setLoading(false);
        };
        fetchData();
    }, []);

    const goBack = () => console.log('Went back');

    const handleSearch = () => console.log('Searching');

    const onTeamPressed = async (domain: string, name: string) => {
        console.log({ domain: domain, name: name });
        const asyncStorageService = new AsyncStorageService();
        try {
            await asyncStorageService.setDomain(domain);
            await asyncStorageService.setInstanceName(name);
        } catch (e) {
            console.log(e);
        }
    };

    const RenderInstances = () => {
        if (instances.length === 0) {
            return <Text>Leider wurden keine Vereine gefunden...</Text>;
        }
        const instArray = [];
        for (let i = 0; i < instances.length; i++) {
            if (instances[i] && instances[i].club) {
                const name = instances[i].club;
                const description = instances[i].domain;
                console.log({ name: name, description: description });
                instArray.push(
                    <List.Item
                        title={name}
                        description={description}
                        key={'list_key_' + i}
                        onPress={() => {
                            onTeamPressed(
                                instances[i].domain,
                                instances[i].club
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
                <Appbar.Action icon="magnify" onPress={handleSearch} />
            </Appbar.Header>
        );
    };

    if (loading) {
        return (
            <View>
                <MyHeader />
                <View>
                    <ActivityIndicator color="#ccc" />
                    <Text>Loading...</Text>
                </View>
            </View>
        );
    }

    return (
        <View>
            <MyHeader />
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
