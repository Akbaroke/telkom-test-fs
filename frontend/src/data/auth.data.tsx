import { TbAt } from 'react-icons/tb';
import { MdLockOpen } from 'react-icons/md';
import { LuUser2 } from 'react-icons/lu';
import InputType from '@/types/input';

const registerData: InputType[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
    icon: <LuUser2 />,
    maxLength: 20,
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    icon: <TbAt />,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    icon: <MdLockOpen />,
    maxLength: 20,
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
    icon: <MdLockOpen />,
    maxLength: 20,
  },
];

const loginData: InputType[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    icon: <TbAt />,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    icon: <MdLockOpen />,
    maxLength: 20,
  },
];

export { registerData, loginData };
