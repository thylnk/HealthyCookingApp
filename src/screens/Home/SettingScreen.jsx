import axios from 'axios';
import { useState } from 'react';
import {
	Alert,
	ScrollView,
	StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { setWeight } from '../../services/weight.slice';

export default function SettingScreen({ navigation }) {
	const dispatch = useDispatch();
	const [ip, setIp] = useState('');

	const onClick = async () => {
		if (!ip) {
			Alert.alert('LỖI', 'Bạn cần nhập địa chỉ IP!');
			return;
		}
		try {
			const res = await axios.get(`http://${ip}/getWeight`);
			console.log(res?.data?.weight);
			const data = res?.data?.weight || 0;
			if (data) {
				dispatch(setWeight(res?.data?.weight));
				setIp('');
			}
		} catch (err) {
			Alert.alert(
				'LỖI',
				`Đã có lỗi xảy ra, không thể kết nối đến ESP8266 ở địa chỉ ${ip}!`
			);
			setIp('');
		}
	};
	const onReset = async () => {
		if (ip === '') {
			Alert.alert(
				'LỖI',
				'Bạn chưa kết nối đến ESP8266 nên không thể hủy kết nối!'
			);
			return;
		}
		const data = {
			reset: 'true',
		};
		try {
			const res = await axios.post(`http://${ip}/reset`, JSON.stringify(data));
			console.log(res.data);
			setIp('');
		} catch (err) {
			console.log(err);
			Alert.alert(
				'LỖI',
				`Đã có lỗi xảy ra, không thể kết nối đến ESP8266 ở địa chỉ ${ip}!`
			);
		}
	};

	return (
		<View
			style={{
				marginTop: 60,
				display: 'flex',
				justifyContent: 'center',
				backgroundColor: '#F5F2ED',
			}}>
			<StatusBar style="auto" backgroundColor="#fff" />
			<ScrollView style={{ height: '100%' }}>
				<View
					style={{
						paddingHorizontal: 20,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<Text style={{ fontSize: 20, paddingBottom: 10 }}>
						Địa chỉ IP hiện tại:
					</Text>
					<Text style={{ fontSize: 20, paddingBottom: 10 }}>
						{ip !== '' ? ip : 'Chưa cài đặt'}
					</Text>
				</View>
				<View
					style={{
						paddingHorizontal: 20,
						marginTop: 10,
					}}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<Text style={{ fontSize: 20 }}>Kết nối ESP:</Text>
						<TouchableOpacity onPress={onReset}>
							<View
								style={{
									marginVertical: 20,
									height: 44,
									alignSelf: 'center',
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
								<Text style={{ fontSize: 19, alignSelf: 'center' }}>Hủy</Text>
							</View>
						</TouchableOpacity>
					</View>

					<Text style={{ fontSize: 20, marginTop: 20 }}>
						Nhập địa chỉ IP mới:
					</Text>
					<TextInput
						editable={true}
						style={{
							textAlign: 'center',
							paddingHorizontal: 15,
							fontSize: 20,
							paddingTop: 6,
							color: '#000',
							borderBottomWidth: 0.2,
						}}
						value={ip}
						onChangeText={(value) => {
							setIp(value);
						}}
					/>
					<TouchableOpacity onPress={onClick}>
						<View
							style={{
								margin: 20,
								width: '80%',
								height: 44,
								alignSelf: 'center',
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
							<Text style={{ fontSize: 19, alignSelf: 'center' }}>Kết nối</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
