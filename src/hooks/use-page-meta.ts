import { useEffect } from "react";

const SITE_URL = "https://www.suryani-lestari.my.id";

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

const setMetaContent = (selector: string, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
};

const setNamedMeta = (name: string, content: string) => {
  setMetaContent(`meta[name="${name}"]`, content);
};

const setOgMeta = (property: string, content: string) => {
  setMetaContent(`meta[property="${property}"]`, content);
};

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
};

export const usePageMeta = ({ title, description, path }: PageMeta) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setNamedMeta("description", description);
    setOgMeta("og:title", title);
    setOgMeta("og:description", description);
    setOgMeta("og:url", url);
    setNamedMeta("twitter:title", title);
    setNamedMeta("twitter:description", description);
    setCanonical(url);
  }, [title, description, path]);
};
