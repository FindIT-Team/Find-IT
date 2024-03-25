import {
  Grid,
  Heading,
  HStack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Contacts } from '~/routes/_nav/user/contacts';
import { Skills } from '~/routes/_nav/user/skills';
import { useContext } from 'react';
import { UserContext } from './user.context';

export function User() {
  const { username, profile, projects } = useContext(UserContext);

  return (
    <>
      {/*<VStack width={'20%'} padding={3}>*/}
      {/*  <Image src={'pudge.jpeg'} boxSize={60} borderRadius={'full'} />*/}
      {/*</VStack>*/}
      <VStack
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        flexGrow={1}
        height={'full'}
        overflow={'auto'}
        spacing={20}
        padding={5}
      >
        <VStack alignItems={'flex-start'} spacing={10} width={'full'}>
          <VStack alignItems={'flex-start'} spacing={0}>
            <Heading>{username}</Heading>
            <Heading as={'h3'} fontSize={'lg'} fontWeight={'medium'}>
              {profile.firstName} {profile.lastName}
            </Heading>
          </VStack>

          <HStack
            divider={<StackDivider />}
            alignItems={'flex-start'}
            spacing={5}
            width={'full'}
          >
            {profile.contacts && <Contacts />}
            {profile.skills && <Skills />}
          </HStack>
        </VStack>
        <VStack alignItems={'flex-start'} width={'full'}>
          {projects.length > 0 ? (
            <>
              <Heading as={'h5'} fontSize={'xl'} fontWeight={'medium'}>
                Участие в проектах:
              </Heading>
              <Grid
                gridTemplateColumns={'repeat(auto-fill, minmax(150px, 1fr))'}
                gap={3}
                width={'full'}
              >
                {projects.map(({ project }) => (
                  <HStack key={project.slug}>
                    <Text fontSize={'md'} fontWeight={'medium'}>
                      {project.title}
                    </Text>
                  </HStack>
                ))}
              </Grid>
            </>
          ) : (
            <Heading as={'h5'} fontSize={'xl'} fontWeight={'medium'}>
              Ещё не участвовал в проектах
            </Heading>
          )}
        </VStack>
      </VStack>
    </>
  );
}
