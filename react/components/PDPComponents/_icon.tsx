import { Icon } from "vtex.store-icons";

export default ({ id, size }: { id: string; size: number }) => {
	return <Icon id={id} size={size || 45} />;
};
