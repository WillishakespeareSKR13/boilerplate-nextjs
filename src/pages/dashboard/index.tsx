import { NextPageFC } from 'next';
import { useSelector } from 'react-redux';
import { RootStateType } from '@Redux/reducer/index';

const PageDashboard: NextPageFC = () => {
  const user = useSelector((state: RootStateType) => state.user);
  console.warn(user);

  return (
    <div>
      {JSON.stringify(user)}
      <span>dashboard</span>
    </div>
  );
};

PageDashboard.Layout = 'admin';
PageDashboard.Role = ['USER', 'OWNER'];

export default PageDashboard;
