import Link from 'next/link'

export default function ExamplePage() {
  return (
    <>
      <p>
        This is a smoke test to make sure there aren't problems in production.
        It calls `process.env.NEXT_PUBLIC_EXTERNAL_VAR` to check the external
        file is working in dev and the variable set on the server works in prod.
        If it works, the word `Banana` will show up in between the dashes below.
      </p>
      <p>--- {process.env.NEXT_PUBLIC_EXTERNAL_VAR} ---</p>
      <p>
        There is also an API route test with with the same
        `NEXT_PUBLIC_EXTERNAL_VAR` being called with the expected value of
        `Banana`
      </p>
      <p>
        That test{' '}
        <Link href="/api/example">
          <a>is here</a>
        </Link>
      </p>
    </>
  )
}
