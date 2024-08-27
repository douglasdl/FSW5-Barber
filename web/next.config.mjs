/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
          hostname: "utfs.io"
        },
        {
          hostname: "lh5.googleusercontent.com"
        }
    ]
  }
};

export default nextConfig;
