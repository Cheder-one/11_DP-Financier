import PropTypes from "prop-types";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { useRef, useState } from "react";

import { useClickOutside } from "../../../../hooks";
registerLocale("ru", ru);

const DatePicker = ({
  name,
  value,
  children,
  containerClass,
  childrenClass,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const calendarRef = useRef(null);

  const onInputClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDateChange = (date) => {
    onChange({
      target: {
        name,
        value: date
      }
    });
  };

  useClickOutside(calendarRef, () => setIsOpen(false));

  return (
    <div className={containerClass} ref={calendarRef}>
      <ReactDatePicker
        locale="ru"
        calendarStartDay={1}
        todayButton="Сегодня"
        dateFormat="dd.MM.yyyy"
        open={isOpen}
        selected={value}
        customInput={children}
        className={childrenClass}
        onChange={handleDateChange}
        onInputClick={onInputClick}
      />
    </div>
  );
};

DatePicker.defaultProps = {
  // containerClass: "rounded w-fit",
  // childrenClass: "w-28 pl-1"
};

DatePicker.propTypes = {
  children: PropTypes.node,
  containerClass: PropTypes.string,
  childrenClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DatePicker;
