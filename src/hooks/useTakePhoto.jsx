import * as ImagePicker from 'expo-image-picker';

export default function useTakePhoto() {
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
				return {
					base64: result.base64,
					uri: result.uri,
				};
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
				return {
					base64: result.base64,
					uri: result.uri,
				};
			}
		} catch (error) {
			console.log('lỗi');
		}
		return null;
	};

	return {
		pickImageFromCamera,
		pickImageFromLibrary,
	};
}
