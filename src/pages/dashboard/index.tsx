import { NextPageFC } from 'next';

const PageDashboard: NextPageFC = () => {
  return (
    <div>
      <span>dashboard</span>
    </div>
  );
};

PageDashboard.Layout = 'admin';

export default PageDashboard;
