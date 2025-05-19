declare global {
  type PLPPriceProps = {
    discount: number;
  };

  type PDPPriceProps = {
    discount: number;
  };

  type BrandProps = {
    logoUrl?: string;
    altText?: string;
    linkUrl?: string;
    width?: number;
    height?: number;
    mobileWidth?: number;
    mobileHeight?: number;
  };

  interface LinkProps {
    href: string;
    target?: "_blank" | "_self";
  }

  interface DepartmentItem {
    __editorItemTitle?: string;
    title: string;
    imageUrl: string;
    link: LinkProps;
  }

  interface DepartmentProps {
    title: string;
    department: DepartmentItem[];
    slider?: SliderLayoutProps;
  }

  interface Category {
    id: number;
    name: string;
    url: string;
    hasChildren: boolean;
    children: Category[];
  }
}

export {};
