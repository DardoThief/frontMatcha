import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import { login } from '../../store/flow/auth/actions'
import { connect } from "react-redux";
import Switcher from "../../components/switcher";

const REGISTER = 'Registration';
const LOGIN = 'Login';

export const Auth = ({authorizationHandler, loginHandler}, dispatchLogin) => {
  const [tab, setTab] = useState(REGISTER);
  const formSchema = {
    name: 'auth',
    title: tab === REGISTER ? 'Авторизация' : 'Логин',
    fields: {
      email: {
        label: 'Email',
        name: 'email',
        defaultValue: '',
        rule: Yup.string().required('Enter email'),
      },
      username: {
        label: 'Username',
        name: 'username',
        defaultValue: '',
        rule: Yup.string().required('Enter username'),
      },
      password: {
        label: 'Password',
        name: 'password',
        defaultValue: '',
        rule: Yup.string().required('Enter password'),
      },
      firstName: {
        label: 'Name',
        name: 'firstName',
        defaultValue: '',
        rule: Yup.string().required('Enter your first name'),
      },
      lastName: {
        label: 'Surname',
        name: 'lastName',
        defaultValue: '',
        rule: Yup.string().required('Enter your surname'),
      },
    },
  };
  return (
    <div className={styles.box}>
      <Switcher
        usualName={REGISTER}
        additionalName={LOGIN}
        selectedValue={tab}
        onChange={(e) => {
          setTab(e.target.value);
        }}
      />
      {tab === REGISTER && (
        <Formik
          validateOnChange
          validateOnBlur
          initialValues={{
            email: formSchema.fields.email.defaultValue,
            username: formSchema.fields.username.defaultValue,
            password: formSchema.fields.password.defaultValue,
            firstName: formSchema.fields.firstName.defaultValue,
            lastName: formSchema.fields.lastName.defaultValue,
          }}
          validationSchema={Yup.object({
            email: formSchema.fields.email.rule,
            username: formSchema.fields.username.rule,
            password: formSchema.fields.password.rule,
            firstName: formSchema.fields.firstName.rule,
            lastName: formSchema.fields.lastName.rule,
          })}
          onSubmit={async (values, {setSubmitting, setFieldError}) => {
            await dispatchLogin(values, setFieldError);
            setSubmitting(false);
          }}
        >
          {({handleSubmit, errors, getFieldProps, touched, dirty, isValid}) =>
            <div className={styles.container}>
              <Form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.form__groupField}>
                  <input
                    placeholder={formSchema.fields.email.label}
                    type="text"
                    size="xl"
                    {...getFieldProps('email')}
                  />
                  {touched.email && errors.email ?
                    <div className={styles.form__groupFieldError}>{errors.email}</div> : null}
                </div>

                <div className={styles.form__groupField}>
                  <input
                    placeholder={formSchema.fields.username.label}
                    type="text"
                    size="xl"
                    {...getFieldProps('username')}
                  />
                  {touched.username && errors.username ?
                    <div className={styles.form__groupFieldError}>{errors.username}</div> : null}
                </div>

                <div className={styles.form__groupField}>
                  <input
                    placeholder={formSchema.fields.password.label}
                    size="xl"
                    type="password"
                    {...getFieldProps('password')}
                  />
                  {touched.password && errors.password ?
                    <div className={styles.form__groupFieldError}>{errors.password}</div> : null}
                </div>

                <div className={styles.form__groupField}>
                  <input
                    placeholder={formSchema.fields.firstName.label}
                    size="xl"
                    type="text"
                    {...getFieldProps('firstName')}
                  />
                  {touched.firstName && errors.firstName ?
                    <div className={styles.form__groupFieldError}>{errors.firstName}</div> : null}
                </div>

                <div className={styles.form__groupField}>
                  <input
                    placeholder={formSchema.fields.lastName.label}
                    size="xl"
                    type="text"
                    {...getFieldProps('lastName')}
                  />
                  {touched.lastName && errors.lastName ?
                    <div className={styles.form__groupFieldError}>{errors.lastName}</div> : null}
                </div>

                {errors.server ? <div className={styles.form__groupFieldError}>{errors.server}</div> : null}
                <button onClick={() => handleSubmit()}
                        className={styles.form__submit}
                        disabled={!dirty || !isValid}
                >
                  Register
                </button>
              </Form>
            </div>
          }
        </Formik>
      )}
      {tab === LOGIN && (
        <Formik
          validateOnChange
          validateOnBlur
          initialValues={{
            username: formSchema.fields.username.defaultValue,
            password: formSchema.fields.password.defaultValue,
          }}
          validationSchema={Yup.object({
            username: formSchema.fields.username.rule,
            password: formSchema.fields.password.rule,
          })}
          onSubmit={async (values, {setSubmitting, setFieldError}) => {
            await dispatchLogin(values, setFieldError);
            setSubmitting(false);
          }}
        >
          {({handleSubmit, errors, getFieldProps, touched, dirty, isValid}) =>
            <div className={styles.container}>
              <Form className={styles.form} onSubmit={handleSubmit}>

                <div className={styles.form__groupField}>
                  <input
                    placeholder={formSchema.fields.username.label}
                    type="text"
                    size="xl"
                    {...getFieldProps('username')}
                  />
                  {touched.username && errors.username ?
                    <div className={styles.form__groupFieldError}>{errors.username}</div> : null}
                </div>

                <div className={styles.form__groupField}>
                  <input
                    placeholder={formSchema.fields.password.label}
                    size="xl"
                    type="password"
                    {...getFieldProps('password')}
                  />
                  {touched.password && errors.password ?
                    <div className={styles.form__groupFieldError}>{errors.password}</div> : null}
                </div>

                {errors.server ? <div className={styles.form__groupFieldError}>{errors.server}</div> : null}
                <div className={styles.form__forgotPassword}>forgot password</div> //todo redirect
                <button onClick={() => handleSubmit()}
                        className={styles.form__submit}
                        disabled={!dirty || !isValid}
                >
                  Login
                </button>
              </Form>
            </div>
          }
        </Formik>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  dispatchLogin: login,
};

export default connect(null, mapDispatchToProps)(Auth);
