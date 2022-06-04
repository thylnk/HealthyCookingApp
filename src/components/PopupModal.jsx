import { AntDesign } from '@expo/vector-icons';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

export default function PopupModal(props) {
	const { isModal, setIsModal, image, name, weight, calories } = props;

	return (
		<Modal
			style={{
				marginTop: 0,
				// margin: 20,
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
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<View
					style={{
						backgroundColor: 'rgba(247, 247, 247, 0.95)',
						margin: 'auto',
						width: 320,
						height: 430,
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
							width: 280,
							height: 280,
							backgroundColor: 'rgba(220, 228, 224, 0.4)',
							borderRadius: 20,
							marginVertical: 10,
							resizeMode: 'contain',
						}}
					/>
					<Text style={{ fontSize: 16, marginTop: 10 }}>{name}</Text>
					<Text style={{ fontSize: 16 }}>Khối lượng: {weight}</Text>
					<Text style={{ fontSize: 16 }}>Lượng calo: {calories}</Text>
				</View>
			</View>
		</Modal>
	);
}
