import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import {
    Container,
    Content,
    Header,
    Left,
    Right,
    Body,
    Title,
    Text,
    Button,
    Icon,
    List,
    ListItem,
    Toast,
} from 'native-base';
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
            // if (i === 1) console.log({ instance: instances[i] });
            if (instances[i] && instances[i].club) {
                instArray.push(
                    <ListItem
                        key={'list_key_' + i}
                        onPress={() => {
                            onTeamPressed(
                                instances[i].domain,
                                instances[i].club
                            );
                        }}>
                        <Text>{instances[i].club}</Text>
                    </ListItem>
                );
            }
        }
        return <List>{instArray}</List>;
    };

    const MyHeader = () => {
        return (
            // <Container>
            <Header>
                <Body>
                    <Title>Auswahl Verein</Title>
                </Body>
            </Header>
            // </Container>
        );
    };

    if (loading) {
        return (
            <Container>
                <MyHeader />
                <Container>
                    <ActivityIndicator color="#ccc" />
                    <Text>Loading...</Text>
                </Container>
            </Container>
        );
    }

    return (
        <Container>
            <MyHeader />
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    paddingTop: 30,
                }}>
                <Text>Select Your Team</Text>
                <RenderInstances />
            </ScrollView>
        </Container>
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
