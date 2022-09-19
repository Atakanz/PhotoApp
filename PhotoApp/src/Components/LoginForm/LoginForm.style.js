import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  enabledDirection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput: {
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'center',
  },
  logoView: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 128,
    height: 100,
  },
  logoDark: {
    width: 128,
    height: 128,
    borderRadius: 80,
  },
  buttonColumn: {
    flexDirection: 'column',
    marginTop: 30,
  },
  isAccountText: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  isAccountTextDark: {
    color: '#fff'
  }
});