import type { Metadata } from "next";
import { pageMetadata, JsonLd, siteUrl, person } from "@/lib/seo";

const description =
  "@frjoy/otp: headless, customizable OTP input for React with SMS autofill, paste handling, keyboard navigation and RTL support. Docs and live demos.";

export const metadata: Metadata = pageMetadata({
  title: "@frjoy/otp: React OTP Input",
  description,
  path: "/packages/otp",
  image: { url: `${siteUrl}/og/otp.png`, width: 1200, height: 630, alt: "@frjoy/otp, headless OTP input for React" },
  keywords: [
    "@frjoy/otp",
    "React OTP input",
    "OTP component React",
    "one-time password input",
    "verification code input",
    "PIN input React",
    "SMS autofill",
    "one-time-code",
    "headless React component",
    "TypeScript",
  ],
});

export default function OtpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: "@frjoy/otp",
          description,
          url: `${siteUrl}/packages/otp`,
          codeRepository: "https://github.com/frjoy/frjoy",
          programmingLanguage: ["TypeScript", "React"],
          runtimePlatform: "React 18+",
          license: "https://opensource.org/licenses/MIT",
          author: person,
        }}
      />
      {children}
    </>
  );
}
