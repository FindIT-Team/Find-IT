import { Heading } from '@chakra-ui/react';
import { Await, useLoaderData } from '@remix-run/react';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import { ProjectProvider, ProjectRow } from '@/entities/projects';
import { Container } from './container';
import { loader } from './index';

export function Projects() {
  const { projects: initPack } = useLoaderData<typeof loader>();
  const [projects, setProjects] = useState([initPack]);

  return (
    <Container
      areaName={'projects'}
      label={'Проекты'}
      setFunction={
        setProjects as Dispatch<SetStateAction<Promise<unknown[]>[]>>
      }
      array={projects}
    >
      {projects.map((pack, index) => (
        <Suspense key={index} fallback={<Heading>Skeleton need</Heading>}>
          <Await resolve={pack}>
            {(pack) =>
              pack.map((project) => (
                <ProjectProvider key={project.id} value={project}>
                  <ProjectRow />
                </ProjectProvider>
              ))
            }
          </Await>
        </Suspense>
      ))}
    </Container>
  );
}
