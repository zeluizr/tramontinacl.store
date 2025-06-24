import classNames from "classnames";
import { useEffect, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { Toggle } from "vtex.styleguide";
import { formatMeasure } from "../../utils/_formatMeasure";
import { formatWeight } from "../../utils/_formatWeight";
import Icon from "./_icon";
import GenericModal from "./GenericModal";
import "./style.css";

const CSS_HANDLES = [
	"ProductDescriptionContent",
	"ProductDetalle",
	"ProductDetalleButton",
	"ProductSizes",
	"ProductGridSizes",
	"ProductButtonContenido",
	"ProductModalContenido",
	"ProductModalContenidoContent",
	"ProductModalContenidoGrid",
	"ProductModalContenidoGridProductName",
	"ProductModalContenidoGridProductImage",
	"ProductModalContenidoAdditionalInfo",
] as const;

const MAX_CHARACTERS = 300;

function ProductDescription() {
	const [medida, setMedida] = useState(true);
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [showFullInfoTecnica, setShowFullInfoTecnica] = useState(false);
	const [showFullProductUse, setShowFullProductUse] = useState(false);
	const [showModal, setShowModal] = useState(false);
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

	const warranty =
		product?.properties.find((property: any) => property.name === "warranty")
			?.values?.[0] ?? null;

	const contenidoRaw =
		product?.properties.find((property: any) => property.name === "Contenido")
			?.values?.[0] ?? null;

	let contenido: Array<any> = [];
	try {
		if (contenidoRaw) {
			contenido = JSON.parse(contenidoRaw);
		}
	} catch (e) {
		console.error("Error parsing contenido JSON", e);
		contenido = [];
	}

	useEffect(() => {
		const fetchSizes = async () => {
			if (!product?.productId) return;

			try {
				const res = await fetch(`/_v/infoclient/${product.productId}`);
				const data: {
					PackagedHeight?: number;
					PackagedLength?: number;
					PackagedWidth?: number;
					PackagedWeightKg?: number;
					Height?: number;
					Length?: number;
					Width?: number;
					WeightKg?: number;
				} = await res.json();

				setSizes(data);
			} catch (error) {
				console.error("Error fetching product sizes:", error);
			}
		};

		fetchSizes();
	}, [product]);

	const productInfo = product.properties.find(
		(property: any) => property.name === "productInfo"
	);

	const productDescriptionSales = product.properties.find(
		(property: any) => property.name === "productDescriptionSales"
	);

	const [productUse] = productInfo?.values || [""];
	const [infoTecnica] = productDescriptionSales?.values || [""];

	return (
		<>
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

					<div>
						{contenido && (
							<button
								className={classNames(
									handles.ProductButtonContenido,
									"pa3 ma0 br2 mt5 bg-white lh-copy black-60 flex justify-between items-center"
								)}
								onClick={() => setShowModal(true)}
							>
								<span className={classNames("t-small")}>Contenido</span>
								<Icon size={24} id="icon-box-check" />
							</button>
						)}
					</div>

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
						className={classNames(
							"flex flex-column mt5 pa5",
							handles.ProductSizes
						)}
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
					<div className={classNames("pl5 pr5 mt3")}>
						<p className={classNames("t-mini mb2 mt0 black")}>
							*Para produto unitário, estas especificações são referentes ao
							produto.
						</p>
						<p className={classNames("t-mini mt0 mb0 black")}>
							*Para conjunto, kit ou jogo, estas especificações são referentes à
							embalagem.
						</p>
					</div>
					<div className={classNames("")}>
						<h3>Información adicional</h3>
						<div
							className={classNames(
								handles.ProductModalContenidoAdditionalInfo
							)}
						>
							{warranty && (
								<p className="t-small mb2">
									<strong>Garantía: </strong>
									{warranty}
								</p>
							)}
						</div>
					</div>
				</div>
			</section>
			{showModal && (
				<GenericModal
					title="Contenido"
					onClose={() => setShowModal(false)}
					handles={handles}
				>
					<div className={classNames(handles.ProductModalContenidoGrid)}>
						{contenido.map((content, idx) => (
							<div
								key={idx}
								className="flex flex-column items-center bg-black-05 pa4 br2"
							>
								<span className="t-mini">{content.Quantity} Unidad(s)</span>
								<figure
									className={classNames(
										"flex ma0",
										handles.ProductModalContenidoGridProductImage
									)}
								>
									<img src={content.FileURL} alt={content.ProductName} />
								</figure>
								<span
									className={classNames(
										"t-mini flex justify-center items-center",
										handles.ProductModalContenidoGridProductName
									)}
								>
									{content.ProductName}
								</span>
								<span className="t-mini">Ref: {content.ProductCode}</span>
							</div>
						))}
					</div>
				</GenericModal>
			)}
		</>
	);
}

export default ProductDescription;
