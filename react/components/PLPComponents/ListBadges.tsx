import classNames from "classnames";
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
	const { list } = useListContext() || [];

	const clusterHighlights = product?.clusterHighlights ?? [];

	const validBadges = clusterHighlights.map(({ name }) => {
		return { name: name.toUpperCase(), key: slugify(name) };
	});

	const validBadgesList = [
		...list,
		...validBadges?.map(({ name, key }) => {
			return (
				<a
					key={key}
					className={classNames(
						"flex justify-center items-center w-100",
						handles.PLPListBadgesLink,
						`c-action-${Math.floor(Math.random() * 10)}`
					)}
				>
					<Icon id={`icon-${key}`} size={13} />
					<span className={classNames("b t-mini")}>{name}</span>
				</a>
			);
		}),
	];

	return (
		<div
			className={classNames(
				handles.PLPListBadgesContainer,
				"flex pt5 pb0 pl3 pr3"
			)}
		>
			<ListContextProvider list={validBadgesList}>
				<SliderLayout {...slider} />
			</ListContextProvider>
		</div>
	);
}

export default PLPListBadges;
