export const css = `
width: 380px;
.rdp {
  border-radius: 10px;


}
.rdp-months {
  border-collapse: separate;
  border-spacing: 8px;
  margin: 16px 0 0 0;
  padding: 16px;
  background-color: #28262e;
  border-radius: 0 0 10px 10px;
}
.rdp,
.rdp-months {
  width: 100%;
  margin: 0;
  border-radius: 10px;
  background: transparent;
}
.rdp-button {
  padding-bottom: 0px;
  background: var(--calendar-button);
  color: var(--white);
  border-radius: 10px;
  margin: 3px;
}
.rdp-button:hover {
  background: var(--orange) !important;
  filter: brightness(0.9);
}
.rdp-caption_label,
.rdp-head_cell {
  color: var(--white);
}
.rdp-nav {
  color: var(--white) !important;
}
.rdp-nav_prev {
  right: auto;
  left: 1.5em;
  margin-right: 0;
}
.rdp-button:focus:not([disabled]),
.rdp-button:active:not([disabled]) {
  border: none;
  color: var(--white);
  background: var(--orange);
}
.rdp-Caption {
  margin-bottom: 1em;
  padding: 0 1em;
  color: var(--white);
  > div {
    text-align: center;
  }
}
.rdp-day {
  width: 40px;
  height: 40px;
}
.rdp-day_available {
  background: #3e3b47;
  border-radius: 10px;
  color: var(--white);
}
.rdp:not(.DayPicker--interactionDisabled)
  .rdp-day:not(.rdp-day_disabled):not(.rdp-day_selected):not(.rdp-day_outside):hover {
  background: shade(0.2, '#3e3b47');
}
.rdp-day_today {
  font-weight: normal;
}
.rdp-day_disabled {
  color: #dcdcdc !important;
  background: transparent !important;
}
.rdp-day_selected {
  background: #ff9000 !important;
  border-radius: 10px;
  color: #232129 !important;
}



`;
