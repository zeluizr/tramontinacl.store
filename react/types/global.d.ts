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
		productId?: string;
		description?: string;
		items?: Array<{
			images: Array<{
				imageUrl: string;
			}>;
		}>;
		properties?: any;
		description?: string;
		productClusters?: Array<{
			id: string;
		}>;
	};

	type PropsGenericModal = {
		title?: string;
		onClose: () => void;
		children: React.ReactNode;
		handles?: any;
	};

	type StoreIconProps = {
		id: string;
		size: number;
		activeClassName?: string;
	};

	type SizeProps = {
		PackagedHeight?: number;
		PackagedLength?: number;
		PackagedWidth?: number;
		PackagedWeightKg?: number;
		Height?: number;
		Length?: number;
		Width?: number;
		WeightKg?: number;
	};

	type CountDownProps = {
		endDate: string;
		isActive: boolean;
	};

	type TimeRemaining = {
		total: number;
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	};

	type CountDownBoxProps = { timeRemaining: number; stringText?: string };

	interface TimeRemaining {
		total: number;
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	}

	interface FormatTime {
		(time: number): string;
	}
}

export {};
