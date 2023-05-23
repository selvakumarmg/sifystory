import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  newsItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  newsDescription: {
    fontSize: 14,
    color: '#888',
  },
  newsOptions: {
    height: 18,
    width: 18,
    tintColor: colors.primary,
    marginLeft: 10,
  },
  swipeContainer: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 16,
    height: 330,
    marginVertical: 10,
  },
});

export default styles;
