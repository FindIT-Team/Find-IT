import { axiosInstance } from '@/lib/axios';
import { useDashboardContext } from '@/lib/hooks-contexts/dashboard.context';
import useDashboard from '@/lib/hooks-contexts/dashboard/use-dashboard.hook';
import { NoticeType } from '@/lib/types/notice.type';
import styles from '@/ui/screens/dashboard/dashboard-content.module.scss';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, useRef } from 'react';

const DashboardNotice = ({ index }: { index: number }) => {
  const notice: NoticeType = useDashboard('notices', index);
  const ref = useRef<HTMLLIElement>(null);

  const { setNotices } = useDashboardContext();
  useEffect(() => {
    notice && setNotices((prevState) => [...prevState, notice]);
  }, [notice, setNotices]);

  const removeNotice = () => {
    axiosInstance
      .post(`/api/dashboard/notices/${notice.id}?action=remove`)
      .then((res) => {
        const element = ref.current;

        if (!element) return;

        if (res.data === notice.id) element.remove();
      });
  };

  return (
    notice && (
      <li key={notice.id} ref={ref}>
        <div className={styles.notice}>
          <div>
            <h1>{notice.message}</h1>
            <h6>{notice.type}</h6>
          </div>
          <div>
            <button onClick={removeNotice}>
              <XMarkIcon />
            </button>
            <h6>{new Date(notice.createdAt).toLocaleString()}</h6>
          </div>
        </div>
      </li>
    )
  );
};
export default DashboardNotice;
