import InputType from '@/types/input';
import cn from '@/utils/cn';
import { Transition } from '@mantine/core';
import { PiWarningCircleBold } from 'react-icons/pi';

export default function Input(props: InputType) {
  const { className, loading, icon, error, value } = props;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row-reverse w-full items-center text-white p-3 px-4 gap-3 bg-hardGray rounded-full">
        <input
          {...props}
          value={value}
          className={cn(
            'text-[14px] bg-hardGray outline-none w-full focus:shadow-none',
            className
          )}
          disabled={loading}
        />
        {icon}
      </div>
      <Transition
        mounted={error ? true : false}
        transition="scale-y"
        duration={400}
        timingFunction="ease">
        {(styles) => (
          <div
            style={styles}
            className="text-red-700 text-[12px] flex items-center justify-end gap-1">
            {error}
            <PiWarningCircleBold />
          </div>
        )}
      </Transition>
    </div>
  );
}
