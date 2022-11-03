import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  tabName: string
  title: string
  description?: string
}

export const SEO = ({ tabName, title, description = '' }: SEOProps) => {
  const { asPath } = useRouter()
  const url = 'https://www.pitacosdacopa.com'.concat(asPath)

  const titleTab = `${tabName} • Pitacos da Copa 2022`

  return (
    <Head>
      <title>{titleTab}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      <meta property="twitter:url" content="https://pitacosdacopa.com/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />

      <meta property="og:image" content="https://pitacosdacopa.com/seo.png" />
      <meta
        property="twitter:image"
        content="https://pitacosdacopa.com/seo.png"
      />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
  )
}
