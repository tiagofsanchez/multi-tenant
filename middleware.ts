import { NextRequest, NextResponse } from "next/server";
import subdomains from "./lib/subdomains";
import pathnamesToExclude from "./lib/pathnamesToExclude";
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  
  //PROTECTING THE ROUTE WHEN THE USER IS NOT LOGGED IN
  //   const res = NextResponse.next();
  //   const supabase = createMiddlewareClient({ req, res });
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //I am "pretending that we do have a user in for this"
  const user = true;

  const url = req.nextUrl;
  const hostname = req.headers.get("host");
  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  const subdomain = hostname.split(".")[0];

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  // (in the case of "subdomain-3.localhost:3000", "localhost:3000" is the root URL)
  // process.env.NODE_ENV === "production" indicates that the app is deployed to a production environment
  // process.env.VERCEL === "1" indicates that the app is deployed on Vercel
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
      : hostname.replace(`.localhost:3000`, "");

  // Checking if the subdomain exists and the pathname exists in the multitenant app pathnames
  // this were created by me 
  // const subdomainExist = subdomains.some((obj) => obj.domain === subdomain);
  // const pathnameExist = pathnamesToExclude.some((obj) => obj.p === path);
  // if (!subdomainExist) {
  //   return NextResponse.redirect(new URL(`/`, req.url));
  // }

  //rewrites for app pages
  // like that I do have a clear separation on my app and this is the app while home
  // and the other pages are just content driven pages and do not have interaction with use
  if (currentHost == "app") {
    if (url.pathname === "/" && !user) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${url.pathname === "/" ? "" : url.pathname}`, req.url)
    );
  }

  //   rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
