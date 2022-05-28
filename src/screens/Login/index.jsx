import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import StyleSheet from '../../styles/index';

export default function LoginScreen({ navigation }) {
	return (
		<View style={StyleSheet.container}>
			<StatusBar style="auto" backgroundColor="#ffff" />
			<View style={{ marginBottom: 70 }}>
				<Image source={require('./../../../assets/logo.png')} />
			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate('Home')}
				activeOpacity={0.8}>
				<View style={StyleSheet.btnIcon}>
					<Text style={StyleSheet.baseText}>Bắt đầu</Text>
					<AntDesign name="rightcircle" size={24} color="black" />
				</View>
			</TouchableOpacity>
		</View>
	);
}
