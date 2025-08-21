// app/robots.js

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin/"], // block sensitive routes
            },
        ],
        sitemap: "https://www.mimaansa.com/sitemap.xml",
    };
}
