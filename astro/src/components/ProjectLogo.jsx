import { useEffect } from 'react'

export default function ProjectLogo() {
  let logoUrl = '/'

  useEffect(() => {
    const logo = document.getElementById('logo')
    const urlParams = new URL(document.location.href).searchParams

    if (urlParams.get('home') === 'design') {
      logoUrl = '/design'
    } else if (urlParams.get('home') === 'art') {
      logoUrl = '/art'
    }

    // Set the logo link to point to the correct home page
    logo?.setAttribute('href', logoUrl)
    console.log('should set the logo link to ', logoUrl, urlParams)
  }, [])

  return (
    <a
      id='logo'
      href={logoUrl}
      class:list={[
        'fixed block z-50 top-lg pl-0 md:pl-2',
        'min-w-[var(--space-xl)] w-2xl max-w-2xl',
        '-ml-2 lg:-ml-[var(--space-container-offset)] xl:-ml-[calc(var(--space-container-offset)_/_1.6)]'
      ]}
    >
      {/* <Fragment set:html={logoSvg} /> */}
      {/* Don't know how to import svgs without another package... and I don't want to haha */}
      {/* {LogoSvg} */}
    </a>
  )
}