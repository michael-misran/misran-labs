import { useParams } from 'react-router-dom'
import { getProject } from './projects'
import Page404 from '../shell/Page404'

export default function ProjectDemoPage() {
  const { slug, version } = useParams()
  const project = getProject(slug)

  const Demo = version === 'v2' ? project?.demoComponentV2 : project?.demoComponent

  if (!project || !Demo) {
    return <Page404 />
  }

  return <Demo />
}
