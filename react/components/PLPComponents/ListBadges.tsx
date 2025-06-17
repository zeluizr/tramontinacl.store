import classNames from "classnames";
import { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { ListContextProvider, useListContext } from "vtex.list-context";
import { useProduct } from "vtex.product-context";
import { SliderLayout } from "vtex.slider-layout";
import { Icon } from "vtex.store-icons";
import { slugify } from "../../utils/_slugify";
import "./styles.css";

const CSS_HANDLES = ["PLPListBadgesContainer", "PLPListBadgesLink"] as const;

function PLPListBadges({ slider }: PLPListBadgesProps) {
	const { handles } = useCssHandles(CSS_HANDLES);
	const { product } = useProduct() ?? {};
	const listContext = useListContext();
	const list = listContext?.list ?? [];

	const validBadges = useMemo(() => {
		return (product?.clusterHighlights ?? []).map(({ name }) => ({
			name: name.toUpperCase(),
			key: slugify(name),
		}));
	}, [product]);

	const badgeElements = useMemo(() => {
		return validBadges.slice(0, 3).map(({ name, key }) => (
			<a
				key={key}
				className={classNames(
					"flex justify-center items-center w-100 c-action-primary",
					handles.PLPListBadgesLink
				)}
			>
				<Icon id={`icon-${key}`} size={13} />
				<span className="b t-mini">{name}</span>
			</a>
		));
	}, [validBadges, handles.PLPListBadgesLink]);

	const validBadgesList = [...list, ...badgeElements];

	return (
		<div
			className={classNames(handles.PLPListBadgesContainer, "flex pl3 pr3 h2")}
		>
			<ListContextProvider list={validBadgesList}>
				<SliderLayout {...slider} />
			</ListContextProvider>
		</div>
	);
}

export default PLPListBadges;
