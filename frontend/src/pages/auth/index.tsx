import AuthTemplate from '@/components/template/AuthTemplate';
import Register from './Register';
import Login from './Login';

export default function index({ type }: { type: 'login' | 'register' }) {
  return (
    <AuthTemplate>{type === 'login' ? <Login /> : <Register />}</AuthTemplate>
  );
}
