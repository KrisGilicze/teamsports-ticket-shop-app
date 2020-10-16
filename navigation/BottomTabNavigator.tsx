import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AuthScreen from '../screens/AuthScreen';
import ScannerScreen from '../screens/ScannerScreen';
import { BottomTabParamList, AutchParamList, ScannerParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Autch"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Autch"
        component={AutchNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Scanner"
        component={ScannerNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
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
const AutchStack = createStackNavigator<AutchParamList>();

function AutchNavigator() {
  return (
    <AutchStack.Navigator>
      <AutchStack.Screen
        name="AutchScreen"
        component={AuthScreen}
        options={{ headerTitle: 'Authentication' }}
      />
    </AutchStack.Navigator>
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
