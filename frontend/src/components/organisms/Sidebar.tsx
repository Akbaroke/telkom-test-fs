import { SiOpenai } from 'react-icons/si';
import Button from '../atoms/Button';
import { HiPlusSmall } from 'react-icons/hi2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import cn from '@/utils/cn';
import { HistoryType } from '@/types/home';
import sortHistoryByDate, {
  isSameDay,
  isSameYear,
  todayTimestamp,
} from '@/utils/sortHistoryByDate';

export default function Sidebar() {
  const navigate = useNavigate();
  const { history_id } = useParams();

  const historyByDay = sortHistoryByDate(listHistory);

  return (
    <div className="flex flex-col w-full h-full max-w-[250px] bg-darkPrimary text-white p-5 gap-10">
      <div className="flex items-center gap-2">
        <SiOpenai className="text-white" size={35} />
        <h1 className="font-medium text-[18px]">ChatAi</h1>
      </div>
      <div className="w-full flex flex-col gap-5">
        <Button
          title="New Chat"
          onClick={() => navigate('/')}
          icon={<HiPlusSmall size={25} />}
          className="w-full justify-start font-medium hover:scale-105"
        />

        <div className="flex flex-col gap-2">
          {Object.entries(historyByDay).map(([timestamp, messages]) => {
            const historyDay = new Date(Number(timestamp));
            const isToday = isSameDay(todayTimestamp(), Number(timestamp));
            const isYearly = isSameYear(todayTimestamp(), Number(timestamp));
            const dateText = isToday
              ? 'Today'
              : historyDay.toLocaleDateString('en-US', {
                  // weekday: 'long',
                  year: isYearly ? undefined : 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
            return (
              <div>
                <p className="text-[12px]">{dateText}</p>
                <div className="flex flex-col gap-2 mt-1">
                  {messages.map((item, index) => (
                    <Link
                      to={`/${item.id}`}
                      key={index}
                      className={cn(
                        'bg-hardGray p-3 rounded-xl text-[14px] capitalize whitespace-nowrap overflow-hidden overflow-ellipsis hover:bg-softGray hover:scale-105 transition-all duration-300',
                        {
                          'bg-softGray scale-105': item.id === history_id,
                        }
                      )}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const listHistory: HistoryType[] = [
  {
    id: '1',
    title: 'Token Expiry Time',
    created_at: new Date(1703911805),
  },
  {
    id: '2',
    title: 'generate pola dinamika javascript',
    created_at: new Date(1703652605),
  },
  {
    id: '3',
    title: 'English UX Talks',
    created_at: new Date(1702270205),
  },
  {
    id: '4',
    title: 'English UX Talks',
    created_at: new Date(1699678205),
  },
  {
    id: '5',
    title: 'English UX Talks',
    created_at: new Date(1699778205),
  },
  {
    id: '6',
    title: 'English UX Talks',
    created_at: new Date(1694407805),
  },
];
