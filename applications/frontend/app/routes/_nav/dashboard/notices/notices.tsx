import { Notice } from '~/routes/_nav/dashboard/notices/notice';
import { Container } from '~/routes/_nav/dashboard/container';

export function Notices() {
  return (
    <Container areaName={'notices'} label={'Уведомления'}>
      {Array(20)
        .fill(null)
        .map((v, i) => (
          <Notice key={i} />
        ))}
    </Container>
  );
}
