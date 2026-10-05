import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Article } from '../types/article';
import { getTimelineData } from '../utils/computedMetrics';

interface TimelineScrubberProps {
  articles: Article[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  articles,
  selectedDate,
  onSelectDate
}) => {
  const timelineData = getTimelineData(articles);

  return (
    <div className="bg-white rounded-xl border border-sand-300 shadow-xs p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-sand-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-saffron-600" />
          <h3 className="text-sm sm:text-base font-serif font-bold text-navy-900">
            30-Day Operational Chronology (1 Sep – 3 Oct 2026)
          </h3>
        </div>

        {selectedDate && (
          <button
            type="button"
            onClick={() => onSelectDate(null)}
            className="text-xs font-mono text-saffron-700 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Reset to full 30-day view</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="mt-3 overflow-x-auto pb-2 no-scrollbar">
        <div className="flex items-end gap-2 min-w-max pt-6 pb-2">
          {timelineData.map(({ date, count }) => {
            const isSelected = selectedDate === date;
            const dayNum = date.split('-')[2];
            const monthStr = date.split('-')[1] === '09' ? 'Sep' : 'Oct';

            return (
              <button
                key={date}
                type="button"
                onClick={() => onSelectDate(isSelected ? null : date)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all min-w-[54px] border ${
                  isSelected
                    ? 'bg-navy-900 text-ivory-100 border-saffron-500 ring-2 ring-saffron-500/20'
                    : 'bg-ivory-100 text-navy-900 border-sand-300 hover:bg-sand-200'
                }`}
                aria-pressed={isSelected}
                aria-label={`${dayNum} ${monthStr}: ${count} stories`}
              >
                {/* Count Pill */}
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full mb-1.5 ${
                    isSelected
                      ? 'bg-saffron-600 text-white'
                      : 'bg-sand-300 text-navy-900'
                  }`}
                >
                  {count}
                </span>

                {/* Day Number */}
                <span className="text-sm font-display font-bold leading-none">
                  {dayNum}
                </span>

                {/* Month Tag */}
                <span className="text-[10px] font-mono uppercase tracking-wider text-sand-500 mt-1">
                  {monthStr}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
