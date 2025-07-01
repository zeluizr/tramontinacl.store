import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { truncateText } from "../../utils/_truncateText";

const CSS_HANDLES = ["ProductShortDescriptionContent", "ProductShortDescriptionLink"] as const;
const MAX_CHARACTERS = 200;

function ProductShortDescription() {
	const { handles } = useCssHandles(CSS_HANDLES);

	const productContext = useProduct();
	const product: ProductPDP = productContext?.product || {};

	const handleScroll = () => {
		const targetElement = document.getElementById("productShortDescription");
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className={classNames(handles.ProductShortDescriptionContent)}>
			<p className="lh-copy black-60 mt0 mb0">{truncateText(product?.description || "", MAX_CHARACTERS)}</p>
			<a className={classNames("underline t-small", handles.ProductShortDescriptionLink)} onClick={handleScroll}>
				Ver más detalles
			</a>
		</div>
	);
}

export default ProductShortDescription;
