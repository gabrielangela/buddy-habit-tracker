export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home", "/about", "/contact"], // halaman yang perlu login
};
