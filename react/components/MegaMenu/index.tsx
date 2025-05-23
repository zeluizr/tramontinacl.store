import { useQuery } from "react-apollo";
import GET_MENUS from "./_query.graphql";

const MegaMenu = () => {
	const { data } = useQuery(GET_MENUS, {
		fetchPolicy: "no-cache",
		variables: {
			isMobile: false,
		},
	});

	return (
		<>
			<h1>Mega Menu</h1>
			<pre>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</>
	);
};

export default MegaMenu;
