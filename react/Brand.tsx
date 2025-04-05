import classNames from "classnames";
import React from "react";
import { defineMessages } from "react-intl";
import { useCssHandles } from "vtex.css-handles";
import { useDevice } from "vtex.device-detector";

const CSS_HANDLES = ["logoFigure", "logoLink", "logoImage"] as const;

const Brand: React.FC<BrandProps> & { schema?: any } = ({
  altText,
  linkUrl,
  logoUrl,
  width,
  height,
  mobileWidth,
  mobileHeight,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const { isMobile } = useDevice();

  const resolvedWidth = isMobile ? mobileWidth || width : width;
  const resolvedHeight = isMobile ? mobileHeight || height : height;

  const imageClasses = classNames(
    handles.logoImage,
    "flex",
    { "w-auto": !resolvedWidth },
    { "h-auto": !resolvedHeight }
  );

  return (
    <figure className={classNames(handles.logoFigure, "flex")}>
      <a href={linkUrl} className={classNames(handles.logoLink, "flex")}>
        <img src={logoUrl} alt={altText} width={resolvedWidth} height={resolvedHeight} className={imageClasses} />
      </a>
    </figure>
  );
};

const messages = defineMessages({
  title: {
    id: "admin/editor.brand.title",
  },
  description: {
    id: "admin/editor.brand.description",
  },
  logoUrl: {
    id: "admin/editor.brand.logoUrl",
  },
  altText: {
    id: "admin/editor.brand.altText",
  },
  linkUrl: {
    id: "admin/editor.brand.linkUrl",
  },
  width: {
    id: "admin/editor.brand.width",
  },
  height: {
    id: "admin/editor.brand.height",
  },
  mobileWidth: {
    id: "admin/editor.brand.mobileWidth",
  },
  mobileHeight: {
    id: "admin/editor.brand.mobileHeight",
  },
});

Brand.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: "object",
  properties: {
    logoUrl: {
      title: messages.logoUrl.id,
      type: "string",
    },
    altText: {
      title: messages.altText.id,
      type: "string",
    },
    linkUrl: {
      title: messages.linkUrl.id,
      type: "string",
    },
    width: {
      title: messages.width.id,
      type: "number",
    },
    height: {
      title: messages.height.id,
      type: "number",
    },
    mobileWidth: {
      title: messages.mobileWidth.id,
      type: "number",
    },
    mobileHeight: {
      title: messages.mobileHeight.id,
      type: "number",
    },
  },
};

export default Brand;
