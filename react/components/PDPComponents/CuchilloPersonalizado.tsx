import classNames from "classnames";
import { useEffect, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { Button } from "vtex.styleguide";
import Icon from "./_icon";
import "./style.css";

const CSS_HANDLES = [
	"containerCuchilloPersonalizado",
	"modalOverlay",
	"modalContent",
	"modalHeader",
	"modalBody",
	"modalFooter",
	"knifeImage",
	"formGrid",
	"inputGroup",
	"sizeButtons",
	"sizeButton",
	"sizeButtonActive",
	"termsSection",
	"importantNote",
] as const;

const CuchilloPersonalizado = () => {
	const { handles } = useCssHandles(CSS_HANDLES);
	const productContext = useProduct();
	const product: ProductPDP = productContext?.product || {};
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Estados para el formulario de personalización
	const [textoPrincipal, setTextoPrincipal] = useState("");
	const [textoSecundario, setTextoSecundario] = useState("");
	const [fonte, setFonte] = useState("");
	const [tamanhoTextoPrincipal, setTamanhoTextoPrincipal] = useState("P");
	const [tamanhoTextoSecundario, setTamanhoTextoSecundario] = useState("P");
	const [aceiteiTermos, setAceiteiTermos] = useState(false);

	// Función para cerrar el modal
	const closeModal = () => {
		setIsModalOpen(false);
		// Reset form
		setTextoPrincipal("");
		setTextoSecundario("");
		setFonte("");
		setTamanhoTextoPrincipal("P");
		setTamanhoTextoSecundario("P");
		setAceiteiTermos(false);
	};

	// Effect para cerrar modal con tecla ESC
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isModalOpen) {
				closeModal();
			}
		};

		if (isModalOpen) {
			document.addEventListener("keydown", handleKeyDown);
			// Previene scroll del body cuando modal está abierto
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "unset";
		};
	}, [isModalOpen]);

	// Función para abrir el modal basada en las props del Button
	const openModal = (
		options: {
			disabled?: boolean;
			isLoading?: boolean;
			onClick?: () => void;
			variation?: "primary" | "secondary" | "tertiary" | "inverted-tertiary" | "danger" | "danger-tertiary";
			size?: "small" | "regular" | "large";
			block?: boolean;
			noUpperCase?: boolean;
			testId?: string;
		} = {}
	) => {
		const {
			disabled = false,
			isLoading = false,
			onClick,
			variation = "primary",
			size = "regular",
			block = false,
			noUpperCase = false,
			testId = "modal-trigger",
		} = options;

		// Verifica si el botón está deshabilitado o cargando
		if (disabled || isLoading) {
			return;
		}

		// Ejecuta callback personalizado si es proporcionado
		if (onClick) {
			onClick();
		}

		// Abre el modal
		setIsModalOpen(true);

		console.log(`Modal abierto con configuraciones:
			variation: ${variation},
			size: ${size},
			block: ${block},
			testId: ${testId}`);
	};

	// Función para manejar click en el overlay
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	console.log("product", product);

	return (
		<>
			<div className={classNames("flex mb5", handles.containerCuchilloPersonalizado)}>
				<Button
					block
					onClick={() =>
						openModal({
							variation: "primary",
							size: "regular",
							block: true,
							testId: "cuchillo-personalizado-btn",
						})
					}
				>
					<span className={classNames("c-action-primary")}>Personalizar</span>
					<span className={classNames("c-action-primary")}>
						<Icon id="icon-cuchillo-personalizado" size={20} />
					</span>
				</Button>
			</div>

			{/* Modal usando clases de Tachyons */}
			{isModalOpen && (
				<div
					className={classNames(
						"fixed top-0 left-0 w-100 h-100 bg-black-50 z-999 flex items-center justify-center",
						handles.modalOverlay
					)}
					onClick={handleOverlayClick}
				>
					<div className={classNames("bg-white br3 shadow-4 w-95 w-80-ns mw7 relative pa0 ma3", handles.modalContent)}>
						{/* Header del Modal */}
						<div className={classNames("pa4 bb b--light-gray flex items-center justify-between", handles.modalHeader)}>
							<h2 className="ma0 f3 fw6 dark-gray">Personaliza tu cuchillo</h2>
							<Button variation="tertiary" size="small" onClick={closeModal} testId="close-modal-btn">
								×
							</Button>
						</div>

						{/* Body del Modal */}
						<div className={classNames("pa4", handles.modalBody)}>
							{/* Imagen del cuchillo */}
							<div className={classNames("tc mb4", handles.knifeImage)}>
								<div className="relative">
									{/* Cuchillo SVG */}
									<svg
										width="400"
										height="120"
										viewBox="0 0 400 120"
										className="w-100 mw6"
										style={{ maxWidth: "400px" }}
									>
										{/* Mango del cuchillo */}
										<rect
											x="20"
											y="45"
											width="80"
											height="30"
											rx="15"
											fill="#8B4513"
											stroke="#654321"
											strokeWidth="2"
										/>
										{/* Remaches */}
										<circle cx="35" cy="60" r="3" fill="#C0C0C0" />
										<circle cx="55" cy="60" r="3" fill="#C0C0C0" />
										<circle cx="75" cy="60" r="3" fill="#C0C0C0" />
										{/* Hoja */}
										<path d="M100 60 L380 60 L370 45 L100 45 Z" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1" />
										<path d="M100 60 L380 60 L370 75 L100 75 Z" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1" />
									</svg>

									{/* Área de preview del texto */}
									<div className="absolute top-50 left-50 transform-center">
										{textoPrincipal && (
											<div
												className="absolute"
												style={{
													top: "20px",
													left: "180px",
													fontSize:
														tamanhoTextoPrincipal === "P" ? "8px" : tamanhoTextoPrincipal === "M" ? "12px" : "16px",
													color: "#666",
													fontWeight: "bold",
												}}
											>
												{textoPrincipal}
											</div>
										)}
										{textoSecundario && (
											<div
												className="absolute"
												style={{
													top: "35px",
													left: "180px",
													fontSize:
														tamanhoTextoSecundario === "P" ? "6px" : tamanhoTextoSecundario === "M" ? "10px" : "14px",
													color: "#666",
												}}
											>
												{textoSecundario}
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Grid del formulario */}
							<div className={classNames("grid", handles.formGrid)}>
								{/* Texto Principal */}
								<div className={classNames("mb3", handles.inputGroup)}>
									<label className="db mb2 fw6 dark-gray f6">Texto principal</label>
									<input
										type="text"
										value={textoPrincipal}
										onChange={(e) => setTextoPrincipal(e.target.value)}
										className="w-100 pa3 ba b--light-gray br2 f6"
										placeholder="0/20"
										maxLength={20}
									/>
									<div className="tr mt1 f7 gray">{textoPrincipal.length}/20</div>
								</div>

								{/* Texto Secundario */}
								<div className={classNames("mb3", handles.inputGroup)}>
									<label className="db mb2 fw6 dark-gray f6">Texto secundario (opcional)</label>
									<input
										type="text"
										value={textoSecundario}
										onChange={(e) => setTextoSecundario(e.target.value)}
										className="w-100 pa3 ba b--light-gray br2 f6"
										placeholder="0/20"
										maxLength={20}
									/>
									<div className="tr mt1 f7 gray">{textoSecundario.length}/20</div>
								</div>

								{/* Fuente */}
								<div className={classNames("mb3", handles.inputGroup)}>
									<label className="db mb2 fw6 dark-gray f6">Fuente</label>
									<select
										value={fonte}
										onChange={(e) => setFonte(e.target.value)}
										className="w-100 pa3 ba b--light-gray br2 f6"
									>
										<option value="">Seleccionar</option>
										<option value="arial">Arial</option>
										<option value="times">Times New Roman</option>
										<option value="helvetica">Helvetica</option>
									</select>
								</div>

								{/* Tamaño del texto principal */}
								<div className={classNames("mb3", handles.inputGroup)}>
									<label className="db mb2 fw6 dark-gray f6">Tamaño del texto principal</label>
									<div className={classNames("flex gap2", handles.sizeButtons)}>
										{["P", "M", "G"].map((size) => (
											<button
												key={size}
												onClick={() => setTamanhoTextoPrincipal(size)}
												className={classNames(
													"pa2 ba br2 f6 fw6 pointer",
													tamanhoTextoPrincipal === size
														? "bg-blue white b--blue"
														: "bg-white dark-gray b--light-gray hover-bg-light-gray",
													handles.sizeButton,
													tamanhoTextoPrincipal === size && handles.sizeButtonActive
												)}
											>
												{size}
											</button>
										))}
									</div>
								</div>

								{/* Tamaño del texto secundario */}
								<div className={classNames("mb3", handles.inputGroup)}>
									<label className="db mb2 fw6 dark-gray f6">Tamaño del texto secundario</label>
									<div className={classNames("flex gap2", handles.sizeButtons)}>
										{["P", "M", "G"].map((size) => (
											<button
												key={size}
												onClick={() => setTamanhoTextoSecundario(size)}
												className={classNames(
													"pa2 ba br2 f6 fw6 pointer",
													tamanhoTextoSecundario === size
														? "bg-blue white b--blue"
														: "bg-white dark-gray b--light-gray hover-bg-light-gray",
													handles.sizeButton,
													tamanhoTextoSecundario === size && handles.sizeButtonActive
												)}
											>
												{size}
											</button>
										))}
									</div>
								</div>

								{/* Nota importante */}
								<div className={classNames("mb3 pa3 bg-light-yellow br2", handles.importantNote)}>
									<h4 className="ma0 mb2 f6 fw6">Importante:</h4>
									<p className="ma0 f7 lh-copy">
										Los patrones de color en el grabado pueden variar según el producto y su uso
									</p>
								</div>
							</div>

							{/* Termos e Condições */}
							<div className={classNames("mt4", handles.termsSection)}>
								<h4 className="ma0 mb3 f5 fw6 dark-gray">Términos y Condiciones</h4>
								<p className="ma0 mb3 f6 lh-copy gray">
									El producto y la personalización (fuente y texto) serán elegidos únicamente por el consumidor,
									quedando consciente de que no habrá posibilidad de cambio o arrepentimiento por tratarse de un
									producto personalizado.
								</p>

								<label className="flex items-start mb3 pointer">
									<input
										type="checkbox"
										checked={aceiteiTermos}
										onChange={(e) => setAceiteiTermos(e.target.checked)}
										className="mr2 mt1"
									/>
									<span className="f6 lh-copy">Leí y estoy consciente de toda la información</span>
								</label>
							</div>
						</div>

						{/* Footer del Modal */}
						<div className={classNames("pa4 bt b--light-gray", handles.modalFooter)}>
							<Button
								variation="primary"
								size="large"
								block
								disabled={!aceiteiTermos || !textoPrincipal.trim()}
								onClick={() => {
									// Lógica para comprar ahora
									console.log("Personalización:", {
										textoPrincipal,
										textoSecundario,
										fonte,
										tamanhoTextoPrincipal,
										tamanhoTextoSecundario,
									});
									closeModal();
								}}
								testId="buy-now-btn"
							>
								<span className="flex items-center justify-center">
									<Icon id="icon-cart" size={16} />
									<span className="ml2">COMPRAR AHORA</span>
								</span>
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CuchilloPersonalizado;
