import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { truncateText } from "../../utils/_truncateText";

const CSS_HANDLES = [
	"ProductShortDescriptionContent",
	"ProductShortDescriptionLink",
] as const;
const MAX_CHARACTERS = 250;

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
		<p
			className={classNames(
				handles.ProductShortDescriptionContent,
				"c-on-muted-3 hover-c-on-muted-3 active-c-on-muted-3 lh-copy",
				"mt0 mb0"
			)}
		>
			{truncateText(product?.description || "", MAX_CHARACTERS)}{" "}
			<span
				className={classNames("underline", handles.ProductShortDescriptionLink)}
				onClick={handleScroll}
			>
				Ver más detalles
			</span>
		</p>
	);
}

export default ProductShortDescription;
