import { ChangeEventHandler } from "react"
import { Input } from "@chakra-ui/react"

interface SearchProps {
	search: ChangeEventHandler<HTMLInputElement>
}
const SearchTitle = ({ search }: SearchProps) => {
	return (
		<div>
			<label htmlFor='name'>
				{/* Meals: */}
				<Input
					type='text'
					onChange={search}
					border={"1px"}
					maxW={400}
					borderRadius={50}
					placeholder='Search by letters'
					required
				/>
			</label>
		</div>
	)
}

export default SearchTitle
