/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    FIREBASE_WEB_ID: process.env.FIREBASE_WEB_ID
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
}
