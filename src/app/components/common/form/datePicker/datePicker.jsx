import PropTypes from "prop-types";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { useRef, useState } from "react";

import { useClickOutside } from "../../../../hooks";
registerLocale("ru", ru);

const DatePicker = ({ containerClass, childrenClass }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const calendarRef = useRef(null);

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
        open={isOpen}
        className={childrenClass}
        selected={selectedDate}
        // customInput={<CustomInput />}
        onChange={handleDateChange}
        onInputClick={onInputClick}
        locale="ru"
        calendarStartDay={1}
        todayButton="Сегодня"
        dateFormat="dd.MM.yyyy"
      />
    </div>
  );
};

DatePicker.defaultProps = {
  containerClass: "border-2 rounded w-fit",
  childrenClass: "w-28 pl-1"
};

DatePicker.propTypes = {
  containerClass: PropTypes.string
};

export default DatePicker;
