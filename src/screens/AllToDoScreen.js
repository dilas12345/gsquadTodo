import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import Input from '../components/Input';
import List from '../components/List';

export default class AllToDoScreen extends React.Component {
	state = {
		inputValue: '',
		loadingItems: false,
		allItems: {},
		isCompleted: false
	};
	componentDidMount = () => {
		this.loadingItems();
	};
	newInputValue = value => {
		this.setState({
			inputValue: value
		});
	};
	loadingItems = async () => {
		try {
			const allItems = await AsyncStorage.getItem('ToDos');
			this.setState({
				loadingItems: true,
				allItems: JSON.parse(allItems) || {}
			});
		} catch (err) {
			console.log(err);
		}
	};
	onDoneAddItem = () => {
		const { inputValue } = this.state;
		if (inputValue !== '') {
			this.setState(prevState => {
				const id = this.generateUid();
				const newItemObject = {
					[id]: {
						id,
						isCompleted: false,
						text: inputValue,
						createdAt: Date.now()
					}
				};
				const newState = {
					...prevState,
					inputValue: '',
					allItems: {
						...prevState.allItems,
						...newItemObject
					}
				};
				this.saveItems(newState.allItems);
				return { ...newState };
			});
		}
	};	
	// generate simple unique identifier
	generateUid = () => {
		var uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		return uid;
	};
	deleteItem = id => {
		this.setState(prevState => {
			const allItems = prevState.allItems;
			delete allItems[id];
			const newState = {
				...prevState,
				...allItems
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};
	completeItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: true
					}
				}
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};
	incompleteItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: false
					}
				}
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};
	deleteAllItems = async () => {
		try {
			await AsyncStorage.removeItem('ToDos');
			this.setState({ allItems: {} });
		} catch (err) {
			console.log(err);
		}
	};
	saveItems = newItem => {
		const saveItem = AsyncStorage.setItem('ToDos', JSON.stringify(newItem));
	};


	render() {
		const { inputValue, loadingItems, allItems } = this.state;
		return (
			<>
				<View style={styles.container}>
					<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

						<View style={styles.inputContainer}>
							<Input inputValue={inputValue} onChangeText={this.newInputValue} onDoneAddItem={this.onDoneAddItem} />
						</View>

					</ScrollView>

				</View>
				<View style={styles.list}>
					<ScrollView contentContainerStyle={styles.scrollableList}>
						{Object.values(allItems)
							.reverse()
							.filter(item => !item.isCompleted)
							.map(item => (
								<List
									key={item.id}
									{...item}
									deleteItem={this.deleteItem}
									completeItem={this.completeItem}
									incompleteItem={this.incompleteItem}
								/>
							))
						}
					</ScrollView>
				</View>
			</>
		);
	}
}

AllToDoScreen.navigationOptions = {
	header: null,
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		marginRight: 16
	},
	contentContainer: {
		paddingTop: 30,
	},
	inputHeader: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
	},
	navigationFilename: {
		marginTop: 5,
	},

	inputContainer: {
		paddingLeft: 15,
		marginBottom: 10
	},
	list: {
		flex: 1,
		paddingLeft: 15,
		marginBottom: 10
	},
	scrollableList: {
		marginTop: 5
	},
	column: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	deleteAllButton: {
		marginRight: 40
	}
});
