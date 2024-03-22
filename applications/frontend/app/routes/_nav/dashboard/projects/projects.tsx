import { Container } from '~/routes/_nav/dashboard/container';
import { Await, useLoaderData } from '@remix-run/react';
import { loader } from '~/routes/_nav/dashboard/route';
import { Suspense, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { Project } from '~/routes/_nav/dashboard/projects/project';
import { ProjectProvider } from '~/routes/_nav/dashboard/projects/project.context';

export function Projects() {
  const { projects: initPack } = useLoaderData<typeof loader>();
  const [projects, setProjects] = useState([initPack]);

  return (
    <Container
      areaName={'projects'}
      label={'Проекты'}
      setFunction={setProjects}
      array={projects}
    >
      {projects.map((pack, index) => (
        <Suspense key={index} fallback={<Heading>Skeleton need</Heading>}>
          <Await resolve={pack}>
            {(pack) =>
              pack.map((project) => (
                <ProjectProvider key={project.id} value={project}>
                  <Project />
                </ProjectProvider>
              ))
            }
          </Await>
        </Suspense>
      ))}
    </Container>
  );
}