import PropTypes from "prop-types";
import { PiCalendarFill } from "react-icons/pi";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { useRef, useState } from "react";

import { useClickOutside } from "../../../../../hooks";
import { Form } from "react-bootstrap";
registerLocale("ru", ru);

const DatePicker = ({
  name,
  value,
  children,
  containerClass,
  childrenClass,
  showIcon,
  isMonthYearPicker,
  error,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const iconRef = useRef(null);

  const toggleCalendarOpen = () => {
    setIsOpen((prev) => !prev);
  };

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
  useClickOutside(iconRef, undefined, toggleCalendarOpen);

  const renderDefaultChildren = (
    <Form.Control className={error ? "is-invalid" : "is-valid"} />
  );

  return (
    <>
      <div className={containerClass} ref={calendarRef}>
        {showIcon && (
          <div className="cursor-pointer" ref={iconRef}>
            <PiCalendarFill
              size={37}
              className="mr-1 border rounded p-1.5"
            />
          </div>
        )}
        <ReactDatePicker
          locale="ru"
          calendarStartDay={1}
          todayButton="Сегодня"
          dateFormat="dd.MM.yyyy"
          open={isOpen}
          selected={value}
          customInput={children || renderDefaultChildren}
          className={childrenClass}
          showMonthYearPicker={isMonthYearPicker}
          onChange={handleDateChange}
          onInputClick={onInputClick}
        />
      </div>
      {error && (
        <div className="text-sm text-danger pt-1 mb-3">{error}</div>
      )}
    </>
  );
};

DatePicker.defaultProps = {
  containerClass: "flex",
  isMonthYearPicker: false,
  showIcon: true
  // childrenClass: "w-28 pl-1"
};

DatePicker.propTypes = {
  children: PropTypes.node,
  containerClass: PropTypes.string,
  childrenClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null])
  ]).isRequired,
  showIcon: PropTypes.bool,
  isMonthYearPicker: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default DatePicker;
