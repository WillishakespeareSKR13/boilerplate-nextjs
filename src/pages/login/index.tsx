import { css } from '@emotion/react';
import {
  AtomButton,
  AtomInput,
  AtomLink,
  AtomText,
  AtomWrapper
} from '@sweetsyui/ui';
import { NextPageFC } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  email: '',
  password: ''
};

const PageLogin: NextPageFC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Por favor, ingrese un email válido')
        .required('Por favor, ingrese un email'),
      password: Yup.string().required('Por favor, ingrese una contraseña')
    }),
    onSubmit: async (valores) => {
      console.warn(valores);
    }
  });

  return (
    <>
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
