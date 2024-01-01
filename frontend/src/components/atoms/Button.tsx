import ButtonType from '@/types/button';
import cn from '@/utils/cn';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Button(props: ButtonType) {
  const { title, className, icon, disabled, loading } = props;
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        'bg-primary p-2 rounded-full text-white font-semibold shadow-md shadow-softGray hover:shadow-none transition-all duration-300 flex items-center justify-center gap-2',
        {
          'cursor-not-allowed': disabled,
          'cursor-wait': loading,
          'shadow-none': disabled || loading,
        },
        className
      )}>
      {loading ? (
        <>
          <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          <p>{title}...</p>
        </>
      ) : (
        <>
          {icon}
          <p>{title}</p>
        </>
      )}
    </button>
  );
}
