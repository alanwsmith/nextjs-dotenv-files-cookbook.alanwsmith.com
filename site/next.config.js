/** @type {import('next').NextConfig} */

const fs = require('fs')
const localEnvPaths = ['/Users/alan/config-example.conf']
const envDataToAdd = []

localEnvPaths.forEach((path) => {
  try {
    if (fs.existsSync(path)) {
      const { parsed: envData } = require('dotenv').config({
        path: path,
      })
      envDataToAdd.push(envData)
    }
  } catch (err) {}
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: Object.assign({}, envDataToAdd),
}

module.exports = nextConfig
