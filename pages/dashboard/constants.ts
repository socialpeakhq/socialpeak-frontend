import React from "react";
import InstagramIcon from "@/assets/accounts/instagram.svg";
import FacebookIcon from "@/assets/accounts/facebook.svg";

type Platform = {
  id: number;
  label: string;
  platform: string;
  parentPlatform: string;
  icon: React.ReactNode;
};

export const MAIN_PLATFORMS: Platform[] = [
  {
    id: 1,
    label: "Facebook",
    platform: "facebook",
    parentPlatform: "meta",
    icon: React.createElement(FacebookIcon),
  },
  {
    id: 2,
    label: "Instagram",
    platform: "instagram",
    parentPlatform: "meta",
    icon: React.createElement(InstagramIcon),
  },
];
