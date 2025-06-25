import classNames from "classnames";
import { Icon } from "vtex.store-icons";

const GenericModal = ({
	title,
	onClose,
	handles,
	children,
}: PropsGenericModal) => {
	return (
		<div
			className={classNames(
				handles.ProductModalContenido,
				"fixed top-0 w-100 h-100 flex items-center justify-center z-999 bg-black-20 pa5"
			)}
			onClick={onClose}
		>
			<div
				className={classNames(
					handles.ProductModalContenidoBase,
					"bg-base w-100 h-100 h-75-ns mw8 br3 overflow-hidden pr5 pl5 pb5"
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<div
					className={classNames("flex justify-between items-center mt6 mb6")}
				>
					{title && <h2 className={classNames("mt0 mb0")}>{title}</h2>}
					<span className="pointer" onClick={onClose}>
						<Icon id="icon-xmark" size={16} />
					</span>
				</div>
				{children}
			</div>
		</div>
	);
};

export default GenericModal;
