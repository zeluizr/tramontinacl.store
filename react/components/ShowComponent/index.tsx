import SCHEMA from "./_schema";

function ShowCompontent({ children, isActive }: { children: React.ReactNode; isActive?: boolean }) {
	if (!isActive) return null;

	return <>{children}</>;
}

ShowCompontent.schema = SCHEMA;

export default ShowCompontent;
