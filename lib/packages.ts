export interface PackageInfo {
  slug: string;
  name: string;
  description: string;
  repoUrl: string;
  npmUrl: string;
  packageName: string;
}

export const packages: PackageInfo[] = [
  {
    slug: "otp",
    name: "OTP Input",
    description:
      "Customizable OTP input system with multi-field inputs, paste handling, keyboard navigation, and password masking.",
    repoUrl: "https://github.com/frjoy/frjoy",
    npmUrl: "https://www.npmjs.com/package/@frjoy/otp",
    packageName: "@frjoy/otp",
  },
];
