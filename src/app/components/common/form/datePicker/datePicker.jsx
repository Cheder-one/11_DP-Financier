import PropTypes from "prop-types";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { useRef, useState } from "react";

import { toReadableDate } from "../../../../utils";
import { useClickOutside } from "../../../../hooks";
import CustomInput from "./customInput";
import TextField from "../textField";
registerLocale("ru", ru);

const DatePicker = ({ containerClass }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const calendarRef = useRef(null);

  console.log(toReadableDate(selectedDate).dateOnly);
  console.log({ selectedDate });

  const onInputClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useClickOutside(calendarRef, () => setIsOpen(false));

  return (
    <div className={containerClass} ref={calendarRef}>
      <ReactDatePicker
        selected={selectedDate}
        customInput={<TextField />}
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

DatePicker.defaultProps = {
  containerClass: "inline-block p-0 m-0"
};

DatePicker.propTypes = {
  containerClass: PropTypes.string
};

export default DatePicker;
