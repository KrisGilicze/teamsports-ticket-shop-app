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
                    TeamSelection: {
                        screens: {
                            TeamSelectionScreen: 'TS',
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
