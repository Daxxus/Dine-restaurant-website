
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Avatar, Card, Input } from "antd"
interface MealcardProps {
	orderTitle: string
	image: string
	price: number | string
	reservDate: any
	meal: number
}
const { Meta } = Card

const MealCard = ({
	orderTitle,
	image,
	price,
	reservDate,
	meal,
}: MealcardProps) => (
	<Card
		style={{ width: 300 }}
		cover={<img alt='meal' src={image} />}
		actions={[
			<p>{meal} </p>,
			<p> {price} </p>,
			// <Input defaultValue={meal} placeholder='meals 1' />,
			// <Input defaultValue={reservDate} placeholder='reservDate' />,
			<EditOutlined key='edit' />,
			<DeleteOutlined />,
		]}>
		<Meta
			avatar={
				<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />
			}
			title={orderTitle}
			description={reservDate}></Meta>
	</Card>
)

export default MealCard
