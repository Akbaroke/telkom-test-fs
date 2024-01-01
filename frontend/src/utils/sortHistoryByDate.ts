import { HistoryType } from '@/types/home';

export default function sortHistoryByDate(histories: HistoryType[]) {
  // Mengurutkan history berdasarkan tanggal terbaru
  const sortedHistory =
    histories?.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime()
    ) || [];

  // Memisahkan history berdasarkan tanggal
  const historyByCategory: {
    today: typeof sortedHistory;
    yesterday: typeof sortedHistory;
    onWeek: typeof sortedHistory;
    onMonth: typeof sortedHistory;
    month: typeof sortedHistory;
  } = {
    today: [],
    yesterday: [],
    onWeek: [],
    onMonth: [],
    month: [],
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  sortedHistory.forEach((message) => {
    const timestamp = message.created_at.getTime();
    const messageDate = new Date(timestamp);

    if (messageDate >= today) {
      historyByCategory.today.push(message);
    } else if (messageDate >= yesterday) {
      historyByCategory.yesterday.push(message);
    } else if (messageDate >= oneWeekAgo) {
      historyByCategory.onWeek.push(message);
    } else if (messageDate >= oneMonthAgo) {
      historyByCategory.onMonth.push(message);
    } else {
      historyByCategory.month.push(message);
    }
  });

  return historyByCategory;
}

const isSameDay = (timestamp1: number, timestamp2: number): boolean => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const todayTimestamp = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
};

const isYesterday = (timestamp: number): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);

  return date.getTime() === yesterday.getTime();
};

// Fungsi untuk memeriksa apakah timestamp mewakili hari pada akhir pekan (Sabtu atau Minggu)
const isOnOffWeek = (timestamp: number): boolean => {
  const date = new Date(timestamp);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 adalah Minggu, 6 adalah Sabtu
};

// Fungsi untuk memeriksa apakah timestamp mewakili hari pada bulan yang sama
const isOnMonth = (timestamp: number, currentTimestamp: number): boolean => {
  const date1 = new Date(timestamp);
  const date2 = new Date(currentTimestamp);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

const isSameYear = (timestamp1: number, timestamp2: number): boolean => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  return date1.getFullYear() === date2.getFullYear();
};

export { isSameDay, isSameYear, todayTimestamp };
