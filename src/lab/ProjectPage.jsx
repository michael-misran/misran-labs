import { useParams } from 'react-router-dom'
import { getProject } from './projects'
import Page404 from '../shell/Page404'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project || !project.component) {
    return <Page404 />
  }

  const Component = project.component
  return <Component project={project} />
}
