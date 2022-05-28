import { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'jotai';
import { AppPropsWithLayout } from 'next/app';
import GlobalStyles from '@Src/styles';
import AlertContext from '@Src/hooks/alertContext';
import LayoutContext from '@Layouts/index';
import client from '@Apollo/index';

const _App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <AlertContext>
          <LayoutContext Layout={Component.Layout}>
            <GlobalStyles />
            <Component {...pageProps} />
          </LayoutContext>
        </AlertContext>
      </Provider>
    </ApolloProvider>
  );
};

export default _App;
