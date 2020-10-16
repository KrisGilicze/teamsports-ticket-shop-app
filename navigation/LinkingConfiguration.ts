import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Autch: {
            screens: {
              AutchScreen: 'one',
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
