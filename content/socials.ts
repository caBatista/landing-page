import { site } from "./site";

export type Social = {
  id: "linkedin" | "github" | "instagram" | "email";
  label: string;
  handle: string;
  href: string;
};

export const socials: Social[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/ca-batista",
    href: "https://www.linkedin.com/in/ca-batista/",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "@caBatista",
    href: "https://github.com/caBatista",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@caiobaatista",
    href: "https://www.instagram.com/caiobaatista/",
  },
  {
    id: "email",
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
  },
];
