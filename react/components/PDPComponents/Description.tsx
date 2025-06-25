import classNames from "classnames";
import { useEffect, useState } from "react";

import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { Toggle } from "vtex.styleguide";

import { formatMeasure } from "../../utils/_formatMeasure";
import { formatWeight } from "../../utils/_formatWeight";

import GenericModal from "./_generic-modal";
import Icon from "./_icon";
import ModalContent from "./_modal-content";

import "./style.css";

const MAX_CHARACTERS = 300;
const CSS_HANDLES = [
	"ProductDescriptionContent",
	"ProductDetalle",
	"ProductDetalleButton",
	"ProductSizes",
	"ProductGridSizes",
	"ProductButtonContenido",
	"ProductModalContenido",
	"ProductModalContenidoBase",
	"ProductModalContenidoGrid",
	"ProductModalContenidoGridProductName",
	"ProductModalContenidoGridProductImage",
	"ProductModalContenidoAdditionalInfo",
	"ProductModalContenidoAdditionalBox",
] as const;

function ProductDescription() {
	const [showTechnical, setShowTechnical] = useState(false);
	const [showWarranty, setShowWarranty] = useState(false);
	const [showCert, setShowCert] = useState(false);
	const { handles } = useCssHandles(CSS_HANDLES);
	const productContext = useProduct();

	const [medida, setMedida] = useState(true);
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [showFullInfoTecnica, setShowFullInfoTecnica] = useState(false);
	const [showFullProductUse, setShowFullProductUse] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [sizes, setSizes] = useState<SizeProps>();
	const product: ProductPDP = productContext?.product || {};
	const properties = product?.properties;

	const warranty =
		properties.find((property: any) => property.name === "warranty")
			?.values?.[0] ?? null;
	const certification =
		properties.find((property: any) => property.name === "certification")
			?.values?.[0] ?? null;
	const tecnicalImage =
		properties.find((property: any) => property.name === "Imagem")
			?.values?.[0] ?? null;
	const contenidoRaw =
		properties.find((property: any) => property.name === "Contenido")
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

	console.log(properties);

	useEffect(() => {
		const fetchSizes = async () => {
			if (!product?.productId) return;

			try {
				const res = await fetch(`/_v/infoclient/${product.productId}`);
				const data: SizeProps = await res.json();

				setSizes(data);
			} catch (error) {
				console.error("Error fetching product sizes:", error);
			}
		};

		fetchSizes();
	}, [product]);

	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [showModal]);

	const productInfo = properties.find(
		(prop: any) => prop.name === "productInfo"
	);

	const productDescriptionSales = properties.find(
		(prop: any) => prop.name === "productDescriptionSales"
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
						{contenido.length !== 0 && (
							<button
								className={classNames(
									handles.ProductButtonContenido,
									"pa3 ma0 br2 mt5 bg-white lh-copy black-60 flex justify-between items-center"
								)}
								onClick={() => setShowModal(true)}
							>
								<span className={classNames("t-small b")}>Contenido</span>
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
					<div className={classNames("mt3")}>
						<p className={classNames("t-mini mb2 mt0 black")}>
							*Para produto unitário, estas especificações são referentes ao
							produto.
						</p>
						<p className={classNames("t-mini mt0 mb0 black")}>
							*Para conjunto, kit ou jogo, estas especificações são referentes à
							embalagem.
						</p>
					</div>
					<div>
						<h3>Información adicional</h3>
						<div
							className={classNames(
								handles.ProductModalContenidoAdditionalInfo,
								"pa5 br3"
							)}
						>
							{tecnicalImage && (
								<div className={classNames("bg-base pa4 br2")}>
									<div
										className="flex items-center justify-between cursor-pointer mb2"
										onClick={() => setShowTechnical(!showTechnical)}
									>
										<div className="flex items-center">
											<Icon
												id="icon-seal-check"
												size={18}
												activeClassName="c-action-primary"
											/>
											<span className="t-small black ml3">Diseño técnico</span>
										</div>
										<Icon
											id={showTechnical ? "mpa-minus--line" : "mpa-plus--line"}
											size={12}
										/>
									</div>
									{showTechnical && (
										<img src={tecnicalImage} alt="" width={500} height={500} />
									)}
								</div>
							)}
							{warranty && (
								<div className={classNames("bg-base pa4 br2")}>
									<div
										className="flex items-center justify-between cursor-pointer mb2"
										onClick={() => setShowWarranty(!showWarranty)}
									>
										<div className="flex items-center">
											<Icon
												id="icon-seal-check"
												size={18}
												activeClassName="c-action-primary"
											/>
											<span className="t-small black ml3">Garantía</span>
										</div>
										<Icon
											id={showWarranty ? "mpa-minus--line" : "mpa-plus--line"}
											size={12}
										/>
									</div>
									{showWarranty && (
										<div
											className="t-small"
											dangerouslySetInnerHTML={{ __html: warranty }}
										/>
									)}
								</div>
							)}
							{certification && (
								<div className={classNames("bg-base pa4 br2")}>
									<div
										className="flex items-center justify-between cursor-pointer mb2"
										onClick={() => setShowCert(!showCert)}
									>
										<div className="flex items-center">
											<Icon
												id="icon-certificate"
												size={18}
												activeClassName="c-action-primary"
											/>
											<span className="t-small black ml3">Certificación</span>
										</div>
										<Icon
											id={showCert ? "mpa-minus--line" : "mpa-plus--line"}
											size={12}
										/>
									</div>
									{showCert && (
										<div
											className="t-small"
											dangerouslySetInnerHTML={{ __html: certification }}
										/>
									)}
								</div>
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
					<ModalContent contenido={contenido} handles={handles} />
				</GenericModal>
			)}
		</>
	);
}

export default ProductDescription;
