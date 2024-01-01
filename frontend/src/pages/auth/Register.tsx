import { registerData } from '@/data/auth.data';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { isEmail, matchesField, useForm } from '@mantine/form';
import Notify from '@/components/atoms/Notify';
import { useState } from 'react';
import axios from '@/axios';
import { registerFormType } from '@/types/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<registerFormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => {
        if (!/^[a-zA-Z ]{3,20}$/.test(value)) {
          return 'Invalid name. Use only letters with 3 - 20 characters.';
        }
        return null;
      },
      email: isEmail('Email is not valid.'),
      password: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters.' : null,
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });

  const handleCreate = async () => {
    Notify({ id: 'register', message: 'Registering...', type: 'loading' });
    setIsLoading(true);
    try {
      const { data } = await axios.post('/auth/register', form.values);
      console.log(data);
      Notify({ id: 'register', message: data.message, type: 'success' });
      navigate('/login');
    } catch (error) {
      console.log(error);
      Notify({ id: 'register', message: 'Register Failed', type: 'error' });
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <div className="w-max min-w-[300px] flex flex-col gap-5 text-center">
      <h1 className="text-white font-semibold text-[30px]">
        Create your account
      </h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.onSubmit(handleCreate)}>
        {registerData.map((item, index) => (
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
          title="Create"
          type="submit"
          className="mt-5"
          loading={isLoading}
          disabled={!form.isValid()}
        />
      </form>
      <div className="flex items-center justify-center text-white text-center">
        <p>Already have an account ?</p>
        <Link
          to="/login"
          className="text-primary active:bg-primary/10 rounded-md px-2">
          Login
        </Link>
      </div>
    </div>
  );
}
