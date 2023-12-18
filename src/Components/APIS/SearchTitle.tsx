import { Input } from "@chakra-ui/react"
// import { Search2Icon } from "@chakra-ui/icons"
interface SearchProps {
	search: (e: React.ChangeEvent<HTMLInputElement>) => void
	// value: any
}
const SearchTitle = ({ search }: SearchProps) => {
	return (
		<div>
			<label htmlFor='name'>{/* Meals: */}</label>
			<Input
				type='text'
				onChange={search}
				border={"1px"}
				maxW={400}
				borderRadius={50}
				placeholder='Search by name'
				required>
				{/* <Search2Icon/> */}
			</Input>
		</div>
	)
}

export default SearchTitle
