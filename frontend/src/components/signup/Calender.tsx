import { useState } from 'react';
import Flex from '../common/Flex';
import Text from '../common/Text';
import * as S from '../Style/Signup/Calender.styled';

function Calender() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [selectedDay, setSelectedDay] = useState(2);

  const years = Array.from({ length: 2024 - 1970 + 1 }, (_, i) => 1970 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(parseInt(e.target.value, 10));
  };

  return (
    <S.CalenderContainer>
      <div className="calender">
        <div className="calender-header">
          <Text $typography="t12" color="main">
            년
          </Text>
          <Text $typography="t12" color="main">
            월
          </Text>
          <Text $typography="t12" color="main">
            일
          </Text>
        </div>

        <div className="calender-body">
          <div className="calender-body-year calender-body-list">
            {years.map((year, index) => (
              <S.ScrollItem
                className="calender-body-item"
                key={index}
                // selected={year === currentYear}
              >
                {year}
              </S.ScrollItem>
            ))}
          </div>
          <div className="calender-body-month calender-body-list">
            {months.map((month, index) => (
              <S.ScrollItem
                className="calender-body-item"
                key={index}
                // selected={month === currentMonth}
              >
                {month.toString().padStart(2, '0')}
              </S.ScrollItem>
            ))}
          </div>
          <div className="calender-body-date calender-body-list">
            {days.map((day, index) => (
              <S.ScrollItem
                className="calender-body-item"
                key={index}
                // selected={day === currentDay}
              >
                {day.toString().padStart(2, '0')}
              </S.ScrollItem>
            ))}
          </div>
        </div>
      </div>
    </S.CalenderContainer>
  );
}

export default Calender;
