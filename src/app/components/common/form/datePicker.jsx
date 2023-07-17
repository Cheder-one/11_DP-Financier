import PropTypes from "prop-types";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { forwardRef, useEffect, useRef, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";

import { toReadableDate } from "../../../utils";
import useClickOutside from "../../../hooks/useClickOutside";
registerLocale("ru", ru);

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div className="flex items-center cursor-pointer" onClick={onClick}>
    <span className="select-none">{value}</span>
    <MdOutlineDateRange
      className="flex items-center justify-center mr-0.5"
      size={20}
    />
  </div>
));

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const calendarRef = useRef(null);

  console.log(toReadableDate(selectedDate).dateOnly);

  const onInputClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useClickOutside(calendarRef, () => setIsOpen(false));

  return (
    <div className="inline-block p-0 m-0" ref={calendarRef}>
      <ReactDatePicker
        selected={selectedDate}
        customInput={<CustomInput />}
        locale="ru"
        calendarStartDay={1}
        todayButton="Сегодня"
        dateFormat="dd.MM.yyyy"
        onChange={handleDateChange}
        onInputClick={onInputClick}
        open={isOpen}
      />
    </div>
  );
};

CustomInput.displayName = "CustomInput";

export default DatePicker;
