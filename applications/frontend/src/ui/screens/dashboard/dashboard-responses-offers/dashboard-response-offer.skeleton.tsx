import styles from '@/ui/screens/dashboard/dashboard-skeletons.module.scss';
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

const DashboardResponseOfferSkeleton = () => {
  return (
    <li>
      <div className={styles.responseOfferSkeleton}>
        <div>
          <div>
            <ClockIcon />
          </div>
          <div>
            <h1 />
            <div />
          </div>
        </div>
        <div>
          <button>
            <CheckIcon />
          </button>
          <button>
            <XMarkIcon />
          </button>
        </div>
      </div>
    </li>
  );
};
export default DashboardResponseOfferSkeleton;
