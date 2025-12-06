'use client'

export const Head = () => {
  const title = "Bruno Docs"
  
  return(
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content="Bruno is a fast and git-friendly open source API client, helping developers test and manage APIs efficiently." />
      <meta name="keywords" content="API client, API testing, Postman alternative, REST client, GraphQL client, SOAP client, API development, git-friendly API client" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Bruno - The Open Source API Client" />
      <meta property="og:description" content="Fast and git-friendly open source API client for testing and managing APIs" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://docs.usebruno.com" />
      <meta property="og:image" content="https://docs.usebruno.com/bruno.png" />
      <meta property="og:site_name" content="Bruno Docs" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Bruno - The Open Source API Client" />
      <meta name="twitter:description" content="Fast and git-friendly open source API client for testing and managing APIs" />
      <meta name="twitter:image" content="https://docs.usebruno.com/bruno.png" />
      
      <link href="/bruno.png" rel="icon" type="image/png" sizes="32x32" />
      <link href="/bruno.png" rel="apple-touch-icon" type="image/png" sizes="32x32" />
      <link rel="canonical" href="https://docs.usebruno.com" />
    </>
  )
}