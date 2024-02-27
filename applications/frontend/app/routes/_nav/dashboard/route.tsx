import { LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { getSession } from '~/session.server';
import { fetch } from '~/fetch.util';
import { Await, defer, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import { ProjectEntity } from 'backend/src/entities/project.entity';
import { Box } from '@chakra-ui/react';

export const meta: MetaFunction = () => [
  { title: 'Панель управления | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  const countData = async (s: string): Promise<number> =>
    await fetch(`/dashboard/${s}/count`, session).then(
      async ({ response }) =>
        ((await response.json()) as { counter: number }).counter,
    );

  const getData = (s: string, counter: number): Promise<unknown>[] =>
    new Array(counter)
      .fill(null)
      .map(
        async (_value, index: number): Promise<unknown> =>
          await fetch(`/dashboard/${s}/${index}`, session).then(
            async ({ response }) => (await response.json()) as unknown,
          ),
      );

  const projectsCounter = await countData('projects');
  // const projectsCounter = await countData('projects');

  const projects = getData('projects', projectsCounter);

  return defer({ projects });
}

export default function Page() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <Box>
      {projects.map((project, i) => (
        <Suspense key={i}>
          <Await resolve={project as ProjectEntity}>
            {(project: ProjectEntity) => <>{JSON.stringify(project)}</>}
          </Await>
        </Suspense>
      ))}
    </Box>
  );
}
