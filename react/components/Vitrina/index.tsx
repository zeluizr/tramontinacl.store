import SCHEMA from "./_schema";

function Vitrina({ children, isActive }: { children: React.ReactNode; isActive?: boolean }) {
	if (!isActive) return null;

	return <>{children}</>;
}

Vitrina.schema = SCHEMA;

export default Vitrina;
