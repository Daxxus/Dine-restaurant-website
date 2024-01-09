import { Select, Box } from "@chakra-ui/react"
import { ChangeEventHandler } from "react"

interface SearchProps {
	select: React.ReactNode
	target: ChangeEventHandler<HTMLSelectElement> | undefined
	// value: any
}
const SelectTitle = ({ select, target }: SearchProps) => {
	return (
		<Box>
			<Select
				placeholder='Search meals'
				border={"1px"}				
				maxW={400}
				id='search'
				onChange={target}
				name='order'
				variant='filled'>				
				{select}
			</Select>
		</Box>
	)
}

export default SelectTitle