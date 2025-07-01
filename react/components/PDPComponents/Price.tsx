import classNames from "classnames";
import { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { getDiscountPercentage } from "../../utils/_getDiscountPercentage";
import { formatCLP } from "../../utils/_priceFormat";
import "./style.css";

const CSS_HANDLES = [
	"PDPPriceContainer",
	"PDPPriceListPrice",
	"PDPPriceDiscount",
	"PDPPriceDiscountIcon",
] as const;

function PDPPrice() {
	const { handles } = useCssHandles(CSS_HANDLES);
	const productContext = useProduct();

	const { price, listPrice, discount } = useMemo(() => {
		const offer =
			productContext?.product?.items?.[0]?.sellers?.[0]?.commertialOffer;
		const price = offer?.Price;
		const listPrice = offer?.ListPrice;
		const discount =
			price !== undefined && listPrice !== undefined && price !== listPrice
				? getDiscountPercentage(listPrice, price)
				: null;

		return { price, listPrice, discount };
	}, [productContext]);

	if (price == null && listPrice == null) return null;

	return (
		<section className={handles.PDPPriceContainer}>
			{discount && (
				<span
					className={classNames(
						"bg-emphasis white br2 pa2 t-small inline-flex",
						handles.PDPPriceDiscount
					)}
				>
					<em className={classNames(handles.PDPPriceDiscountIcon)}></em>{" "}
					{discount} OFF
				</span>
			)}
			{listPrice !== undefined && price !== listPrice && (
				<p className={(handles.PDPPriceListPrice, "t-base c-muted-2 mt0 mb0")}>
					<s>{formatCLP(listPrice)}</s>
				</p>
			)}
			{price !== undefined && (
				<p className="t-heading-2 c-action-primary mt0 mb0">
					{formatCLP(price)}
				</p>
			)}
		</section>
	);
}

export default PDPPrice;
