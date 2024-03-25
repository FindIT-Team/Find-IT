import { Container } from '~/routes/_nav/dashboard/container';
import { Await, useLoaderData } from '@remix-run/react';
import { loader } from '~/routes/_nav/dashboard/route';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import { Notice } from '~/routes/_nav/dashboard/notices/notice';
import { Heading } from '@chakra-ui/react';
import { NoticeProvider } from '~/routes/_nav/dashboard/notices/notice.context';

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
                  <Notice />
                </NoticeProvider>
              ))
            }
          </Await>
        </Suspense>
      ))}
    </Container>
  );
}
