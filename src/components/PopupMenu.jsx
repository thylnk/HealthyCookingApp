import * as ImagePicker from 'expo-image-picker';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

export default function PopupMenu(props) {
	const { isModal, setIsModal, takePhoto, selectPhoto, setImage } = props;

	const pickImageFromLibrary = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: false,
				aspect: [1, 1],
				base64: true,
				quality: 1,
			});

			if (!result.cancelled) {
				setImage({
					base64: result.base64,
					uri: result.uri,
				});
			}
		} catch (error) {
			console.log('lỗi', error);
		}
		return null;
	};

	const pickImageFromCamera = async () => {
		try {
			const result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [1, 1],
				base64: true,
				quality: 1,
			});

			if (!result.cancelled) {
				setImage({
					base64: result.base64,
					uri: result.uri,
				});
			}
		} catch (error) {
			console.log('lỗi');
		}
	};

	return (
		<Modal
			style={{
				margin: 20,
				backgroundColor: 'white',
				borderRadius: 20,
				padding: 35,
				alignItems: 'center',
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 4,
				elevation: 5,
			}}
			transparent={true}
			animationType="fade"
			visible={isModal}>
			<View
				style={{
					backgroundColor: 'rgba(0,0,0,0.4)',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-end',
				}}>
				<View
					style={{
						backgroundColor: '#f4f4f4',
						marginBottom: 30,
						width: '85%',
						height: 175,
						borderRadius: 15,
						alignItems: 'center',
					}}>
					<View
						style={{
							width: '100%',
							paddingHorizontal: 10,
						}}>
						<TouchableOpacity
							onPress={() => {
								pickImageFromCamera();
								setIsModal(false);
							}}
							style={{
								paddingHorizontal: 20,
								paddingVertical: 15,
								width: '100%',
							}}>
							<Text style={{ fontSize: 20 }}>Chụp ảnh</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								pickImageFromLibrary();
								setIsModal(false);
							}}
							style={{
								paddingHorizontal: 20,
								paddingVertical: 15,
								width: '100%',
								borderTopWidth: 1,
								borderBottomWidth: 1,
								borderColor: 'rgba(0,0,0,0.2)',
							}}>
							<Text style={{ fontSize: 20 }}>Chọn ảnh từ thư viện</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setIsModal(false)}
							style={{
								paddingHorizontal: 20,
								width: '100%',
								paddingVertical: 15,
							}}>
							<Text style={{ fontSize: 20 }}>Thoát</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
