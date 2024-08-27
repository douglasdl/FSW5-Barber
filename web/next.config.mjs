/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
          hostname: "utfs.io"
        },
        {
          hostname: "lh5.googleusercontent.com"
        },
        {
          hostname: "lh3.ggpht.com"
        }
    ]
  }
};

export default nextConfig;
