import { ElementType } from "react";

/**
 * Changes the body attribute
 */
type ToggleDocumentAttributeType = (
  attribute: string,
  value: string,
  remove?: boolean,
  tag?: ElementType,
) => void;

const toggleDocumentAttribute: ToggleDocumentAttributeType = (
  attribute,
  value,
  remove,
  tag = "html",
): void => {
  if (document.body) {
    const element = document.getElementsByTagName(tag.toString())[0];
    const hasAttribute = element.getAttribute(attribute);
    if (remove && hasAttribute) element.removeAttribute(attribute);
    else element.setAttribute(attribute, value);
  }
};

export { toggleDocumentAttribute };

export function changeFavicon(url: string) {
  let link: HTMLLinkElement | null =
    document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url;
}
