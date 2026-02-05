import siteData from '@/content/site.json';
import homeData from '@/content/home.json';
import investmentsData from '@/content/investments.json';
import aboutData from '@/content/about.json';
import pagesData from '@/content/pages.json';
import teamData from '@/content/team.json';

// Static fallbacks for client-side and initial load
export const getSiteContent = () => siteData;
export const getHomeContent = () => homeData;
export const getInvestmentsContent = () => investmentsData;
export const getAboutContent = () => aboutData;
export const getPagesContent = () => pagesData;
export const getTeamContent = () => teamData;

// Dynamic fetchers for server components - fetch from blob with fallback to static
const BLOB_BASE_URL = process.env.BLOB_URL || process.env.NEXT_PUBLIC_BLOB_URL;

async function fetchContent<T>(file: string, fallback: T): Promise<T> {
  if (!BLOB_BASE_URL) return fallback;
  
  try {
    const response = await fetch(`${BLOB_BASE_URL}/content/${file}.json`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Fall back to static content
  }
  return fallback;
}

export const fetchSiteContent = () => fetchContent('site', siteData);
export const fetchHomeContent = () => fetchContent('home', homeData);
export const fetchInvestmentsContent = () => fetchContent('investments', investmentsData);
export const fetchAboutContent = () => fetchContent('about', aboutData);
export const fetchPagesContent = () => fetchContent('pages', pagesData);
export const fetchTeamContent = () => fetchContent('team', teamData);

export const getInvestmentBySlug = (slug: string) => {
  return investmentsData.items.find((item) => item.slug === slug);
};

export const getAllInvestmentSlugs = () => {
  return investmentsData.items.map((item) => item.slug);
};

export type SiteContent = typeof siteData;
export type HomeContent = typeof homeData;
export type InvestmentsContent = typeof investmentsData;
export type AboutContent = typeof aboutData;
export type PagesContent = typeof pagesData;
export type TeamContent = typeof teamData;
export type Investment = (typeof investmentsData.items)[number];
export type TeamMember = (typeof teamData.members)[number];
