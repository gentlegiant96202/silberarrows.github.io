import { PageHero, type Crumb } from "@/components/sections/PageHero";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

type ServiceReminderLegalPageProps = {
  title: string;
  intro: string;
  crumbs: Crumb[];
  breadcrumbItems: { name: string; href?: string }[];
  children: React.ReactNode;
};

/**
 * Shared shell for Chrome extension legal pages under /service-reminder/*.
 * Matches marketing-page chrome (PageHero + prose-blog) used elsewhere.
 */
export function ServiceReminderLegalPage({
  title,
  intro,
  crumbs,
  breadcrumbItems,
  children,
}: ServiceReminderLegalPageProps) {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <PageHero title={title} intro={intro} crumbs={crumbs} />
      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <article className="prose-blog mx-auto max-w-3xl">{children}</article>
        </div>
      </section>
    </>
  );
}
