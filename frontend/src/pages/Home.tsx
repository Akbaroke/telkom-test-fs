import Sidebar from '@/components/organisms/Sidebar';

export default function Home() {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div>
        <h1>Home</h1>
      </div>
    </div>
  );
}
