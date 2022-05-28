import { FC } from 'react';
import ADMIN from './ADMIN';
import DEFAULT from './DEFAULT';
import LOGIN from './LOGIN';

export const AllLayouts = {
  default: DEFAULT,
  admin: ADMIN,
  login: LOGIN
};

export type LayoutType = {
  Layout?: keyof typeof AllLayouts;
  Role?: string | string[];
};

const LayoutContext: FC<LayoutType> = (props) => {
  const { Layout, children, Role } = props;
  const GetLayout = AllLayouts[Layout || 'default'];
  return <GetLayout Role={Role}>{children}</GetLayout>;
};

export default LayoutContext;
