import { ProjectType } from '~/types/project.type';
import { Button, Heading, HStack, VStack } from '@chakra-ui/react';

export function Project() {
  const project: ProjectType = {
    id: 'idproj52',
    title: '52comunity',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <HStack width={'full'} paddingX={3} paddingY={1}>
      <VStack alignItems={'flex-start'} flexGrow={1}>
        <Heading as={'h1'} fontSize={'sm'}>
          {project.title}
        </Heading>
        <Heading as={'h6'} fontSize={'xs'}>
          <Heading as={'h6'}>{project.budget}</Heading>
          {/*<Heading as={'h6'}>*/}
          {/*  {*/}
          {/*    project.projectToUsers.find((value) => value.isOwner === true)*/}
          {/*      .user.username*/}
          {/*  }*/}
          {/*</Heading>*/}
        </Heading>
      </VStack>
      <VStack alignItems={'flex-end'}>
        <Button>Перейти</Button>
        <Heading>
          <Heading as={'h6'} fontSize={'xs'}>
            {new Date(project.updatedAt).toLocaleString()}
          </Heading>
        </Heading>
      </VStack>
    </HStack>
  );
}
