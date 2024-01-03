import {
	Box,
	Image,	
	Stack,
	Text,
} from "@chakra-ui/react"

export type CartProductMetaProps = {
	name: string
	image: string
}

export const CartProductMeta = (props: CartProductMetaProps) => {
	const { image, name } = props
	return (
		<Stack direction='row' spacing='5' width='full'>
			<Image
				// rounded='lg'
				width={{ base: 120, md: 220 }}
				height={{ base: 120, md: 220 }}
				fit='cover'
				src={image}
				alt={name}
				draggable='false'
				loading='lazy'
			/>
			<Box pt='4'>
				<Stack spacing='0.5'>
					<Text fontWeight='medium'>{name}</Text>					
				</Stack>
			
			</Box>
		</Stack>
	)
}
