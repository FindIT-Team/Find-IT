import { Container } from '~/routes/_nav/dashboard/container';
import { Await, useLoaderData } from '@remix-run/react';
import { loader } from '~/routes/_nav/dashboard/route';
import { Suspense, useState } from 'react';
import { Notice } from '~/routes/_nav/dashboard/notices/notice';
import { NoticeType } from '~/types/notice.type';
import { Heading } from '@chakra-ui/react';

export function Notices() {
  const { notices: initPack } = useLoaderData<typeof loader>();
  const [notices, setNotices] = useState([initPack]);

  return (
    <Container
      areaName={'notices'}
      label={'Уведомления'}
      setFunction={setNotices}
      array={notices}
    >
      {notices.map((pack, index) => (
        <Suspense
          key={index}
          fallback={<Heading aria-details={'skeleton'}>Skeleton need</Heading>}
        >
          <Await resolve={pack}>
            {(pack) =>
              pack.map((notice: NoticeType, index: number) => (
                <Notice key={notice.id} notice={notice} />
              ))
            }
          </Await>
        </Suspense>
      ))}
    </Container>
  );
}
