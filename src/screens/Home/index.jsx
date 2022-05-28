import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../../components/Button';
import { default as PopupMenu } from '../../components/PopupMenu';
import PopupModal from '../../components/PopupModal';
import useTakePhoto from '../../hooks/useTakePhoto';

export default function HomeScreen({ navigation }) {
	const defaultImage = require('./../../../assets/noPhoto.jpg');
	const [image, setImage] = useState(null);
	const [isModal, setIsModal] = useState(false);
	const [unit, setUnit] = useState(null);
	const [visible, setVisible] = useState(false);

	const { pickImageFromCamera, pickImageFromLibrary } = useTakePhoto();

	const handleReset = () => {
		setImage(null);
		setUnit(null);
		setIsModal(false);
		setVisible(false);
	};

	const fetchData = async () => {
		try {
			// const res = await axios.get(
			// 	'https://pbl5-flask-api.herokuapp.com/api/calories/'
			// );
			const res = await axios.get('http://192.168.1.100/getWeight');
			if (res.status === 200) {
				console.log(res.data);
			} else {
				alert('Đã có lỗi xảy ra, không thể tải dữ liệu từ server!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View
			style={{
				marginTop: 50,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#F5F2ED',
			}}>
			<StatusBar style="auto" backgroundColor="#fff" />
			<View style={{ width: 320 }}>
				<TouchableOpacity>
					<AntDesign
						name="leftcircleo"
						size={24}
						color="black"
						onPress={() => navigation.goBack()}
					/>
				</TouchableOpacity>
				<View style={{ alignItems: 'center' }}>
					<Text
						style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>
						Healthy Cooking
					</Text>
				</View>
			</View>
			<View>
				<Text style={{ marginTop: 10, marginBottom: 12, fontSize: 18 }}>
					Hình ảnh
				</Text>
				<View>
					<Image
						source={image ? { uri: image?.uri } : defaultImage}
						style={{
							width: 320,
							height: 250,
							backgroundColor: 'rgba(220, 228, 224, 0.4)',
							borderRadius: 20,
							resizeMode: 'cover',
						}}
					/>

					<View
						style={{
							position: 'absolute',
							right: 8,
							top: 12,
							zIndex: 1,
						}}>
						<TouchableOpacity>
							<MaterialCommunityIcons
								name="dots-vertical"
								size={24}
								color={image ? '#f4f4f4' : 'black'}
								onPress={() => setVisible(true)}
							/>
						</TouchableOpacity>
					</View>
					<PopupMenu
						isModal={visible}
						setIsModal={setVisible}
						takePhoto={pickImageFromCamera}
						selectPhoto={pickImageFromLibrary}
						setImage={setImage}
					/>
				</View>
			</View>

			<View
				style={{
					width: 320,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: 40,
				}}>
				<Text style={{ marginBottom: 10, fontSize: 18 }}>Khối lượng</Text>
				<TextInput
					// keyboardType="numeric"
					value="0"
					editable={false}
					// onChangeText={onChangeNumber}
					placeholder="useless placeholder"
					keyboardType="numeric"
					style={{
						textAlign: 'center',
						width: 120,
						paddingHorizontal: 15,
						// paddingVertical: 12,
						// backgroundColor: 'rgba(220, 228, 224, 0.9)',
						// backgroundColor: '#ffff',
						// borderRadius: 8,
						fontSize: 16,
						color: '#000',
						borderBottomWidth: 0.2,
					}}
				/>

				{/* <View>
					<Text style={{ marginBottom: 10, fontSize: 18 }}>Nhập số lượng</Text>
					<TextInput
						keyboardType="numeric"
						style={{
							width: 135,
							height: 45,
							paddingHorizontal: 15,
							paddingVertical: 12,
							backgroundColor: 'rgba(220, 228, 224, 0.9)',
							borderRadius: 8,
							fontSize: 16,
							borderWidth: 0.2,
						}}
					/>
				</View>
				<View>
					<Text style={{ marginBottom: 10, fontSize: 18 }}>Đơn vị tính</Text>
					<View
						style={{
							width: 135,
							height: 45,
							justifyContent: 'center',
							paddingLeft: 10,
							backgroundColor: 'rgba(220, 228, 224, 0.9)',
							fontSize: 16,
							borderRadius: 8,
							borderWidth: 0.2,
						}}>
						<Picker
							itemStyle={{ fontSize: 16 }}
							selectedValue={unit}
							onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}>
							<Picker.Item label="Củ" value="cu" />
							<Picker.Item label="Quả" value="qua" />
						</Picker>
					</View>
				</View> */}
			</View>
			<View
				style={{
					width: 320,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 50,
					paddingHorizontal: 8,
				}}>
				<Button
					text={'Tính toán'}
					handleClick={() => {
						if (image?.uri) {
							setIsModal(true);
						}
					}}
				/>
				<Button text={'Tạo mới'} handleClick={() => handleReset()} />
			</View>
			<PopupModal
				isModal={isModal}
				setIsModal={setIsModal}
				image={image?.uri}
				base64={image?.base64}
			/>
		</View>
	);
}
