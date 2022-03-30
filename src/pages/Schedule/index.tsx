import { useState } from 'react';
import DayPicker from 'react-day-picker';
import { useParams } from 'react-router-dom';

import { useBarbeiro } from 'contexts/Barbeiro';
import { useTheme } from 'contexts/Theme';

import styles from './Schedule.module.scss';

export function Schedule() {
  const params = useParams();
  const { theme } = useTheme();
  const { barbeiro } = useBarbeiro();
  const [selectDay, setSelectDay] = useState(new Date());

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  params;

  return (
    <>
      <style>
        {`
          width: 380px;
          .DayPicker {
            background: #28262e;
            border-radius: 10px;
          }
          .DayPicker-wrapper {
            padding-bottom: 0;
          }
          .DayPicker,
          .DayPicker-Month {
            width: 100%;
          }
          .DayPicker-Month {
            border-collapse: separate;
            border-spacing: 8px;
            margin: 16px;
          }
          .DayPicker-Day {
            width: 40px;
            height: 40px;
          }
          .DayPicker-Day--available:not(.DayPicker-Day--outside) {
            background: #3e3b47;
            border-radius: 10px;
            color: #000;
          }
          .DayPicker:not(.DayPicker--interactionDisabled)
            .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
            background: shade(0.2, "#3e3b47");
          }
          .DayPicker-Day--today {
            font-weight: normal;
          }
          .DayPicker-Day--disabled {
            color: #666360 !important;
            background: transparent !important;
          }
          .DayPicker-Day--selected {
            background: #ff9000 !important;
            border-radius: 10px;
            color: #232129 !important;
          }
          .DayPicker-Caption > div {
            color: #f4ede8;
          }
        }

        `}
      </style>
      <div className={styles.home} data-theme={theme}>
        <div className={styles.container}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div
              key={barbeiro?.id}
              style={{
                display: 'flex',
                width: '250px',
                height: '50px',
                background: '#FF9000',
                borderRadius: '10px',
                marginTop: '12px',
                marginBottom: '12px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  marginLeft: '6px',
                }}
              >
                <img
                  src={barbeiro?.avatar_url || barbeiro?.picture}
                  alt={barbeiro?.nome}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '40px',
                    marginLeft: '12px',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  marginLeft: '6px',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}
              >
                <h2
                  style={{
                    fontSize: '18px',
                    marginTop: '0px',
                    color: '#232129',
                  }}
                >
                  {barbeiro?.nome}
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.calendar}>
            <DayPicker
              weekdaysShort={weekDays}
              onDayClick={(day) => {
                setSelectDay(day);
              }}
              fromMonth={new Date()}
              selectedDays={selectDay}
              modifiers={{
                available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              }}
              disabledDays={[
                {
                  before: new Date(),
                },
              ]}
              months={meses}
            />
          </div>
          <p>
            {selectDay > new Date()
              ? `Você selecionou o dia ${selectDay.toLocaleDateString()}`
              : 'Você não pode selecionar um dia passado'}
          </p>
        </div>
      </div>
    </>
  );
}
