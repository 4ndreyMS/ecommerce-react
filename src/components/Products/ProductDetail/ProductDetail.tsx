import { IProductSpring } from "../../../models/IProduct";
import SimpleBanner from "../../Banners/SimpleBanner/intex";
import { Button } from "@nextui-org/react";
import { useCartManage } from "../../../service/hooks/useCartManage";

export interface IinsertItemCart {
	product: IProductSpring;
	quantity: number;
}

const ProductDetail = ({ product }: { product: IProductSpring }) => {
	const { handleButtonAdd } = useCartManage();

	return (
		<>
			<div>
				<SimpleBanner name={product.name} />
				<div className="product-detail__container wrapper">
					<img
						src={product.image}
						alt={product.name}
						className="product-detail__image"
					/>
					<div className="product-detail__content-cont">
						<h1>{product.name}</h1>
						<p>
							<span className="semi-bold">Price: </span> ${product.price}
						</p>
						<p>
							<span className="semi-bold">Category: </span>
							{product.category}
						</p>
						<p>
							<span className="semi-bold">Description: </span>
							{product.description}
						</p>

						<Button
							aria-label="Add to cart"
							className="semi-bold button-unfilled max-w-[10rem]"
							radius="none"
							onClick={() => {
								handleButtonAdd(product);
							}}
						>
							Add to cart
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetail;
