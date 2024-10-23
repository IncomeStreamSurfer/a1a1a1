/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://getmarriedinitaly.co',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority for different types of pages
    let priority = 0.7
    let changefreq = 'monthly'

    // Home page gets highest priority
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    }
    // Region pages get high priority
    else if (path.match(/^\/[^\/]+$/)) {
      priority = 0.9
      changefreq = 'weekly'
    }
    // Venue type pages get high priority
    else if (path.startsWith('/venues/')) {
      priority = 0.9
      changefreq = 'weekly'
    }
    // Region venue pages get medium-high priority
    else if (path.match(/^\/[^\/]+\/venues/)) {
      priority = 0.8
      changefreq = 'weekly'
    }
    // Vendor category pages get medium priority
    else if (path.startsWith('/vendors/')) {
      priority = 0.8
      changefreq = 'weekly'
    }
    // Individual vendor pages get medium-low priority
    else if (path.match(/^\/[^\/]+\/vendors/)) {
      priority = 0.7
      changefreq = 'weekly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}