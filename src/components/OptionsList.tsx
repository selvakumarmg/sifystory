import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface Option {
  id: number;
  label: string;
}

interface OptionsListProps {
  options: Option[];
  selectedOptionId: number;
  onOptionPress: (optionId: number) => void;
}

const OptionsList: React.FC<OptionsListProps> = ({
  options,
  selectedOptionId = 'the-washington-post',
  onOptionPress,
}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{height: 80}}>
      <View style={styles.container}>
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              option.id === selectedOptionId && styles.selectedOption,
            ]}
            onPress={() => onOptionPress(option.id)}>
            <Text
              style={[
                styles.optionLabel,
                option.id === selectedOptionId && styles.selectedOptionLabel,
              ]}>
              {option.name}
              {console.warn(option)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#2196f3',
  },
  optionLabel: {
    color: '#000',
  },
  selectedOptionLabel: {
    color: '#fff',
  },
});

export default OptionsList;
