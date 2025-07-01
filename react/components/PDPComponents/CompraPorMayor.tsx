import classNames from "classnames";
import { defineMessages } from "react-intl";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { Button } from "vtex.styleguide";
import Icon from "./_icon";
import "./style.css";

const CSS_HANDLES = ["containerBuyButtonMayo"];

const BuyButton = ({ idCollection, textoButton }: { idCollection: number; textoButton: string }) => {
	const { handles } = useCssHandles(CSS_HANDLES);
	const productContext = useProduct();
	const product: ProductPDP = productContext?.product || {};
	const { productClusters = [] } = product;
	const existCollection = productClusters.some((item) => Number(item.id) === idCollection);

	if (!idCollection || !textoButton) return <div className={classNames("w-100 flex flex-1 mt-10 mb-10")} />;
	if (!existCollection) return <div className={classNames("w-100 flex flex-1 mt-10 mb-10")} />;

	return (
		<div className={classNames("flex", handles.containerBuyButtonMayo)}>
			<Button block href={`/checkout/cart/add?sku=${product.productId}&qty=6&seller=1&redirect=true&sc=1`}>
				<span>{textoButton}</span>
				<Icon id="icon-compra-por-mayor" size={20} />
			</Button>
		</div>
	);
};

const messages = defineMessages({
	title: {
		defaultMessage: "BuyButton",
	},
	description: {
		defaultMessage: "BuyButton",
	},
});

BuyButton.schema = {
	title: messages.title.defaultMessage,
	description: messages.description.defaultMessage,
	type: "object",
	properties: {
		idCollection: {
			title: "ID Collection",
			type: "number",
		},
		textoButton: {
			title: "Texto Button",
			type: "string",
		},
	},
};

export default BuyButton;
