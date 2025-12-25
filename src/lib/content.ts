import siteData from '@/content/site.json';
import homeData from '@/content/home.json';
import investmentsData from '@/content/investments.json';
import aboutData from '@/content/about.json';
import pagesData from '@/content/pages.json';
import teamData from '@/content/team.json';

export const getSiteContent = () => siteData;
export const getHomeContent = () => homeData;
export const getInvestmentsContent = () => investmentsData;
export const getAboutContent = () => aboutData;
export const getPagesContent = () => pagesData;
export const getTeamContent = () => teamData;

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
