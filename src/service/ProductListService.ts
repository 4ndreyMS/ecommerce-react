import axios from "axios";

import { IProduct } from "../models/IProduct";

export const producstList = [
	{
		id: "1",
		name: "Syltherine",
		description:
			"The Syltherine is an elegant and comfortable chair that boasts a high-quality wood finish. Its design is inspired by the classic cafe style, making it a perfect addition to any bedroom setting. The chair is not only stylish but also provides excellent comfort, ensuring a relaxing experience every time you sit on it.",
		price: "200",
		category: "Bedroom",
		abstract: "Stylish cafe chair",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct1.png?alt=media&token=a304375d-6c38-4e2b-8311-5c1d6f2ff47b",
		isFeatured: true,
	},
	{
		id: "2",
		name: "Hufflebench",
		description:
			"The Hufflebench is a sturdy and spacious bench made from premium oak. It is designed to provide ample seating space while adding a rustic charm to your living room. The bench is crafted with attention to detail and is sure to withstand the test of time.",
		price: "350",
		category: "Living Room",
		abstract: "Oakwood bench",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct2.png?alt=media&token=70b6cf6d-378f-4a83-b93f-54c13f923611",
		isFeatured: true,
	},
	{
		id: "3",
		name: "Ravenclaw Recliner",
		description:
			"The Ravenclaw Recliner is a luxurious piece of furniture that offers plush cushioning and an adjustable backrest for ultimate comfort. Whether you're reading a book or enjoying a cup of coffee outdoors, this recliner is designed to provide a relaxing and comfortable seating experience.",
		price: "500",
		category: "Outdoor",
		abstract: "Comfortable recliner",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct3.png?alt=media&token=a56b8114-5572-41d9-9250-a150a85a2b15",
		isFeatured: true,
	},
	{
		id: "4",
		name: "Gryffindesk",
		description:
			"The Gryffindesk is a sleek and modern desk that features built-in drawers and a glass top. It is designed to provide a spacious work surface while adding a touch of elegance to your kitchen. The desk is not only functional but also adds a contemporary feel to your space.",
		price: "400",
		category: "Kitchen",
		abstract: "Modern office desk",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct4.png?alt=media&token=a8070e1d-04a6-4aa9-a36a-6ece39ef0cb7",
		isFeatured: true,
	},
	{
		id: "5",
		name: "Quidditch Quilt",
		description:
			"The Quidditch Quilt is a warm and cozy quilt made from hypoallergenic materials. It is designed to provide a comfortable and restful sleep. The quilt is not only cozy but also adds a touch of elegance to your bedroom decor.",
		price: "150",
		category: "Bedroom",
		abstract: "Cozy bedroom quilt",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct5.png?alt=media&token=dc476941-159d-4ead-bf22-337db85dffa8",
		isFeatured: true,
	},
	{
		id: "6",
		name: "Dumbledrawer",
		description:
			"The Dumbledrawer is a large drawer that offers ample storage space. It features a vintage look that adds a touch of classic charm to your bedroom. The drawer is not only functional but also enhances the aesthetic appeal of your space.",
		price: "300",
		category: "Bedroom",
		abstract: "Vintage drawer",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct6.png?alt=media&token=970d7d59-bcfd-4f2f-8b54-74e451af199a",
		isFeatured: true,
	},
	{
		id: "7",
		name: "Potter's Pot Stand",
		description:
			"The Potter's Pot Stand is a charming pot stand that is perfect for displaying your favorite plants. It is designed to hold your pots securely while adding a touch of elegance to your outdoor space. The stand is not only functional but also enhances the aesthetic appeal of your garden or patio.",
		price: "50",
		category: "Outdoor",
		abstract: "Charming pot stand",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct7.png?alt=media&token=cb1225f1-c1cc-40fb-87f2-d67b80b2be84",
		isFeatured: true,
	},
	{
		id: "8",
		name: "Weasley's Wicker Basket",
		description:
			"The Weasley's Wicker Basket is a handwoven basket that is perfect for storing small items. It is designed to provide a convenient storage solution while adding a rustic charm to your kitchen. The basket is not only functional but also adds a touch of elegance to your space.",
		price: "75",
		category: "Kitchen",
		abstract: "Handwoven wicker basket",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct8.png?alt=media&token=97f4d6d3-c5f0-4680-b5ce-a85918c911db",
		isFeatured: true,
	},
	{
		id: "9",
		name: "Stainless Steel Oven",
		description:
			"The Stainless Steel Oven is a high-quality oven that is designed to meet all your cooking needs. It features a sleek stainless steel design that adds a modern touch to your kitchen. The oven is not only functional but also enhances the aesthetic appeal of your space.",
		price: "1400",
		category: "Kitchen",
		abstract: "Stainless steel oven",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct8.png?alt=media&token=97f4d6d3-c5f0-4680-b5ce-a85918c911db",
		isFeatured: false,
	},
	{
		id: "10",
		name: "Glass Shower Enclosure",
		description:
			"The Glass Shower Enclosure is a modern enclosure that adds a touch of elegance to your bathroom. It is designed to provide a spacious and comfortable showering experience. The enclosure is not only functional but also enhances the aesthetic appeal of your bathroom.",
		price: "1200",
		category: "Bathroom",
		abstract: "Glass shower enclosure",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct10.jpg?alt=media&token=08e083c9-3882-463a-957b-2eb27c99c0f4",
		isFeatured: false,
	},
	{
		id: "11",
		name: "Oakwood Dining Table",
		description:
			"The Oakwood Dining Table is a sturdy and spacious dining table made from premium oak. It is designed to provide ample dining space while adding a rustic charm to your kitchen. The table is crafted with attention to detail and is sure to withstand the test of time.",
		price: "1200",
		category: "Kitchen",
		abstract: "Oakwood dining table",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct11.jpg?alt=media&token=5b3422b3-8106-49b2-abfa-22cfe59c3dce",
		isFeatured: false,
	},
	{
		id: "12",
		name: "Leather Sofa",
		description:
			"The Leather Sofa is a comfortable and stylish sofa that is perfect for any living room. It is designed with a premium leather finish that adds a touch of elegance to your space. The sofa is not only stylish but also provides excellent comfort, ensuring a relaxing experience every time you sit on it.",
		price: "800",
		category: "Living Room",
		abstract: "Leather sofa",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct12.jpg?alt=media&token=f4d1c0fe-706e-4b8a-9a8e-738f534e0c15",
		isFeatured: false,
	},
	{
		id: "13",
		name: "Garden Swing Chair",
		description:
			"The Garden Swing Chair is a fun and relaxing swing chair that is perfect for your outdoor space. It is designed to provide a comfortable seating experience while adding a touch of elegance to your garden or patio. The swing chair is not only functional but also enhances the aesthetic appeal of your outdoor space.",
		price: "350",
		category: "Outdoor",
		abstract: "Garden swing chair",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct13.jpg?alt=media&token=3c11d2ea-154b-4feb-9278-27d50bb9e9f6",
		isFeatured: false,
	},
	{
		id: "14",
		name: "King Size Bed",
		description:
			"The King Size Bed is a spacious and comfortable bed made from high-quality wood. It is designed to provide a restful sleep while adding a touch of elegance to your bedroom. The bed is not only comfortable but also adds a contemporary feel to your space.",
		price: "1500",
		category: "Bedroom",
		abstract: "King size bed",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct14.jpg?alt=media&token=46f07e5e-e0d0-4bb3-8a9f-11b7208696d5",
		isFeatured: false,
	},
	{
		id: "15",
		name: "Velvet Armchair",
		description:
			"The Velvet Armchair is a plush armchair with a modern design. It is designed to provide a comfortable seating experience while adding a touch of elegance to your living room. The armchair is not only stylish but also provides excellent comfort, ensuring a relaxing experience every time you sit on it.",
		price: "600",
		category: "Living Room",
		abstract: "Velvet armchair",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct15.jpg?alt=media&token=b4424695-08f1-4872-9dc1-0aefe9180981",
		isFeatured: false,
	},
	{
		id: "16",
		name: "Bamboo Coffee Table",
		description:
			"The Bamboo Coffee Table is a lightweight coffee table made from sustainable bamboo. It is designed to provide a convenient surface for your coffee or tea while adding a rustic charm to your living room. The table is not only functional but also enhances the aesthetic appeal of your space.",
		price: "200",
		category: "Living Room",
		abstract: "Bamboo coffee table",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct16.jpg?alt=media&token=59347428-25e2-40c0-bf7e-7b6bcac15a71",
		isFeatured: false,
	},
	{
		id: "17",
		name: "Outdoor Rattan Sofa Set",
		description:
			"The Outdoor Rattan Sofa Set is a durable and stylish sofa set that is perfect for your outdoor space. It is designed to provide a comfortable seating experience while adding a touch of elegance to your garden or patio. The sofa set is not only functional but also enhances the aesthetic appeal of your outdoor space.",
		price: "1200",
		category: "Outdoor",
		abstract: "Outdoor rattan sofa set",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct17.jpg?alt=media&token=6714f453-992e-4961-aa15-b1f6b002825b",
		isFeatured: false,
	},
	{
		id: "18",
		name: "Wooden Bedside Table",
		description:
			"The Wooden Bedside Table is a compact and functional bedside table that features a drawer and shelf. It is designed to provide a convenient storage solution while adding a rustic charm to your bedroom. The table is not only functional but also enhances the aesthetic appeal of your space.",
		price: "150",
		category: "Bedroom",
		abstract: "Wooden bedside table",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct18.jpg?alt=media&token=de210a0c-3978-4f44-8c9b-c79c1912ce26",
		isFeatured: false,
	},
	{
		id: "19",
		name: "Marble Countertop",
		description:
			"The Marble Countertop is a sleek and durable countertop that is perfect for your kitchen. It is designed to provide a convenient surface for your cooking needs while adding a touch of elegance to your kitchen. The countertop is not only functional but also enhances the aesthetic appeal of your space.",
		price: "800",
		category: "Kitchen",
		abstract: "Marble countertop",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct19.jpg?alt=media&token=d844a389-80c8-4b54-a1d7-bbc6b043dfb4",
		isFeatured: false,
	},
	{
		id: "20",
		name: "Patio Dining Set",
		description:
			"The Patio Dining Set is a beautiful and durable dining set that is perfect for your patio. It is designed to provide a comfortable dining experience while adding a touch of elegance to your outdoor space. The dining set is not only functional but also enhances the aesthetic appeal of your patio.",
		price: "1000",
		category: "Outdoor",
		abstract: "Patio dining set",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct20.jpg?alt=media&token=0b481e3d-51bc-4683-8d32-1af120ee5dc2",
		isFeatured: false,
	},
	{
		id: "21",
		name: "Granite Kitchen Island",
		description:
			"The Granite Kitchen Island is a spacious kitchen island that features a durable granite top. It is designed to provide a convenient workspace and dining area in your kitchen. The granite top is not only durable but also adds a touch of elegance to your kitchen decor.",
		price: "1300",
		category: "Kitchen",
		abstract: "Granite kitchen island",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct21.jpg?alt=media&token=a0e4e820-959a-4278-8378-4cb1de62c3ec",
		isFeatured: false,
	},
	{
		id: "22",
		name: "Leather Recliner",
		description:
			"The Leather Recliner is a luxurious recliner that features an adjustable backrest for ultimate comfort. It is upholstered in premium leather, adding a touch of elegance to your living room. Whether you're reading a book or watching TV, this recliner is designed to provide a relaxing seating experience.",
		price: "900",
		category: "Living Room",
		abstract: "Leather recliner",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct22.jpg?alt=media&token=083ff09a-275e-4072-b067-885c4eddfe71",
		isFeatured: false,
	},
	{
		id: "23",
		name: "Outdoor Hammock",
		description:
			"The Outdoor Hammock is a comfortable hammock made from durable fabric. It is designed to provide a relaxing lounging experience in your outdoor space. Whether you're reading a book or taking a nap, this hammock is the perfect addition to your garden or patio.",
		price: "200",
		category: "Outdoor",
		abstract: "Outdoor hammock",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct23.jpg?alt=media&token=152136a2-92ef-46b4-be37-401810c72a7e",
		isFeatured: false,
	},
	{
		id: "24",
		name: "Queen Size Bed",
		description:
			"The Queen Size Bed is a comfortable bed that features a stylish headboard. It is designed to provide a restful sleep while adding a touch of elegance to your bedroom. The bed is not only comfortable but also adds a contemporary feel to your space.",
		price: "1100",
		category: "Bedroom",
		abstract: "Queen size bed",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct24.jpg?alt=media&token=a8bc14be-e069-4d31-8ad9-034b76be8cac",
		isFeatured: false,
	},
	{
		id: "25",
		name: "Ceramic Bathroom Sink",
		description:
			"The Ceramic Bathroom Sink is a sleek and modern sink that is perfect for your bathroom. It is designed to provide a convenient washing area while adding a touch of elegance to your bathroom decor. The sink is not only functional but also enhances the aesthetic appeal of your bathroom.",
		price: "300",
		category: "Bathroom",
		abstract: "Ceramic bathroom sink",
		image:
			"https://firebasestorage.googleapis.com/v0/b/test-login-react-f7ba0.appspot.com/o/products%2Fproduct25.jpg?alt=media&token=a308a10a-8f60-4125-af81-8650a072b086",
		isFeatured: false,
	},
];

export const baseProductUrl =
	"https://test-login-react-f7ba0-default-rtdb.firebaseio.com/producstList.json";

//Fill database
export const fillData = () => {
	const baseURl =
		"https://test-login-react-f7ba0-default-rtdb.firebaseio.com/producstList.json";
	producstList.map((item) => {
		axios.post(baseURl, item);
	});
};

export const getAllProducts = async (): Promise<IProduct[]> => {
	const response = await axios.get(baseProductUrl);
	return Object.values(response.data);
};
