import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

export default function PopupModal(props) {
	const { isModal, setIsModal, image, base64 } = props;
	const [img64, setImg64] = useState(base64);

	const predictImage = async () => {
		try {
			const request = JSON.stringify({ data: img64 });
			const res = await axios.post(
				'https://pbl5-flask-api.herokuapp.com/api/image/',
				request
			);
			if (res.status === 200) {
				console.log(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		predictImage();
	}, [img64]);

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
					backgroundColor: '#0000000aa',
					flex: 1,
					alignItems: 'center',
				}}>
				<View
					style={{
						backgroundColor: 'rgba(247, 247, 247, 0.95)',
						marginTop: 180,
						width: 350,
						height: 320,
						borderWidth: 1,
						borderRadius: 25,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<View
						style={{
							display: 'flex',
							alignItems: 'flex-end',
							paddingRight: 25,
							paddingBottom: 10,
							width: '100%',
						}}>
						<TouchableOpacity onPress={() => setIsModal(false)}>
							<AntDesign name="closecircleo" size={24} color="black" />
						</TouchableOpacity>
					</View>
					<Image
						source={{ uri: image }}
						style={{
							width: 285,
							height: 180,
							backgroundColor: 'rgba(220, 228, 224, 0.4)',
							borderRadius: 20,
							marginVertical: 10,
						}}
					/>
					<Text style={{ fontSize: 16 }}>Cà rốt</Text>
					<Text style={{ fontSize: 16 }}>Lượng calo: 200</Text>
				</View>
			</View>
		</Modal>
	);
}
