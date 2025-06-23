declare global {
	type WhatsAppProps = {
		isActive: boolean;
		inverted: boolean;
		position: string;
		phone: string;
		message: string;
	};

	type DepartmentItem = {
		title: string;
		imageUrl: string;
		link: {
			href: string;
			target?: string;
		};
	};

	type DepartamentListProps = {
		title: string;
		department: DepartmentItem[];
		slider: any;
	};

	type VitrinaProps = {
		title: string;
		backgroundImage: string;
		subTitle: string;
		children: React.ReactNode;
	};

	interface PLPListBadgesProps {
		slider: any;
	}

	type ProductPDP = {
		description?: string;
	};
}

export {};
