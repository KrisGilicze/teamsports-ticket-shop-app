import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import AuthScreen from '../screens/AuthScreen';
import TeamSelectionScreen from '../screens/TeamSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import AsyncStorage from '@react-native-community/async-storage';

export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName;
}) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    // useReducer > useState, as state is kinda mingled
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    // fetch the token from storage
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                console.error(e);
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    // restoring and handling auth state
    const authContext = React.useMemo(
        () => ({
            signIn: async (data: any) => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data: any) => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {state.userToken == null ? (
                <>
                    <Stack.Screen name="Auth" component={AuthScreen} />
                    <Stack.Screen
                        name="TeamSelection"
                        component={TeamSelectionScreen}
                    />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Root" component={BottomTabNavigator} />
                </>
            )}
            <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
}
