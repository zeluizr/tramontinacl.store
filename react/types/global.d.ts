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
}

export {};
