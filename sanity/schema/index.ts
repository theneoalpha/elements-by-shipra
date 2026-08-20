import { aboutSection } from "@/features/about/schema";
import { consultation } from "@/features/consultation/schema";
import { hero } from "@/features/hero/schema";
import { project } from "@/features/projects/schema";
import { promise } from "@/features/promises/schema";
import { service } from "@/features/services/schema";
import {
  testimonial,
  testimonialStats,
} from "@/features/testimonials/schema";
import { transformation } from "@/features/transformation/schema";
import { turnkeyProcess } from "@/features/turnkey/schema";

import { blogPost } from "./blog-post";
import { navigation } from "./navigation";
import { siteSettings } from "./site-settings";

export const schemaTypes = [
  siteSettings,
  navigation,
  hero,
  service,
  project,
  testimonial,
  testimonialStats,
  blogPost,
  promise,
  aboutSection,
  transformation,
  turnkeyProcess,
  consultation,
];
