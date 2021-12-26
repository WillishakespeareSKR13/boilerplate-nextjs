import { css } from '@emotion/react';
import {
  AtomButton,
  AtomInput,
  AtomLink,
  AtomLoader,
  AtomText,
  AtomWrapper
} from '@sweetsyui/ui';
import { NextPageFC } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@Apollo/mutation';
import { useAlert } from '@Src/hooks/alertContext';
import { v4 as uuidv4 } from 'uuid';
import cookie from 'js-cookie';
import { IMutationFilter } from 'graphql';
import { useDispatch } from 'react-redux';
import { SetUser } from '@Redux/actions/user';
import { initialState } from '@Redux/reducer/user';
import { useRouter } from 'next/router';

const initialValues = {
  email: '',
  password: ''
};

const PageLogin: NextPageFC = () => {
  const { insertAlert } = useAlert();
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Por favor, ingrese un email válido')
        .required('Por favor, ingrese un email'),
      password: Yup.string().required('Por favor, ingrese una contraseña')
    }),
    onSubmit: async (valores) => {
      LoginMutation({
        variables: {
          input: {
            token: false,
            login: valores.email,
            password: valores.password
          }
        }
      });
    }
  });

  const [LoginMutation, { data, loading }] = useMutation<
    IMutationFilter<'login'>
  >(LOGIN, {
    onError: (error) => {
      insertAlert({
        id: uuidv4(),
        type: 'error',
        message: error.message
      });
    },
    onCompleted: (data) => {
      const { login } = data;
      const me = login.me || initialState;
      cookie.set('bearer', `${login.bearer}`);
      dispatch(SetUser(me));
      router.reload();
    }
  });

  return (
    <>
      <AtomLoader
        isLoading={data !== undefined || loading}
        colorLoading="#00abb9"
        backgroundColor="#00000010"
      />
      <AtomWrapper
        minHeight="calc(100vh - 90px)"
        maxWidth="1440px"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        customCSS={css`
          @media (max-width: 1200px) {
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
          }
          @media only screen and (max-width: 520px) {
            padding: 0px 20px;
          }
        `}
      >
        <AtomWrapper
          as="form"
          onSubmit={formik.handleSubmit}
          alignItems="center"
          justifyContent="center"
          customCSS={css`
            @media (max-width: 1200px) {
              padding: 50px 0px;
            }
          `}
        >
          <AtomText
            width="60%"
            fontSize="34px"
            margin="0px 0px 10px 0px"
            fontWeight={700}
          >
            Ingresar
          </AtomText>
          <AtomInput
            formik={formik}
            id="email"
            labelWidth="60%"
            label="Correo electrónico"
            spanMargin="0px 0px 10px 0px"
            placeholder="Usuario"
          />
          <AtomInput
            formik={formik}
            id="password"
            type="password"
            labelWidth="60%"
            label="Contraseña"
            spanMargin="0px 0px 10px 0px"
            placeholder="Contraseña"
          />
          <AtomLink link="/resetpasword" fontWeight={600} width="60%">
            Olvidé mi contraseña
          </AtomLink>
          <AtomButton
            type="submit"
            padding="10px 30px"
            margin="25px 0px 0px 0px"
          >
            Ingresar
          </AtomButton>
        </AtomWrapper>
      </AtomWrapper>
    </>
  );
};

PageLogin.Layout = 'login';

export default PageLogin;
