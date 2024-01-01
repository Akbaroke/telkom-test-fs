import { SiOpenai } from 'react-icons/si';

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SiOpenai className="text-white absolute top-8" size={28} />
      <div>{children}</div>
    </div>
  );
}
