import { useLinkProps } from '@react-navigation/native';
import { Linking } from 'expo';

export default function (containerRef) {
	return useLinkProps(containerRef, {
		// prefixes: [Linking.makeUrl('/')],
		config: {
			Root: {
				path: 'root',
				screens: {
					AllToDo: 'AllToDo',
					Done: 'Done Task',
					Settings: 'settings',
				},
			},
		},
	});
}
