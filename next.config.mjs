/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // YouTube thumbnails and the channel avatar, for the Create section.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
