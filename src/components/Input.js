import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';
const Input = ({ inputValue, onChangeText, onDoneAddItem }) => (
	<TextInput
		style={styles.input}
		value={inputValue}
		onChangeText={onChangeText}
		placeholder="Add New Todo Task"
		placeholderTextColor={Colors.tabIconDefault}
		multiline={true}
		autoCapitalize="sentences"
		underlineColorAndroid="transparent"
		selectionColor={'white'}
		maxLength={30}
		returnKeyType="done"
		autoCorrect={false}
		blurOnSubmit={true}
		onSubmitEditing={onDoneAddItem}
	/>
);
const styles = StyleSheet.create({
	input: {
		paddingRight: 15,
		fontSize: 20,
		color: 'black',
		fontWeight: '100',
		borderWidth: 1,
		borderRadius: 6,
		borderColor: '#72b1ff'
	}
});
export default Input;