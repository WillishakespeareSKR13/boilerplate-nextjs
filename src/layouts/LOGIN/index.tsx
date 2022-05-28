import { FC } from 'react';
import AuthContext from '@Hooks/authContext';
import LayoutAnimation from '@sweetsyui/ui/build/@layouts/LayoutAnimation';

type Props = {
  Role?: string | string[];
};

const AdminLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <AuthContext>
      <LayoutAnimation>{children}</LayoutAnimation>
    </AuthContext>
  );
};
export default AdminLayout;
