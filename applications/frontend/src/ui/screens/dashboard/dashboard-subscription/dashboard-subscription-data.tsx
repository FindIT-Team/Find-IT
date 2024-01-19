import { ibmPlexMono } from '@/lib/fonts';
import { useDashboardContext } from '@/lib/hooks-contexts/dashboard.context';
import styles from '@/ui/screens/dashboard/dashboard-content.module.scss';

const DashboardSubscriptionData = () => {
  const { subscription } = useDashboardContext();

  return (
    subscription && (
      <div className={`${styles.subscription} ${ibmPlexMono.className}`}>
        <h3>{subscription.type ? subscription.type : 'Отсутствует'}</h3>
        <div
          className={
            subscription.type ? styles.thanksImage : styles.noSubscriptionImage
          }
        />
        {subscription.type && subscription.expiresIn && (
          <h3>
            Действует до {new Date(subscription.expiresIn).toLocaleDateString()}
          </h3>
        )}
        {!subscription.type && <button>Управлять</button>}
      </div>
    )
  );
};
export default DashboardSubscriptionData;
