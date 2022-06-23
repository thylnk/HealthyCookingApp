import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Image,
	Modal,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import { default as PopupMenu } from '../../components/PopupMenu';
import PopupModal from '../../components/PopupModal';
import useTakePhoto from '../../hooks/useTakePhoto';

export default function MainScreen({ navigation }) {
	const defaultImage = require('./../../../assets/noPhoto.jpg');
	const [image, setImage] = useState(null);
	const [isModal, setIsModal] = useState(false);
	const [name, setName] = useState('');
	const [calories, setCalories] = useState(0);
	const [visible, setVisible] = useState(false);
	const [isReceive, setIsReceive] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const { pickImageFromCamera, pickImageFromLibrary } = useTakePhoto();
	let weight = useSelector((state) => state.weight.value) || 0;

	const handleReset = () => {
		setImage(null);
		setName('');
		setCalories(0);
		setIsModal(false);
		setVisible(false);
		setIsReceive(true);
	};

	const handlePredict = async () => {
		setIsLoading(true);
		try {
			const body = { data: image?.base64 };
			const res = await axios.post(
				'http://20.63.142.179/api/image',
				JSON.stringify(body)
			);
			if (res.status === 200) {
				const result = res?.data.result;
				const calo = res?.data.calories;
				setName(result);
				if (result !== 'error') {
					setName(result);
					onCalculate(calo);
					setIsModal(true);
				} else {
					Alert.alert('LỖI', 'Không thể nhận diện hình ảnh!');
				}
			}
		} catch (error) {
			console.log(error);
			Alert.alert('LỖI', 'Đã có lỗi xảy ra, không thể tải dữ liệu từ server!');
			setIsModal(false);
		} finally {
			setIsLoading(false);
		}
	};

	const onCalculate = useCallback(
		(calo) => {
			setCalories(weight * calo);
		},
		[weight]
	);

	return (
		<ScrollView style={{ height: '100%' }}>
			<Modal animationType="fade" transparent={true} visible={isLoading}>
				<View
					style={{
						marginTop: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0,0,0,0.5)',
						justifyContent: 'center',
					}}>
					<ActivityIndicator size={150} color="#FF9A00" />
				</View>
			</Modal>
			<PopupModal
				isModal={isModal}
				setIsModal={setIsModal}
				image={image?.uri}
				base64={image?.base64}
				weight={weight}
				name={name}
				calories={calories}
			/>
			<View
				style={{
					paddingHorizontal: 30,
					marginTop: 20,
					display: 'flex',
					justifyContent: 'center',
					backgroundColor: '#F5F2ED',
				}}>
				<StatusBar style="auto" backgroundColor="#fff" />
				<View style={{ width: '100%' }}>
					<View style={{ alignItems: 'center' }}>
						<Text
							style={{
								fontSize: 24,
								fontWeight: 'bold',
								marginTop: 40,
								marginBottom: 20,
							}}>
							Healthy Cooking
						</Text>
					</View>
				</View>
				<View style={{ width: '100%' }}>
					<View
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 20,
							alignSelf: 'center',
						}}>
						<Text style={{ marginTop: 10, marginBottom: 16, fontSize: 20 }}>
							Hình ảnh
						</Text>
						<Button text="Chụp ảnh" handleClick={() => setVisible(true)} />
					</View>

					<View
						style={{
							alignSelf: 'center',
						}}>
						<Image
							source={image ? { uri: image?.uri } : defaultImage}
							style={{
								width: 350,
								height: 350,
								backgroundColor: '#F5F2ED',
								resizeMode: 'contain',
							}}
						/>

						<View
							style={{
								position: 'absolute',
								right: 8,
								top: 12,
								zIndex: 1,
							}}>
							{/* <TouchableOpacity>
								<MaterialCommunityIcons
									name="dots-vertical"
									size={24}
									color={image ? '#f4f4f4' : 'black'}
									onPress={() => setVisible(true)}
								/>
							</TouchableOpacity> */}
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
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 40,
						alignSelf: 'center',
					}}>
					<Text style={{ marginBottom: 10, fontSize: 20 }}>
						Khối lượng (gam)
					</Text>
					<TextInput
						value={weight + ''}
						editable={false}
						style={{
							textAlign: 'center',
							width: 120,
							paddingHorizontal: 15,
							fontSize: 20,
							color: '#000',
							borderBottomWidth: 0.2,
							marginBottom: 10,
						}}
					/>
				</View>
				<View
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 20,
						paddingHorizontal: 8,
						alignSelf: 'center',
						paddingBottom: 40,
					}}>
					<Button
						text={'Tính toán'}
						handleClick={() => {
							if (image?.uri) {
								setIsReceive(false);
								handlePredict();
							} else {
								Alert.alert('LỖI', 'Vui lòng chọn hình ảnh để nhận diện!');
							}
						}}
					/>
					<Button text={'Tạo mới'} handleClick={() => handleReset()} />
				</View>
			</View>
		</ScrollView>
	);
}
