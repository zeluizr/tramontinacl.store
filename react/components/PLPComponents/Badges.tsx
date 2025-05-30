import classNames from "classnames";
import { useEffect, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { checkImageExists } from "../../utils/_checkImageExists";
import { slugify } from "../../utils/_slugify";
import "./styles.css";

const CSS_HANDLES = ["PLPBadgesContainer"] as const;

function PLPBadges() {
	const { handles } = useCssHandles(CSS_HANDLES);
	const { product } = useProduct() ?? {};
	const productId = product?.productId ?? "";
	const clusterHighlights = product?.clusterHighlights ?? [];

	const [validBadges, setValidBadges] = useState<{ image: string; url: string }[]>([]);

	useEffect(() => {
		const loadBadges = async () => {
			const extensions = ["jpg", "gif", "png", "webp"];
			const badgeUrls = await Promise.all(
				clusterHighlights.map(async ({ name }) => {
					const slug = slugify(name);
					const image = await checkImageExists(slug, extensions);
					return image ? { image } : null;
				})
			);
			setValidBadges(badgeUrls.filter((b): b is { image: string; url: string } => b !== null));
		};

		if (clusterHighlights.length > 0) loadBadges();
	}, [clusterHighlights]);

	if (validBadges.length === 0) return null;

	return (
		<div
			data-id={productId}
			className={classNames(
				handles.PLPBadgesContainer,
				"absolute top-1 right-1 z-1 flex flex-column items-center justify-center"
			)}
		>
			{validBadges.map(({ image }, idx) => (
				<img key={idx} src={image} alt={`Badge ${idx + 1}`} loading="lazy" width={55} height={55} className="br3" />
			))}
		</div>
	);
}

export default PLPBadges;
