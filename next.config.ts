import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(config);