export default function handler(req, res) {
  res
    .status(200)
    .json({ NEXT_PUBLIC_EXTERNAL_VAR: process.env.NEXT_PUBLIC_EXTERNAL_VAR })
}
