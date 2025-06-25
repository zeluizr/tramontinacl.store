import classNames from "classnames";

export default function ModalContent({
	handles,
	contenido,
}: {
	handles: any;
	contenido: any;
}) {
	return (
		<div className={classNames(handles.ProductModalContenidoGrid)}>
			{contenido.map((content: any, idx: number) => (
				<div
					key={idx}
					className={classNames(
						handles.ProductModalContenidoAdditionalBox,
						"flex flex-column items-center bg-black-05 pa4 br2"
					)}
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
							"t-mini flex justify-center items-center mb2 b",
							handles.ProductModalContenidoGridProductName
						)}
					>
						{content.ProductName}
					</span>
					<span className="t-mini">Ref: {content.ProductCode}</span>
				</div>
			))}
		</div>
	);
}
