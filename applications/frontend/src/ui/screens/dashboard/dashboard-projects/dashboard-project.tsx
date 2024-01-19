import { useDashboardContext } from '@/lib/hooks-contexts/dashboard.context';
import useDashboard from '@/lib/hooks-contexts/dashboard/use-dashboard.hook';
import { ProjectType } from '@/lib/types/project.type';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import styles from '../dashboard-content.module.scss';

const DashboardProject = ({ index }: { index: number }) => {
  const project: ProjectType = useDashboard('projects', index);
  const ref = useRef<HTMLLIElement>(null);

  const { setProjects } = useDashboardContext();
  useEffect(() => {
    project && setProjects((prevState) => [...prevState, project]);
  }, [project, setProjects]);

  const route = useRouter();

  return (
    project && (
      <li key={project.id} ref={ref}>
        <div className={styles.project}>
          <div>
            <h1>{project.title}</h1>
            <div>
              <h6>{project.budget}</h6>
              <h6>{new Date(project.updatedAt).toLocaleDateString()}</h6>
              <h6>
                {
                  project.projectToUsers.find((value) => value.isOwner === true)
                    .user.username
                }
              </h6>
            </div>
          </div>
          <div>
            <button
              onClick={() => route.push(`/projects/${project && project.id}`)}
            >
              Перейти
            </button>
          </div>
        </div>
      </li>
    )
  );
};
export default DashboardProject;
