import { Icon } from "vtex.store-icons";

export default ({ inverted, size }: { inverted: boolean; size: number }) => {
	return <Icon id={inverted ? "icon-atendimento-online" : "icon-atendimento-online-narrow"} size={size || 45} />;
};
