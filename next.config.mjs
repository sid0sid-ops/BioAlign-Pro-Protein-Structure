/** @type {import('next').NextConfig} */
const repoName = "BioAlign-Pro-Protein-Structure";
const isProd = process.env.NODE_ENV === "production";
const productionBasePath = process.env.NEXT_PUBLIC_BASE_PATH || `/${repoName}`;

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  turbopack: {},
  basePath: isProd && process.env.NEXT_PUBLIC_BASE_PATH ? productionBasePath : "",
  assetPrefix: isProd && process.env.NEXT_PUBLIC_BASE_PATH ? `${productionBasePath}/` : "",
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "framer-motion",
      "@react-three/drei"
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false
    };
    return config;
  }
};

export default nextConfig;
