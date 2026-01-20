// API utility functions
export const API_BASE_URL = 'https://testweb.adventzeventz.com/api/v1';
const API_DOMAIN = 'https://testweb.adventzeventz.com';
const USE_PROXY = typeof window !== 'undefined'; // Use proxy in browser, direct in server

function getApiUrl(endpoint: string): string {
  if (USE_PROXY) {
    // Client-side: use Next.js API routes to avoid CORS
    return `/api${endpoint}`;
  }
  // Server-side: call API directly
  return `${API_BASE_URL}${endpoint}`;
}

export interface Locale {
  id: number;
  locale: string;
  full_name: string;
  name: string;
  rtl: number;
  is_default: number;
  is_active: number;
  sort: number;
}

export interface PageSection {
  id: number;
  page_section_name: string;
  page_section_status: number;
  section_sort: number;
  section: {
    id: number;
    section_for: string;
    section: string;
    image: string;
    template: string;
    type: string;
  };
  block?: {
    id: number;
    t_1?: string | null;
    t_2?: string | null;
    t_3?: string | null;
    t_4?: string | null;
    t_5?: string | null;
    t_6?: string | null;
    t_7?: string | null;
    t_8?: string | null;
    t_9?: string | null;
    t_10?: string | null;
    i_1?: string | null;
    i_2?: string | null;
    i_3?: string | null;
    i_4?: string | null;
    i_5?: string | null;
    i_6?: string | null;
    f_1?: string | null;
    f_2?: string | null;
    f_3?: string | null;
    c_1?: string;
    c_2?: string;
    c_3?: string;
    c_4?: string;
    c_5?: string;
    c_6?: string;
    c_7?: string;
    c_8?: string;
    c_9?: string;
    c_10?: string;
    c_11?: string;
    c_12?: string;
    [key: string]: any;
  };
  list?: Array<{
    id: number;
    t_1?: string | null;
    t_2?: string | null;
    t_3?: string | null;
    t_4?: string | null;
    t_5?: string | null;
    i_1?: string | null;
    i_2?: string | null;
    i_3?: string | null;
    f_1?: string | null;
    f_2?: string | null;
    c_1?: string;
    c_2?: string;
    c_3?: string;
    c_4?: string;
    c_5?: string;
    c_6?: string;
    c_7?: string;
    c_8?: string;
    c_9?: string;
    c_10?: string;
    sort?: string;
    template?: string;
    [key: string]: any;
  }>;
}

export interface PageData {
  id: number;
  name: string;
  slug: string;
  title: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  template: string;
  published: number;
  sections: PageSection[];
}

export interface PageResponse {
  status: number;
  data: PageData;
  message: string;
}

export interface LocalesResponse {
  status?: number;
  data?: Locale[];
  message?: string;
}

export interface MenuItem {
  id: number;
  title: string;
  url: string | null;
  target: string;
  sort: number;
  page_id: number | null;
  parent_id: number | null;
  menu_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  children?: MenuItem[];
}

export interface Menu {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  items: MenuItem[];
}

export interface MenusResponse {
  status: number;
  data: {
    menu1?: Menu;
    menu2?: Menu[];
    menu3?: Menu[];
    menu4?: Menu[];
    menu5?: Menu[];
    menu6?: Menu[];
    menu7?: Menu[];
    menu8?: Menu[];
  };
  message: string;
}

/**
 * Fetch all active locales
 */
export async function fetchLocales(): Promise<Locale[]> {
  try {
    const response = await fetch(getApiUrl('/locales'), {
      cache: 'no-store', // Don't cache to avoid conflicts
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch locales: ${response.status} ${response.statusText}`);
      throw new Error('Failed to fetch locales');
    }

    const data: Locale[] | LocalesResponse = await response.json();
    
    // Handle both array response and object response
    const locales = Array.isArray(data) ? data : (data.data || []);
    
    // Filter active locales and sort by sort field
    return locales
      .filter((locale) => locale.is_active === 1)
      .sort((a, b) => a.sort - b.sort);
  } catch (error) {
    console.error('Error fetching locales:', error);
    // Return default English and Arabic locales as fallback
    return [
      {
        id: 1,
        locale: 'en',
        full_name: 'English',
        name: 'EN',
        rtl: 0,
        is_default: 1,
        is_active: 1,
        sort: 1,
      },
      {
        id: 2,
        locale: 'ar',
        full_name: 'Arabic',
        name: 'AR',
        rtl: 1,
        is_default: 0,
        is_active: 1,
        sort: 2,
      },
    ];
  }
}

/**
 * Get the default locale
 */
export async function getDefaultLocale(): Promise<Locale> {
  const locales = await fetchLocales();
  const defaultLocale = locales.find((l) => l.is_default === 1);
  return defaultLocale || locales[0];
}

/**
 * Fetch page data by language and slug
 */
export async function fetchPageData(
  lang: string,
  slug: string
): Promise<PageData | null> {
  try {
    const response = await fetch(getApiUrl(`/page/${lang}/${slug}`), {
      cache: 'no-store', // Don't cache to avoid conflicts
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Page not found: ${lang}/${slug}`);
        return null;
      }
      console.error(`Failed to fetch page data: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch page data: ${response.statusText}`);
    }

    const result: PageResponse = await response.json();

    if (result.status !== 1 || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}

/**
 * Check if a locale code is valid
 */
export async function isValidLocale(locale: string): Promise<boolean> {
  const locales = await fetchLocales();
  return locales.some((l) => l.locale === locale);
}

/**
 * Fetch all available page slugs
 */
export async function fetchPages(): Promise<string[]> {
  try {
    const response = await fetch(getApiUrl('/pages'), {
      cache: 'no-store', // Don't cache to avoid conflicts
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch pages: ${response.status} ${response.statusText}`);
      throw new Error('Failed to fetch pages');
    }

    const result = await response.json();

    if (result.status !== 1 || !result.data) {
      return ['home']; // Fallback to home page
    }

    // Extract slugs from the data object
    return Object.values(result.data) as string[];
  } catch (error) {
    console.error('Error fetching pages:', error);
    // Return common pages as fallback
    return ['home', 'about', 'contact-us', 'career', 'media'];
  }
}

/**
 * Fetch menu data by locale
 */
export async function fetchMenus(locale: string): Promise<Menu | null> {
  try {
    const response = await fetch(getApiUrl(`/menus/${locale}`), {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch menus: ${response.status} ${response.statusText}`);
      return null;
    }

    const result: MenusResponse = await response.json();

    if (result.status !== 1 || !result.data.menu1) {
      return null;
    }

    return result.data.menu1;
  } catch (error) {
    console.error('Error fetching menus:', error);
    return null;
  }
}

// Export API domain for file URLs
export { API_DOMAIN };
