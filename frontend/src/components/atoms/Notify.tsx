import { toast } from 'sonner';

type Props = {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'loading';
};

export default function Notify({ id, message, type }: Props) {
  {
    type === 'success' && toast.success(message, { id });
  }
  {
    type === 'error' && toast.error(message, { id });
  }
  {
    type === 'loading' && toast.loading(message, { id });
  }
}
