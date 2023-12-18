import styles from "./Styles/RangeStyle.module.css"
import { Input, Box } from "@chakra-ui/react"
interface RangeProps {
	target: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: number
}
const Ranges = ({ target, value }: RangeProps) => {
	return (
		<Box fontSize={22} color={"white"}>
			Price between: $2 - ${value}
			<Input
				className={styles.input}
				maxW={400}
				value={value}
				type='range'
				min={0}
				max={200}
				step={1}
				onChange={target}
			/>
		</Box>
	)
}

export default Ranges
