import type { Metadata } from "next";
import ResumeView from "@/components/ResumeView";
import { resume } from "@/lib/resume";
import { pageMetadata, JsonLd, person, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: "Resume of Felix Dusengimana, software engineer in Kigali, Rwanda: Spring Boot, Java, TypeScript, React, PostgreSQL and Docker. Download as PDF, Word, Markdown or JSON.",
  path: "/resume",
  keywords: ["resume", "CV", "software engineer", "Spring Boot", "Java", "PostgreSQL", "hire software engineer Rwanda"],
});

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `${siteUrl}/resume`,
          dateModified: resume.updated,
          mainEntity: {
            ...person,
            jobTitle: resume.headline,
            email: `mailto:${resume.email}`,
            worksFor: resume.experience.filter((e) => !e.end).map((e) => ({ "@type": "Organization", name: e.company })),
            alumniOf: resume.education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
            knowsAbout: resume.expertise,
            knowsLanguage: resume.languages.map((l) => l.name),
            award: resume.awards.map((a) => `${a.title}, ${a.issuer}`),
          },
        }}
      />
      <ResumeView />
    </>
  );
}
