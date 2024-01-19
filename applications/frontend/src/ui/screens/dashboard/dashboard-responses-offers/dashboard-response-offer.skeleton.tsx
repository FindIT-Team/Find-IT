import styles from '@/ui/screens/dashboard/dashboard-skeletons.module.scss';

const DashboardResponseOfferSkeleton = () => {
  return (
    <li>
      <div className={styles.responseOfferSkeleton}>
        <div>
          <div />
          <div />
        </div>
        <div />
      </div>
    </li>
  );
};
export default DashboardResponseOfferSkeleton;
