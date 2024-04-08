import { Heading } from '@chakra-ui/react';
import { Await, useLoaderData } from '@remix-run/react';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import { NoticeProvider, NoticeRow } from '@/entities/notices';
import { Container } from './container';
import { loader } from '../../pages/dashboard';

export function Notices() {
  const { notices: initPack } = useLoaderData<typeof loader>();
  const [notices, setNotices] = useState([initPack]);

  return (
    <Container
      areaName={'notices'}
      label={'Уведомления'}
      setFunction={setNotices as Dispatch<SetStateAction<Promise<unknown[]>[]>>}
      array={notices}
    >
      {notices.map((pack, index) => (
        <Suspense
          key={index}
          fallback={<Heading aria-details={'skeleton'}>Skeleton need</Heading>}
        >
          <Await resolve={pack}>
            {(pack) =>
              pack.map((notice) => (
                <NoticeProvider key={notice.id} value={notice}>
                  <NoticeRow />
                </NoticeProvider>
              ))
            }
          </Await>
        </Suspense>
      ))}
    </Container>
  );
}
