import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

export default function NoteInput({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>What's on your mind?</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Pour your heart out…"
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
        blurOnSubmit={false}
        returnKeyType="default"
        keyboardAppearance="dark"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#f5f5f5',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#333',
    textAlignVertical: 'top',
  },
});
