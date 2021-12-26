import { FC } from 'react';
import LayoutAnimation from '@sweetsyui/ui/build/@layouts/LayoutAnimation';
import AuthContext from '@Src/hooks/authContext';

type Props = {
  Role?: string | string[];
};

const DefaultLayout: FC<Props> = ({ children }) => (
  <AuthContext type="PUBLIC">
    <LayoutAnimation margin="80px 0 0 0" minHeight="calc(100% - 80px)">
      {children}
    </LayoutAnimation>
  </AuthContext>
);
export default DefaultLayout;
