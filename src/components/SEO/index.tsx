import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  tabName: string
  title: string
  description: string
  image?: string | null
}

export const SEO = ({ tabName, title, description, image = '' }: SEOProps) => {
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

      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1200" />

          <meta property="twitter:image" content={image} />
          <meta property="twitter:card" content="summary_large_image" />
        </>
      )}
    </Head>
  )
}
