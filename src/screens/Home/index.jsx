import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useRoute } from '@react-navigation/native';
import MainScreen from './MainScreen';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
	// const route = useRoute();
	return (
		<>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: { height: 60 },
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === 'Main') {
							iconName = 'home';
							color = focused ? '#FF9A00' : 'black';
						} else if (route.name === 'Settings') {
							iconName = 'setting';
							color = focused ? '#FF9A00' : 'black';
						}
						return <AntDesign name={iconName} size={30} color={color} />;
					},
				})}>
				<Tab.Screen name="Main" component={MainScreen} />
				<Tab.Screen name="Settings" component={SettingScreen} />
			</Tab.Navigator>
		</>
	);
}
