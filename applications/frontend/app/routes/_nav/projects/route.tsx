import { Box } from '@chakra-ui/react';
import { ProjectDto } from '../dashboard/projects/project.dto';
import { ProjectCard } from '~/routes/_nav/projects/project-card';

export default function Page() {
  const project: ProjectDto = {
    budget: { currency: 'RUB', value: 1000000 },
    id: '0',
    title: 'Project',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, tempora consequuntur vitae tenetur in sed quam ea ex dicta exercitationem error, ipsa culpa laudantium quasi natus cumque hic quis. Aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, tempora consequuntur vitae tenetur in sed quam ea ex dicta exercitationem error, ipsa culpa laudantium quasi natus cumque hic quis. Aut? ',
    rating: [{ mark: 5 }],
    slug: 'project',
    updatedAt: '',
    users: [{ user: { username: '' } }],
    _count: { users: 4 },
  };
  return (
    <Box m="16px" display="flex" gap="16px" flexWrap="wrap">
      <ProjectCard project={project} />
      <ProjectCard project={project} />
      <ProjectCard project={project} />
    </Box>
  );
}
