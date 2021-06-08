import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, AsyncStorage, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import List from '../components/List';

class DoneScreen extends React.Component {
	state = {
		loadingItems: false,
		allItems: {},
		isCompleted: false
	};
	componentDidMount = () => {
		this.loadingItems();
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
		const { loadingItems, allItems } = this.state;
		return (
			<>
				<View style={styles.container}>
					<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

						<View style={styles.inputContainer}>
							<Text style={styles.inputHeader}>
								Your Completed Tasks
							</Text>
						</View>

					</ScrollView>

				</View>
				<View style={styles.list}>
					<ScrollView contentContainerStyle={styles.scrollableList}>
						{Object.values(allItems)
							.reverse()
							.filter(item => item.isCompleted)
							.map(item => (
								<List
									key={item.id}
									{...item}
									deleteItem={this.deleteItem}
									completeItem={this.completeItem}
									incompleteItem={this.incompleteItem}
								/>
							))}
					</ScrollView>
				</View>
			</>
		);
	}
}

export default DoneScreen;

DoneScreen.navigationOptions = {
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
