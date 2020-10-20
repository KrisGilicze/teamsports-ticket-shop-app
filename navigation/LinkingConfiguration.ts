import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Auth: {
                        screens: {
                            AuthScreen: 'one',
                        },
                    },
                    Scanner: {
                        screens: {
                            ScannerScreen: 'two',
                        },
                    },
                },
            },
            NotFound: '*',
        },
    },
};
