import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetails.css';
import vegIcon from '../../Images/veg.png';
import noteIcon from '../../Images/notes.png';
import preOrderIcon from '../../Images/calendar-days.png';

const ProductDetails = () => {
  const { state: product } = useLocation();
  const [selectedSize, setSelectedSize] = useState('Petit');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [note, setNote] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize time

  const sizes = [
    { name: 'Grande', desc: '8 inches (8–9 serves)' },
    { name: 'Petit', desc: '6 inches (4–5 serves)' },
    { name: 'Individual', desc: '3 inches (1 serves)' },
  ];

  const images = product?.images || [product?.img, product?.img, product?.img];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendarDays = () => {
    const currentYear = today.getFullYear();
    const daysInMonth = getDaysInMonth(calendarMonth, currentYear);
    const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const firstDayOfMonth = new Date(currentYear, calendarMonth, 1).getDay();

    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
      <div key={`blank-${i}`} className="calendar-day blank-day" />
    ));

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const thisDate = new Date(currentYear, calendarMonth, day);
      const isPast = thisDate < today;

      return (
        <div
          key={day}
          className={`calendar-day ${selectedDay === day ? 'selected-day' : ''} ${isPast ? 'disabled-day' : ''}`}
          onClick={() => {
            if (!isPast) {
              setSelectedDay(day);
              setSelectedDate(`${months[calendarMonth]} ${day}, ${currentYear}`);
            }
          }}
        >
          {day}
        </div>
      );
    });

    return (
      <>
        <div className="weekday-labels">
          {weekdayLabels.map(day => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {blanks}
          {days}
        </div>
      </>
    );
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={images[activeIndex]} alt={product?.name} />
        <div className="dot-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeIndex ? 'active-dot' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-details">
        <div className="title-row">
          <div>
            <p className="category">Berry Rasp</p>
            <h1 className="product-name">{product?.name}</h1>
            <p className="product-desc">
              Savor The Marriage Of Intensified Raspberries And Tart Passion Fruit Coupled With A Buttery
              Vanilla Almond Crust In Our Latest Drop
            </p>
          </div>
          <img src={vegIcon} alt="veg-icon" className="veg-icon" />
        </div>

        <h4 className="section-title">Choose Size</h4>
        <div className="size-options">
          {sizes.map((size) => {
            const isSelected = selectedSize === size.name;
            return (
              <div
                key={size.name}
                className={`size-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size.name)}
              >
                <div className="size-card-top">
                  <div className="radio-circle">
                    <div className={`inner-circle ${isSelected ? 'checked' : ''}`}></div>
                  </div>
                  <div className="size-info">
                    <p className="size-title">{size.name}</p>
                    <p className="size-desc">{size.desc}</p>
                  </div>
                </div>
                <div className={`price-strip ${isSelected ? 'selected-strip' : ''}`}>
                  Rs. 1299 + Charges.
                </div>
              </div>
            );
          })}
        </div>

        <p className="prep-time">Estimated Preparation Time : 1 Day</p>

        <h4 className="section-title">Storage & Care</h4>
        <p className="storage-text">
          Product needs to be refrigerated upon receipt and consumed within 2 days. Ideally this needs to be taken out of the fridge 20 minutes prior to service and consumed at room temperature. With time, this product might have some water loss around the circumference due to osmosis occuring within the fresh fruit. This is a natural process with fresh fruit desserts and does not need to be worried about.
        </p>

        <div className="note-section" onClick={() => setShowNotePopup(true)}>
          <span className="note-label">
            <img src={noteIcon} alt="note" style={{ width: '16px', marginRight: '8px', verticalAlign: 'middle' }} />
            Add Personalize Note
          </span>
          <span className="note-action">{note ? 'Edit Note' : 'Click To Add'}</span>
        </div>

        <div className="button-group">
          <button className="add-cart">Add to cart</button>
          <button className="pre-order" onClick={() => setShowCalendar(true)}>
            <img src={preOrderIcon} alt="preorder" style={{ width: '18px', marginRight: '8px', verticalAlign: 'middle' }} />
            {selectedDate ? `Delivery: ${selectedDate}` : 'Pre-Order Delivery'}
          </button>
        </div>
      </div>

      {/* Personal Note Popup */}
      {showNotePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Choose or Write a Note</h3>

            <div className="preset-notes">
              {["Happy Birthday!", "Congratulations!", "With Love ❤️"].map((msg) => (
                <div
                  key={msg}
                  className="preset-note"
                  onClick={() => setNote(msg)}
                >
                  {msg}
                </div>
              ))}
            </div>

            <textarea
              maxLength={100}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write something sweet... (max 100 characters)"
            />
            <div className="char-limit">{note.length}/100</div>

            <div className="popup-buttons">
              <button onClick={() => setShowNotePopup(false)}>Cancel</button>
              <button onClick={() => setShowNotePopup(false)}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Select a Delivery Date</h3>

            <div className="month-selector">
              {months.map((month, index) => (
                <div
                  key={month}
                  className={`month-option ${calendarMonth === index ? 'active-month' : ''}`}
                  onClick={() => {
                    setCalendarMonth(index);
                    setSelectedDay(null);
                  }}
                >
                  {month}
                </div>
              ))}
            </div>

            {renderCalendarDays()}

            <div className="popup-buttons">
              <button onClick={() => setShowCalendar(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
