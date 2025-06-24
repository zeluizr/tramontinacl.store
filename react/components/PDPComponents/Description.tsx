import classNames from "classnames";
import { useEffect, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { Toggle } from "vtex.styleguide";

const CSS_HANDLES = [
	"ProductDescriptionContent",
	"ProductDetalle",
	"ProductDetalleButton",
	"ProductSizes",
	"ProductGridSizes",
];
const MAX_CHARACTERS = 300;

function ProductDescription() {
	const [medida, setMedida] = useState(true);
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [showFullInfoTecnica, setShowFullInfoTecnica] = useState(false);
	const [showFullProductUse, setShowFullProductUse] = useState(false);
	const [sizes, setSizes] = useState<{
		PackagedHeight?: number;
		PackagedLength?: number;
		PackagedWidth?: number;
		PackagedWeightKg?: number;
		Height?: number;
		Length?: number;
		Width?: number;
		WeightKg?: number;
	}>();
	const { handles } = useCssHandles(CSS_HANDLES);
	const productContext = useProduct();

	const product: ProductPDP = productContext?.product || {};

	useEffect(() => {
		if (!product?.productId) return;

		fetch(`/api/catalog/pvt/stockkeepingunit/${product.productId}`)
			.then((res) => res.json())
			.then((data) => {
				const {
					PackagedHeight,
					PackagedLength,
					PackagedWidth,
					PackagedWeightKg,
					Height,
					Length,
					Width,
					WeightKg,
				} = data;

				setSizes({
					PackagedHeight,
					PackagedLength,
					PackagedWidth,
					PackagedWeightKg,
					Height,
					Length,
					Width,
					WeightKg,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}, [product]);

	const formatMeasure = (value: any) => {
		return value > 0 ? `${Math.round(value)} cm` : "N/A";
	};

	const formatWeight = (value: any) => {
		if (value >= 1000) {
			return value > 0 ? `${Math.round(value / 1000)} kg` : "N/A";
		}

		return value > 0 ? `${Math.round(value)} g` : "N/A";
	};

	const productInfo = product.properties.find(
		(property: any) => property.name === "productInfo"
	);

	const productDescriptionSales = product.properties.find(
		(property: any) => property.name === "productDescriptionSales"
	);

	const [productUse] = productInfo?.values || [""];
	const [infoTecnica] = productDescriptionSales?.values || [""];

	return (
		<section
			className={classNames(handles.ProductDescriptionContent)}
			id="productShortDescription"
		>
			<div className={classNames(handles.ProductDetalle)}>
				<h3>Detalle del producto</h3>
				<p
					className="pa0 ma0 lh-copy black-60"
					dangerouslySetInnerHTML={{
						__html: showFullDescription
							? product.description || ""
							: `${(product.description || "").substring(
									0,
									MAX_CHARACTERS
							  )}...`,
					}}
				/>
				<button
					className={classNames(handles.ProductDetalleButton, "t-small")}
					onClick={() => setShowFullDescription(!showFullDescription)}
				>
					{showFullDescription ? "Ver menos" : "Ver mais"}
				</button>

				<h3>Informacion Tecnica</h3>
				<p
					className="pa0 ma0 lh-copy black-60"
					dangerouslySetInnerHTML={{
						__html: showFullInfoTecnica
							? infoTecnica
							: `${infoTecnica.substring(0, MAX_CHARACTERS)}...`,
					}}
				/>
				<button
					className={classNames(handles.ProductDetalleButton, "t-small")}
					onClick={() => setShowFullInfoTecnica(!showFullInfoTecnica)}
				>
					{showFullInfoTecnica ? "Ver menos" : "Ver mais"}
				</button>

				{productUse && (
					<>
						<h3>Recomendación de Uso</h3>
						<p
							className="pa0 ma0 lh-copy black-60"
							dangerouslySetInnerHTML={{
								__html: showFullProductUse
									? productUse
									: `${productUse.substring(0, MAX_CHARACTERS)}...`,
							}}
						/>
						<button
							className={classNames(handles.ProductDetalleButton, "t-small")}
							onClick={() => setShowFullProductUse(!showFullProductUse)}
						>
							{showFullProductUse ? "Ver menos" : "Ver mais"}
						</button>
					</>
				)}
			</div>

			<div className="flex flex-column">
				<h3>Medidas</h3>
				<span className="flex items-center justify-end">
					<Toggle
						label={medida ? "Medidas con embalaje" : "Medidas sin embalaje"}
						checked={medida}
						id="toggle-pdp"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setMedida(e.target.checked)
						}
					/>
				</span>
				<section
					className={classNames("flex flex-column", handles.ProductSizes)}
				>
					<div className={classNames("flex w-100", handles.ProductGridSizes)}>
						<div
							className={classNames(
								"bg-white black pa4 flex items-center justify-between br3"
							)}
						>
							<span className="t-small">Alto</span>
							<strong>
								{medida
									? formatMeasure(sizes?.PackagedHeight)
									: formatMeasure(sizes?.Height)}
							</strong>
						</div>
						<div
							className={classNames(
								"bg-white black pa4 flex items-center justify-between br3"
							)}
						>
							<span className="t-small">Ancho</span>
							<strong>
								{medida
									? formatMeasure(sizes?.PackagedWidth)
									: formatMeasure(sizes?.Width)}
							</strong>
						</div>
						<div
							className={classNames(
								"bg-white black pa4 flex items-center justify-between br3"
							)}
						>
							<span className="t-small">Largo</span>
							<strong>
								{medida
									? formatMeasure(sizes?.PackagedLength)
									: formatMeasure(sizes?.Length)}
							</strong>
						</div>
						<div
							className={classNames(
								"bg-white black pa4 flex items-center justify-between br3"
							)}
						>
							<span className="t-small">Peso</span>
							<strong>
								{medida
									? formatWeight(sizes?.PackagedWeightKg)
									: formatWeight(sizes?.WeightKg)}
							</strong>
						</div>
					</div>
					<figure className="flex justify-center items-center bg-white w-100 br3 ma0 mt4">
						<img
							src={product.items?.[0]?.images?.[0]?.imageUrl || ""}
							alt=""
							height={200}
							width={200}
						/>
					</figure>
				</section>
			</div>
		</section>
	);
}

export default ProductDescription;
