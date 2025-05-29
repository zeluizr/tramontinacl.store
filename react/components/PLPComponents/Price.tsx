import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { getDiscountPercentage } from "../../utils/_getDiscountPercentage";
import { formatCLP } from "../../utils/_priceFormat";
import "./styles.css";

const CSS_HANDLES = ["PLPPriceContainer", "PLPPriceListPrice"] as const;

function PLPPrice() {
	const { handles } = useCssHandles(CSS_HANDLES);
	const productContext = useProduct();
	const product = productContext?.product?.items?.[0].sellers?.[0]?.commertialOffer;
	const listPrice = product?.ListPrice;
	const price = product?.Price;

	return (
		<section className={classNames(handles.PLPPriceContainer, "flex flex-column")}>
			{listPrice && (
				<p
					className={classNames(
						handles.PLPPriceListPrice,
						"flex-1 t-small c-muted-2 mt0 mb0 h2 flex items-center justify-center"
					)}
				>
					<s>{listPrice !== price && formatCLP(listPrice)}</s>
					{listPrice !== price && (
						<span className={classNames("bg-emphasis white br2 pa2 t-small")}>
							{listPrice !== undefined && price !== undefined ? getDiscountPercentage(listPrice, price) : null}
						</span>
					)}
				</p>
			)}
			{price && <p className={classNames("t-heading-3 c-action-primary mt0 mb0")}>{formatCLP(price)}</p>}
		</section>
	);
}

export default PLPPrice;
