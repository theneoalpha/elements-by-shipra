import { siteConfig } from "@/config/site";

export const WHATSAPP_PHONE = siteConfig.phone.replace(/\s/g, "").replace("+", "");

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi, I'm interested in your interior design services. I'd like to know more.";
