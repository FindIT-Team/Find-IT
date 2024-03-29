import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ProjectDto } from '../dashboard/projects/project.dto';
import { Icon } from '@chakra-ui/icons';
import { FaUsers } from 'react-icons/fa';
import { RiStarFill, RiWallet3Fill } from 'react-icons/ri';
import { MouseEventHandler, ReactNode } from 'react';
import { IconType } from 'react-icons';
import useLanguage from '../../../components/hooks/useLanguage';

export default function Page() {
  const project: ProjectDto = {
    budget: { currency: 'RUB', value: 1000000 },
    id: '0',
    title: 'Project',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, tempora consequuntur vitae tenetur in sed quam ea ex dicta exercitationem error, ipsa culpa laudantium quasi natus cumque hic quis. Aut?',
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

function ProjectCard({
  project,
  onCheckProject,
  onRespond,
}: {
  project: ProjectDto;
  onCheckProject?: MouseEventHandler<HTMLButtonElement>;
  onRespond?: MouseEventHandler<HTMLButtonElement>;
}) {
  const language = useLanguage();

  return (
    <Card maxW="sm">
      <CardBody>
        <VStack mt="2" alignItems={'flex-start'}>
          <Heading size="lg">{project.title}</Heading>
          <Box display="flex" gap="16px" my="12px">
            <IconValue icon={FaUsers}>
              {Intl.NumberFormat(language, {
                style: 'decimal',
                notation: 'compact',
              }).format(project._count.users)}
            </IconValue>
            <IconValue icon={RiStarFill}>
              {Intl.NumberFormat(language, {
                style: 'decimal',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }).format(
                project.rating.length > 0
                  ? project.rating
                      .map(({ mark }: { mark: number }) => mark)
                      .reduce(
                        (previousValue: number, currentValue: number) =>
                          (previousValue += currentValue),
                      ) / project.rating.length
                  : 0,
              )}
            </IconValue>
            {project.budget && (
              <IconValue icon={RiWallet3Fill}>
                {Intl.NumberFormat(language, {
                  style: 'currency',
                  currency: project.budget.currency,
                  notation: 'compact',
                }).format(project.budget.value)}
              </IconValue>
            )}
          </Box>
          <Text>{project.description}</Text>
        </VStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button onClick={onCheckProject} variant="outline">
            Посмотреть
          </Button>
          <Button onClick={onRespond} variant="solid">
            Откликнуться
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

function IconValue({
  children,
  icon,
}: {
  children: ReactNode;
  icon: IconType;
}) {
  return (
    <HStack>
      <Icon as={icon} boxSize={6} color={'gray.600'} />
      <Heading
        as={'h6'}
        color={'gray.600'}
        fontSize={'m'}
        fontWeight={'medium'}
      >
        {children}
      </Heading>
    </HStack>
  );
}
