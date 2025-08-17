import { useState } from "react";
import "./Menu.css";

export default function Menu({
  selectedChair,
  setSelectedChair,
  selectedTable,
  setSelectedTable,
}) {
  const [chairOpen, setChairOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);

  const chairs = [
    { id: "chair1", label: "Chair Set 1" },
    { id: "chair2", label: "Chair Set 2" },
    { id: "chair3", label: "Chair Set 3" },
  ];

  const tables = [
    { id: "table1", label: "Table Set 1" },
    { id: "table2", label: "Table Set 2" },
    { id: "table3", label: "Table Set 3" },
  ];

  return (
    <div className="menu">
      <h2>Menu</h2>

      {/* --- Chair Configurator --- */}
      <div className="menu-section">
        <button
          className="menu-toggle"
          onClick={() => setChairOpen((prev) => !prev)}
        >
          Chair Configurator
          <span className={`arrow ${chairOpen ? "up" : "down"}`}></span>
        </button>

        {chairOpen && (
          <div className="menu-options">
            {chairs.map((chair) => (
              <div
                key={chair.id}
                className={`menu-option ${selectedChair === chair.id ? "active" : ""
                  }`}
                onClick={() => {
                  setSelectedChair(chair.id);
                  setChairOpen(true);
                  setTableOpen(false);

                }}
              >
                {chair.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Table Configurator --- */}
      <div className="menu-section">
        <button
          className="menu-toggle"
          onClick={() => setTableOpen((prev) => !prev)}
        >
          Table Configurator
          <span className={`arrow ${tableOpen ? "up" : "down"}`}></span>
        </button>

        {tableOpen && (
          <div className="menu-options">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`menu-option ${selectedTable === table.id ? "active" : ""
                  }`}
                onClick={() => {
                  setSelectedTable(table.id);
                  setTableOpen(true);
                  setChairOpen(false);

                }}
              >
                {table.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
