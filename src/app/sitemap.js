export async function getServerSideProps({ res }) {
  const baseUrl = "https://dripdrip.in/";

  // Define the pages for your sitemap
  const pages = [
    "", // Home page
    "about", // Example page
    "contact", // Example page
    "products", // Example page
  ];

  // Generate the XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      return `
      <url>
        <loc>${baseUrl}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `;
    })
    .join("")}
</urlset>`;

  // Set the response headers and send the sitemap
  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null; // This page is only used to generate the sitemap
}