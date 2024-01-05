import {
	Button,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Modal,
	ResponsiveValue,
} from "@chakra-ui/react"
interface Props {
	onClose: () => void
	isOpen: boolean
	size: ResponsiveValue<string>
}

import Contact from "./Contact"

const ModalComp = ({ onClose, isOpen, size }: Props) => {
	return (
		<Modal onClose={onClose} size={size} isOpen={isOpen}>
			<ModalOverlay />
			<ModalContent>
				{/* <ModalHeader></ModalHeader> */}
				<ModalCloseButton position={`absolute`} right={10} top={10} />
				<ModalBody alignItems={`center`} display={`flex`}>
					<Contact />
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} position={`absolute`} left={10} bottom={10}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default ModalComp
