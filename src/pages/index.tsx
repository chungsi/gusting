import * as React from 'react'
import { navigate } from 'gatsby'

const DesignHomepage2 = () => {
  React.useEffect(() => {
    navigate('/design/')
  }, [])
  return null
}

export default DesignHomepage2