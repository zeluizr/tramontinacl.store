import { Icon } from "vtex.store-icons";

export default ({ id, size, activeClassName }: StoreIconProps) => {
	return <Icon id={id} size={size || 45} activeClassName={activeClassName} />;
};
