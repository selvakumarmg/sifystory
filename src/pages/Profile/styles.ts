import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
  backButton: {height: 24, width: 24, tintColor: '#FFF', marginLeft: 20},
  headerTitle: {
    color: '#FFF',
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  editText: {
    color: '#FFF',
    marginLeft: 20,
    fontSize: 14,
    position: 'absolute',
    right: 10,
  },
  editButton: {
    fontSize: 16,
    color: 'blue',
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 16,
    backgroundColor: '#BDBDBD',
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    width: 200,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'lightgray',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagName: {
    fontSize: 14,
  },
});

export default styles;
