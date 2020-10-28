import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as Linking from 'expo-linking';
import { View } from '../components/Themed';
import AsyncStorageService from '../services/AsyncStorageService';

export default function AuthScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const asyncStorageService: any = new AsyncStorageService();
        const authData: any = asyncStorageService.getAuthData();
        if (authData && authData.userId && authData.passwordHash) {
            console.log({ authData: authData });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color="#cccccc" />
                <Text style={styles.loadingText}>Loading</Text>
            </View>
        );
    }

    const chooseTeam = () => {};
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/my-ts.png')}
                style={styles.myTsLogo}
            />

            <Text style={styles.title}>Ticket App</Text>
            <Text
                style={{
                    textAlign: 'center',
                    marginBottom: 16,
                }}>
                Wähle hier dein Team oder deinen Verein aus, bei dem du dich
                anmelden willst. Du kannst dann mit allen Mitgliedern
                kommunizieren.
            </Text>
            <Button mode={'contained'} onPress={chooseTeam}>
                Verein/Team wählen
            </Button>

            <Text style={{ ...styles.notFoundYet, textAlign: 'center' }}>
                Dein Verein/Team ist noch nicht dabei?
            </Text>
            <Button mode={'outlined'} onPress={() => {}}>
                Melde dich hier an
            </Button>
            <View style={styles.disclaimer}>
                <Text style={{ ...styles.disclaimerText, textAlign: 'center' }}>
                    Mit dem Klick auf "Verein/Team wählen" bestätige ich, dass
                    ich die AGB und die Datenschutzbestimmung gelesen habe und
                    damit einverstanden bin.
                </Text>
                <View style={styles.disclaimerLinks}>
                    <Button
                        compact
                        onPress={() => {
                            Linking.openURL('https://www.teamsports2.de/agb');
                        }}>
                        AGB
                    </Button>
                    <Button
                        compact
                        onPress={() => {
                            Linking.openURL(
                                'https://www.teamsports2.de/privacy-policy'
                            );
                        }}>
                        Datenschutzbestimmung
                    </Button>
                </View>
            </View>
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
    loadingText: {
        color: '#ccc',
        marginTop: 16,
        textAlign: 'center',
        width: '70%',
    },
    myTsLogo: {
        width: '60%',
        height: '30%',
        resizeMode: 'contain',
    },
    notFoundYet: {
        marginTop: '10%',
        marginBottom: 8,
        width: '70%',
    },
    disclaimer: {
        position: 'absolute',
        bottom: 10,
    },
    disclaimerText: {
        fontSize: 10,
        color: '#999999',
    },
    disclaimerLink: {
        fontSize: 10,
        color: '#999999',
    },
    disclaimerLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
