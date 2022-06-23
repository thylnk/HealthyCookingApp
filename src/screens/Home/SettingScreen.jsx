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

import { useDispatch, useSelector } from 'react-redux';
import {
	selectEsp,
	selectIP,
	setConnect,
	setIP,
} from '../../services/esp8266.slice';
import { setWeight } from '../../services/weight.slice';

export default function SettingScreen({ navigation }) {
	let connected = useSelector((state) => state.esp8266.value) || false;
	let ip = useSelector((state) => state.esp8266.ip);
	const dispatch = useDispatch();
	const [currentIp, setCurrentIp] = useState(ip);

	const onClick = async () => {
		if (!currentIp) {
			Alert.alert('LỖI', 'Bạn cần nhập địa chỉ IP!');
			return;
		}
		dispatch(setIP(currentIp));
		try {
			while (true) {
				const res = await axios.get(`http://${currentIp}/getWeight`);
				console.log(res?.data?.weight);
				const data = res?.data?.weight || 0;
				if (data) {
					dispatch(setWeight(res?.data?.weight));
					dispatch(setConnect(true));
				}
			}
		} catch (err) {
			Alert.alert(
				'LỖI',
				`Đã có lỗi xảy ra, không thể kết nối đến ESP8266 ở địa chỉ ${currentIp}!`
			);
			dispatch(setConnect(false));
		}
	};

	const onReset = async () => {
		if (!ip) {
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
			const res = await axios.post(
				`http://${currentIp}/reset`,
				JSON.stringify(data)
			);
			console.log(res.data);
			dispatch(setIP(null));
			dispatch(setConnect(false));
			dispatch(setWeight(0));
			setCurrentIp(null);
			if (res.data.result === 'success') {
				Alert.alert('THÔNG BÁO', 'Bạn đã reset wifi cho ESP8266 thành công!');
			}
		} catch (err) {
			console.log(err);
			Alert.alert(
				'LỖI',
				`Đã có lỗi xảy ra, không thể hủy kết nối đến ESP8266 ở địa chỉ ${ip}!`
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
						{connected ? currentIp : 'Chưa cài đặt'}
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
									marginVertical: 30,
									height: 44,
									alignSelf: 'center',
									paddingHorizontal: 20,
									paddingVertical: 8,
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
						value={currentIp}
						onChangeText={(value) => {
							setCurrentIp(value);
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
