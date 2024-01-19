import styles from '../dashboard-skeletons.module.scss';

const DashboardProjectSkeleton = () => {
  return (
    <li>
      <div className={styles.projectSkeleton}>
        <div>
          <h1 />
          <div>
            <h6 />
            <h6 />
            <h6 />
          </div>
        </div>
        <div>
          <button />
        </div>
      </div>
    </li>
  );
};
export default DashboardProjectSkeleton;
