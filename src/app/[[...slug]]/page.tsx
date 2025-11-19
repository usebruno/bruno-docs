export default function Page() {
  return <div>Hello from Nextra 4!</div>
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata() {
  return {
    title: 'Bruno Docs'
  }
}
