import {
  Box,
  Button,
  ButtonGroup,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { FaUsers } from 'react-icons/fa';
import { RiStarFill, RiWallet3Fill } from 'react-icons/ri';
import { ProjectCardDto } from '@/entities/projects';
import { IconWithValue, useLanguage } from '@/shared';

export function ProjectCard({
  project,
  onCheckProject,
  onRespond,
}: {
  project: ProjectCardDto;
  onCheckProject?: MouseEventHandler<HTMLButtonElement>;
  onRespond?: MouseEventHandler<HTMLButtonElement>;
}) {
  const language = useLanguage();

  return (
    <ChakraCard maxW="sm">
      <CardBody>
        <VStack mt="2" alignItems={'flex-start'}>
          <Heading size="lg">{project.title}</Heading>
          <Box display="flex" gap="16px" my="12px">
            <IconWithValue icon={FaUsers} boxSize={4}>
              {Intl.NumberFormat(language, {
                style: 'decimal',
                notation: 'compact',
              }).format(project._count.users)}
            </IconWithValue>
            <IconWithValue icon={RiStarFill} boxSize={4}>
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
            </IconWithValue>
            {project.budget && (
              <IconWithValue icon={RiWallet3Fill} boxSize={4}>
                {Intl.NumberFormat(language, {
                  style: 'currency',
                  currency: project.budget.currency,
                  notation: 'compact',
                }).format(project.budget.value)}
              </IconWithValue>
            )}
          </Box>
          <Text
            textOverflow="ellipsis"
            overflow="hidden"
            display="-webkit-box"
            style={{ WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' }}
          >
            {project.description}
          </Text>
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
    </ChakraCard>
  );
}
