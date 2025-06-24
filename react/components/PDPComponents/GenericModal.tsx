import classNames from "classnames";
import { Icon } from "vtex.store-icons";

const GenericModal = ({
	title,
	onClose,
	children,
	handles,
}: PropsGenericModal) => {
	return (
		<div
			className={classNames(
				handles.ProductModalContenido,
				"fixed top-0 left-0 right-0 bottom-0 z-999 flex justify-center items-center bg-black-80 pa4"
			)}
		>
			<div className={classNames("bg-white w-100 mw7 pa4 br3")}>
				<div className={classNames("flex justify-between items-center")}>
					{title && <h2 className="t-heading-4 mb4">{title}</h2>}
					<span className="pointer" onClick={onClose}>
						<Icon id="icon-xmark" size={16} />
					</span>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default GenericModal;
