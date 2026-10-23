export interface PackageInfo {
  slug: string;
  name: string;
  description: string;
  repoUrl: string;
  npmUrl: string;
  packageName: string;
  storybookUrl?: string;
}

export const packages: PackageInfo[] = [
  {
    slug: "otp",
    name: "OTP Input",
    description:
      "Headless, customizable OTP input for React with SMS autofill, paste handling, keyboard navigation, password masking and right-to-left support.",
    repoUrl: "https://github.com/frjoy/frjoy",
    npmUrl: "https://www.npmjs.com/package/@frjoy/otp",
    packageName: "@frjoy/otp",
    storybookUrl: "https://frjoy.github.io/",
  },
];
