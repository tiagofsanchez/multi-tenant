import subdomains from "@/lib/subdomains";

export function generateStaticParams() {
  return subdomains;
}

const SiteHomePage = ({ params }) => {
  const domain = decodeURIComponent(params.domain);

  return <h1>This is the home page {domain}</h1>;
};

export default SiteHomePage;

// Generate static parameters for paths
