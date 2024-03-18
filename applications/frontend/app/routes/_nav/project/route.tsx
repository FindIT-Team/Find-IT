import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Icon } from '@chakra-ui/icons';
import { RiStarFill } from 'react-icons/ri';
import { Developers } from '~/routes/_nav/project/developers';

export const meta: MetaFunction = () => [{ title: 'Проект | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}
export default function Page() {
  return (
    <VStack
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      height={900}
      width={1780}
    >
      <HStack
        width={1780}
        height={220}
        alignItems={'flex-end'}
        padding={5}
        backgroundImage={'url(/login-side-image.jpg)'}
        borderTopRadius={'lg'}
        spacing={12}
      >
        <Heading fontSize={'xxx-large'}>Крутой проект</Heading>
        <Heading fontSize={'xx-large'}>16 Людишек</Heading>
        <Heading fontSize={'xx-large'}>10.000р</Heading>
        <Heading fontSize={'xx-large'}>
          1.2/10
          <Icon as={RiStarFill} />
        </Heading>
      </HStack>
      <HStack width={1780} paddingX={3} alignItems={'flex-start'}>
        <VStack justifyContent={'flex-start'}>
          <Text width={1480} height={'full'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            tincidunt egestas justo, quis eleifend purus lacinia id. Cras quis
            lorem eget arcu posuere volutpat. Vivamus feugiat mattis erat vitae
            rhoncus. Morbi non hendrerit orci. Sed vulputate ullamcorper quam et
            iaculis. Praesent tristique urna sit amet arcu ultricies lobortis.
            Nulla maximus leo justo, vel imperdiet ligula porta sit amet.
            Suspendisse vitae faucibus lorem. Fusce sed nulla eros. Suspendisse
            faucibus justo ex, sed placerat massa volutpat tempor. Aliquam id
            purus neque. Fusce id eleifend ligula, quis dignissim ex. Curabitur
            elementum pellentesque nibh ac commodo. Etiam aliquam ipsum enim,
            sed sollicitudin neque finibus at. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Quisque dolor
            diam, convallis mattis euismod id, malesuada non nisi. Praesent eu
            commodo arcu, sit amet congue magna. Sed ultricies odio quis tortor
            congue, sed eleifend ex porttitor. Phasellus convallis semper magna,
            nec pellentesque urna semper ac. Mauris faucibus faucibus enim.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Suspendisse imperdiet mollis odio nec
            laoreet. Cras vel risus eget neque ultrices sollicitudin. Mauris
            rhoncus velit quis mi faucibus posuere. Suspendisse lorem ipsum,
            laoreet at rhoncus sed, sollicitudin nec enim. Nullam at ex eget mi
            convallis venenatis a eu erat. Sed lorem nulla, tincidunt laoreet
            lorem a, viverra dignissim sapien. Mauris sed mattis nisi, quis
            pulvinar enim. Fusce aliquam sollicitudin elit, sit amet dapibus
            magna pulvinar id. Vivamus efficitur risus vel arcu ultrices, quis
            sodales tortor cursus. Aliquam non quam ac orci sagittis molestie ut
            non orci. Curabitur in vestibulum eros. Sed varius ultricies nisi,
            id elementum tellus. Aliquam ut hendrerit enim. Maecenas id
            facilisis elit, at pellentesque orci. Nulla interdum fermentum
            facilisis. Suspendisse consequat sapien eu malesuada cursus. Donec
            sed feugiat dolor. Pellentesque id eros vel ex sagittis aliquet.
            Vivamus congue volutpat neque ut varius. Mauris commodo elit vitae
            diam hendrerit, quis blandit nisl luctus. Cras nec malesuada leo.
            Pellentesque molestie eget enim eget lacinia. Donec lacinia odio eu
            magna ornare ultricies. Ut eget vulputate ante, id dapibus odio.
            Nulla lobortis ante vel urna consequat, volutpat elementum ante
            congue. Maecenas elementum posuere nunc. Sed sed sem semper felis
            lacinia rhoncus. Nam viverra tellus ut tortor molestie, tempor
            placerat nisi pharetra. Mauris facilisis elementum sapien eget
            ultricies. Cras aliquam ligula sit amet condimentum gravida. Duis
            pharetra turpis eu condimentum varius. Etiam justo turpis, hendrerit
            quis sagittis in, vehicula ut mauris. Praesent nec volutpat ipsum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            rutrum magna non nisi venenatis, in congue augue ullamcorper. Fusce
            in sem quam. Donec non orci enim. Vivamus vel efficitur nibh.
            Phasellus sed nisi at nulla condimentum suscipit eget a dui. Proin
            eu iaculis nisl. Duis nisi elit, feugiat in vestibulum sit amet,
            malesuada eu massa. Cras nec nisi sed mi maximus tempor. Curabitur
            ut fermentum nisi, id pretium sem.
          </Text>
          <Heading fontSize={'xl'} justifySelf={'flex-start'}>
            Минимальные требования:
          </Heading>
          <HStack></HStack>
        </VStack>
        <Developers />
      </HStack>
    </VStack>
  );
}
