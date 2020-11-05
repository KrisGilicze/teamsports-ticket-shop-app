import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { View } from '../components/Themed';

export default function LoadingScreen() {
    return (
        <View>
            <View>
                <ActivityIndicator color="#ccc" />
                <Text>Loading...</Text>
            </View>
        </View>
    );
}
