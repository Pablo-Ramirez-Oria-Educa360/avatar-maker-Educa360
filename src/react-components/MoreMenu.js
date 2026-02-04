import React, { useState } from "react";

export function MoreMenu({ items }) {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <div className="menuContainer">
      <button
        className="menuButton"
        type="button"
        onClick={() => setMenuVisible(!menuVisible)}
        aria-label="More options"
        aria-expanded={menuVisible}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
      {menuVisible && <div className="menu">{items}</div>}
    </div>
  );
}
