import useGetData from '@/lib/hooks-contexts/use-get-data.hook';

function useDashboard(type: string, skip = 0) {
  const data = useGetData(`/api/dashboard/${type}?skip=${skip}&take=${1}`);

  return data ? data[0][0] : data;
}

export default useDashboard;
