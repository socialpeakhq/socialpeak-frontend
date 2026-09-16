import React from "react";
import FacebookIcon from "@/assets/accounts/facebook.svg";
import InstagramIcon from "@/assets/accounts/instagram.svg";

export const PLATFORM_ICON: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

export const PLATFORM_NAME: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
};
