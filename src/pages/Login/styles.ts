import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loginCard: {
    backgroundColor: '#fff',
    width: 350,
  },
  logo: {
    marginTop: 130,
    alignItems: 'center',
    marginBottom: 50,
  },
  logoImage: {
    width: 120,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputField: {
    width: '100%',
    padding: 12,
    color: colors.primary,
    borderColor: '#dddfe2',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#65676b',
  },
  footerLink: {
    color: colors.primary,
    textDecorationLine: 'none',
  },
  text: {
    color: colors.primary,
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
  },
});

export default styles;
