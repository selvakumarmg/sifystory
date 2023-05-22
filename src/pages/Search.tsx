import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';
import axios from 'axios';

interface NewsItem {
  title: string;
  description: string;
  source: {
    name: string;
  };
}

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_API_KEY`
      );
      setSearchResults(response.data.articles);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your search query"
        value={query}
        onChangeText={text => setQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      {/* Render search results */}
      {searchResults.map((item, index) => (
        <View key={index} style={styles.resultItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.source}>{item.source.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  resultItem: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  source: {
    fontSize: 14,
    color: '#888',
  },
});

export default SearchScreen;
