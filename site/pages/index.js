import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Storing Environmental Variables Outside Of A Next.js Project's Root
          Directory With Dotenv
        </title>
      </Head>
      <h1>
        Storing Environmental Variables Outside Of A Next.js Project's Root
        Directory With Dotenv
      </h1>
      <h2>TL;DR</h2>
      <p>
        I don't store passwords in `.env` files under a project's root. If I use
        files at all, I store them externally. This avoids the risk of
        accidentally commiting them or flashing them{' '}
        <a href="https://www.twitch.tv/theidofalan">on stream</a>. My approach
        is to install <a href="https://www.npmjs.com/package/dotenv">dotenv</a>{' '}
        with `yarn add dotenv` then change `next.config.js` from this:
      </p>
      <hr />
      <pre>
        {`/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
`}
      </pre>
      <hr />
      <p>to this:</p>
      <hr />
      <pre>{`/** @type {import('next').NextConfig} */

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
`}</pre>

      <hr />
      <p>
        From there, I can add my environmental variables into the external
        `/Users/alan/config-example.conf` file and use them just like if they
        were stored in `.env.local`
      </p>
      <h2>Details (Work In Progress)</h2>
      <hr />
      <h3>
        NOTE: All the stuff below is still in draft format. It's accurate, it's
        just not organized or edited.
      </h3>
      <ul>
        <li>
          <a href="https://github.com/alanwsmith/nextjs-dotenv-files-cookbook.alanwsmith.com">
            Site source code
          </a>
        </li>
        <li>
          This approach is for storing credentials in files. Generally speaking,
          I use the system password manager instead.{' '}
          <a href="https://www.alanwsmith.com/posts/storing-local-environmental-variables-securely-in-password-managers-instead-of-plaintext-env-files--20eonil1bcsz">
            This is my current approach
          </a>
          , but I'm working on setting up more link this so the call to the
          external process happens in the `next.config.js` file. I'll write that
          up when I've got everything refined.
        </li>
        <li>
          You can load multiple files by adding their paths to the
          `localEnvPaths` array in the `next.config.js` file
        </li>
        <li>
          You have to use a full path from the system root or a relative path
          from where you start the server to access the file. (i.e. `~` won't
          work)
        </li>
        <li>
          You can use this technique along side the `.env.local`. For example,
          you can keep non-sensitive project related variables in the
          `.env.local` file in the repo while storing authentication credentials
          in the externally.
        </li>
        <li>
          This is just an example to make sure there aren't problems in
          production. The word of the day is:{' '}
          {process.env.NEXT_PUBLIC_EXTERNAL_VAR}
        </li>
        <li>
          Environmental vairalbes that are setup by default outside of this
          process are still available.
        </li>
        <li>
          The variable name starts with `NEXT_PUBLIC_` so it can be accessed in
          client side web pages{' '}
          <Link href="/example">
            <a>for testing</a>
          </Link>
          . Passwords, authentication credentials, and anything else that needs
          to be kept secure should not use that prefece to help ensure they
          don't accidentally leak to the client. That goes for any
          implementation of Next.js environmental variables regardless of where
          they are stored.
        </li>
        <li>
          If you get an error like "Unhandled Runtime Error Error: Text content
          does not match server-rendered HTML." on a web page one potential
          cause is that you tried to use an env var whose name doesn't start
          with `NEXT_PUBLIC_`. That's not specific to this approach, it's how
          Next.js works with all env vars.
        </li>
      </ul>
      <h2>References</h2>
      <ul>
        <li>
          <a href="https://github.com/vercel/next.js/tree/canary/examples/with-env-from-next-config-js">
            Next.js - Example - With env From next.config.js
          </a>
        </li>

        <li>
          <a href="https://nextjs.org/docs/api-reference/next.config.js/environment-variables">
            Next.js - API Reference - Environment Variables
          </a>
        </li>

        <li>
          <a href="https://nextjs.org/docs/basic-features/environment-variables">
            Next.js - Basic Features - Environment Variables
          </a>
        </li>

        <li>
          <a href="https://github.com/vercel/next.js/blob/canary/packages/next/server/config-shared.ts">
            Next.js - packages/next/server/config-shared.ts
          </a>
        </li>

        <li>
          <a href="https://nextjs.org/docs/api-reference/next.config.js/introduction">
            Next.js - next.config.js
          </a>
        </li>

        <li>
          <a href="https://github.com/dotenv-org">Dotenv - GitHub</a>
        </li>

        <li>
          <a href="https://www.npmjs.com/package/dotenv">Dotenv - npm</a>
        </li>
        <li>
          <a href="https://medium.com/courtly-intrepid/environmental-variables-in-next-js-with-dotenv-599c5bbfdf74">
            Environmental Variables in Next.js with dotenv
          </a>
        </li>

        <li>
          <a href="https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html">
            Working With Environment Variables in Node.js
          </a>
        </li>
      </ul>
    </>
  )
}
