declare global {
  type BrandProps = {
    logoUrl?: string;
    altText?: string;
    content?: string;
    linkUrl?: string;
    width?: number;
    height?: number;
    mobileWidth?: number;
    mobileHeight?: number;
  };

  interface PixelMessage extends MessageEvent {
    data:
      | ProductViewData
      | ProductClickData
      | OrderPlacedData
      | OrderPlacedTrackedData
      | PageViewData
      | ProductImpressionData
      | AddToCartData
      | RemoveToCartData
      | CartChangedData
      | HomePageInfo
      | ProductPageInfoData
      | SearchPageInfoData
      | UserData
      | CartIdData
      | PromoViewData
      | PromotionClickData
      | NewsletterSubscriptionData;
  }
}

export {};
