import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AuthScreen from '../screens/AuthScreen';
import ScannerScreen from '../screens/ScannerScreen';
import TeamSelectionScreen from '../screens/TeamSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import {
    BottomTabParamList,
    AuthParamList,
    ScannerParamList,
    TeamSelectionParamList,
    LoginParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Auth"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
            <BottomTab.Screen
                name="Auth"
                component={AuthNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="TeamSelection"
                component={TeamSelectionNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Login"
                component={LoginNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Scanner"
                component={ScannerNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AuthStack = createStackNavigator<AuthParamList>();

function AuthNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={{ headerTitle: 'Authentication' }}
            />
        </AuthStack.Navigator>
    );
}

const TeamSelectionStack = createStackNavigator<TeamSelectionParamList>();

function TeamSelectionNavigator() {
    return (
        <TeamSelectionStack.Navigator>
            <TeamSelectionStack.Screen
                name="TeamSelectionScreen"
                component={TeamSelectionScreen}
                options={{ headerTitle: 'TeamSelectionScreen' }}
            />
        </TeamSelectionStack.Navigator>
    );
}

const LoginStack = createStackNavigator<LoginParamList>();

function LoginNavigator() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerTitle: 'LoginScreen' }}
            />
        </LoginStack.Navigator>
    );
}
const ScannerStack = createStackNavigator<ScannerParamList>();

function ScannerNavigator() {
    return (
        <ScannerStack.Navigator>
            <ScannerStack.Screen
                name="ScannerScreen"
                component={ScannerScreen}
                options={{ headerTitle: 'QR Code Scanner' }}
            />
        </ScannerStack.Navigator>
    );
}
