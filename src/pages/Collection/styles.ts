import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsItemContainer: {
    marginBottom: 16,
  },
  newsItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  newsItemDescription: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: 50,
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
