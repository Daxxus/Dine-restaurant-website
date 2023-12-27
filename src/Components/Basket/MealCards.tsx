import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Avatar, Card, Modal } from "antd"

interface MealcardProps {
	orderTitle: string
	image: string
	price: number | string
	reservDate: React.ReactNode
	mealNbr: number
	delOrder: any
}
const { Meta } = Card
const MealCard = ({
	orderTitle,
	image,
	price,
	reservDate,
	mealNbr,
	delOrder,
}: MealcardProps) => (
	<Card
		style={{ width: 300 }}
		cover={<img alt='meal' src={image} />}
		actions={[
			<div>{mealNbr} </div>,
			<div> {price} </div>,			
			<EditOutlined key='edit' />,
			// <DeleteOutlined  style={{fontSize:18}} onClick={del} />,

			<DeleteOutlined
				type='button'
				onClick={() => {
					Modal.confirm({
						onOk: delOrder,
						title: "Delete?",
						content: "Please confirm",
						footer: (_, { OkBtn, CancelBtn }) => (
							<>
								<CancelBtn />
								<OkBtn />
							</>
						),
					})
				}}
			/>,
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
