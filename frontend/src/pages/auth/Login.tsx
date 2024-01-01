import { loginData } from '@/data/auth.data';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { isEmail, useForm } from '@mantine/form';
import Notify from '@/components/atoms/Notify';
import { useState } from 'react';
import axios from '@/axios';
import { loginFormType } from '@/types/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm<loginFormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Email is not valid.'),
      password: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters.' : null,
    },
  });

  const handleLogin = async () => {
    Notify({ id: 'login', message: 'Logining...', type: 'loading' });
    setIsLoading(true);
    try {
      const { data } = await axios.post('/auth/login', form.values);
      console.log(data);
      dispatch(
        login({
          token: data.data.token,
          name: data.data.name,
          email: data.data.email,
        })
      );
      Notify({ id: 'login', message: data.message, type: 'success' });
      navigate('/');
    } catch (error) {
      console.log(error);
      Notify({ id: 'login', message: 'Login Failed', type: 'error' });
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <div className="w-max min-w-[300px] flex flex-col gap-5 text-center">
      <h1 className="text-white font-semibold text-[30px]">Welcome back</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.onSubmit(handleLogin)}>
        {loginData.map((item, index) => (
          <Input
            key={index}
            {...item}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            value={form.values[item.name]}
            onChange={(e) => form.setFieldValue(item.name, e.target.value)}
            error={form.errors[item.name] as string}
          />
        ))}
        <Button
          title="Continue"
          type="submit"
          className="mt-5"
          loading={isLoading}
          disabled={!form.isValid()}
        />
      </form>
      <div className="flex items-center justify-center text-white text-center">
        <p>Don't have an account ?</p>
        <Link
          to="/register"
          className="text-primary active:bg-primary/10 rounded-md px-2">
          Register
        </Link>
      </div>
    </div>
  );
}
