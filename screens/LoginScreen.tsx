import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { Button, Text, Appbar, TextInput } from 'react-native-paper';
import { View } from '../components/Themed';
import InstanceDatabaseService from '../services/InstanceDatabaseService';
import AsyncStorageService from '../services/AsyncStorageService';

export default function LoginScreen({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [clubname, setClubname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const asyncStorageService = new AsyncStorageService();
        const fetchData = async () => {
            const myClubname = await asyncStorageService.getInstanceName();
            console.log({ myClubname: myClubname });
            setClubname(myClubname);
            setLoading(false);
        };
        fetchData();
    }, []);

    // TODO: What happens after Login
    const onSubmit = async () => {
        Keyboard.dismiss();
        const instanceDatabaseService = new InstanceDatabaseService();
        try {
            await instanceDatabaseService.loginUser(username, password, true);
        } catch (e) {
            console.info('oopsie, login failed');
            console.error(e);
        }
    };

    const goBack = () => {
        console.log('gone back');
    };

    const MyHeader = () => {
        return (
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content
                    title="Login"
                    subtitle="Bitte logge dich mit deinen Zugangsdaten ein"
                />
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
            <KeyboardAvoidingView
                style={{
                    justifyContent: 'center',
                    padding: 10,
                    paddingTop: 30,
                }}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    autoCapitalize="none"
                    onChangeText={(i) => setUsername(i)}
                />
                <TextInput
                    style={{ marginTop: 15 }}
                    placeholder="Password"
                    value={password}
                    onChangeText={(i) => setPassword(i)}
                    secureTextEntry
                />
                <Button
                    style={{ marginTop: 15 }}
                    mode={'contained'}
                    onPress={onSubmit}>
                    Submit
                </Button>
            </KeyboardAvoidingView>
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
