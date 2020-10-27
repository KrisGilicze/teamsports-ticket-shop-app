import React, { useState, useEffect } from 'react';
import {
    Image,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import {
    Button,
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    Left,
    Right,
    Body,
    Title,
    Text,
    Icon,
    List,
    ListItem,
    Toast,
} from 'native-base';
import { View } from '../components/Themed';
import InstanceDatabaseService from '../services/InstanceDatabaseService';
import AsyncStorageService from '../services/AsyncStorageService';

export default function LoginScreen() {
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

    const onSubmit = async () => {
        Keyboard.dismiss();
        console.log({ username: username, password: password });
        const instanceDatabaseService = new InstanceDatabaseService();
        try {
            await instanceDatabaseService.loginUser(username, password, true);
        } catch (e) {
            console.log('oopsie, login failed');
            console.log(e);
        }
    };

    const MyHeader = () => {
        return (
            <Header>
                <Body>
                    <Title>Login</Title>
                </Body>
            </Header>
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
            <Content padder>
                <KeyboardAvoidingView
                    style={{
                        justifyContent: 'center',
                        padding: 10,
                        paddingTop: 30,
                    }}>
                    <Form>
                        <Item>
                            <Input
                                placeholder="Username"
                                value={username}
                                autoCapitalize="none"
                                onChangeText={(i) => setUsername(i)}
                            />
                        </Item>
                        <Item last>
                            <Input
                                placeholder="Password"
                                value={password}
                                onChangeText={(i) => setPassword(i)}
                                secureTextEntry
                            />
                        </Item>
                        <Button
                            primary
                            block
                            style={{ marginTop: 15 }}
                            onPress={() => onSubmit()}>
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                </KeyboardAvoidingView>
            </Content>
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
