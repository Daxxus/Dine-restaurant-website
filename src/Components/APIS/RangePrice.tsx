import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
} from "@chakra-ui/react"
import { ChangeEventHandler } from "react"

interface RangeProps {
	select: React.ReactNode
	target: ChangeEventHandler<HTMLSelectElement> | undefined
	// min: number
	// max: number
}
const Range = ({ select, target }: RangeProps) => {
	return (
		<>
			<RangeSlider
				defaultValue={[120, 240]}
				// min={min}
				// max={max}
				onChange={target}
				maxW={400}
				step={1}>
				<RangeSliderTrack bg='red.100'>
					<RangeSliderFilledTrack bg='crimson' />
				</RangeSliderTrack>
				<RangeSliderThumb boxSize={8} index={0}  />
				<RangeSliderThumb boxSize={8} index={1} />
				{select}
			</RangeSlider>
		</>
	)
}

export default Range

// import { memo } from "react"
// import {
// 	StyledInputWrapper,
// 	StyledLabel,
// 	StyledInput,
// } from "./RangeInputStyles"

// type RangeInputProps = {
// 	readonly name?: string
// 	readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
// 	readonly minPrice: number
// 	readonly maxPrice: number
// 	readonly price: number
// 	readonly step?: number
// }

// const Range = memo<RangeInputProps>(
// 	({
// 		name = "range",
// 		minPrice = 0,
// 		maxPrice = 2000,
// 		price = 350,
// 		step = 1,
// 		onChange,
// 	}) => {
// 		return (
// 			<StyledInputWrapper>
// 				<StyledLabel htmlFor='range'>
// 					Price between: ${minPrice} - ${price}
// 				</StyledLabel>
// 				<StyledInput
// 					id='range'
// 					name={name}
// 					value={price}
// 					min={minPrice}
// 					max={maxPrice}
// 					step={step}
// 					onChange={onChange}
// 					type='range'
// 				/>
// 			</StyledInputWrapper>
// 		)
// 	}
// )
// export default Range
// Range.displayName = "RangeInput"
