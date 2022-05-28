import { Text, TouchableOpacity, View } from 'react-native';

export default function Button({ text, handleClick }) {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={handleClick}>
			<View
				style={{
					width: 120,
					height: 44,
					alignItems: 'center',
					paddingHorizontal: 20,
					paddingVertical: 10,
					backgroundColor: '#FF9A00',
					borderRadius: 50,
					shadowOffset: {
						width: 0,
						height: 1,
					},
					shadowOpacity: 0.2,
					shadowRadius: 1.41,
					elevation: 4,
				}}>
				<Text style={{ fontSize: 18 }}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
}
