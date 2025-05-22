import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Pay from "./component-end/pay";

const root = ReactDOM.createRoot(document.querySelector("#root"));
let tickets = [];
let movie = "";
let count = 0;
let adminOverride = false;
let seatOwners = {};
let currentUserType = "Regular";
let selectedCount = 0;
let groupSize = 0;

const unavailableSeats = new Set();
const elderlyFriendlySeats = new Set();

function toggleAdminOverride() {
  adminOverride = !adminOverride;
  alert(`Admin override is now ${adminOverride ? "ENABLED" : "DISABLED"}`);
  if (adminOverride) {
    console.log("Current Seat Assignments:", seatOwners);
  }
}

function handleUserTypeChange(event) {
  currentUserType = event.target.value;
}

function Getno() {
  const tick = document.getElementById("get");
  if (count !== 1) {
    for (let i = 1; i <= 10; i++) {
      const inp = document.createElement("option");
      inp.value = i;
      inp.innerHTML = i;
      tick.appendChild(inp);
    }
  }
  count = 1;
  if (tick.value !== "0") {
    const book = document.querySelector("#book");
    book.style.display = "block";
  }
}

class Logo extends React.Component {
  constructor(props) {
    super(props);
    movie = props.movie;
  }

  render() {
    return (
      <div style={{ background: "black", color: "white", paddingBottom: "20px" }}>
        <center>
          <h1 id="title">ticketsnatcher</h1>
          <p id="inter">Enter number of tickets to be booked</p>
          <select id="get" onClick={Getno}>
            <option>select</option>
          </select>

          <div style={{ marginTop: "10px" }}>
            <label>User Type: </label>
            <select onChange={handleUserTypeChange} defaultValue="Regular">
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
              <option value="Accessible">Accessible</option>
              <option value="Elderly">Elderly</option>
              <option value="Child">Child</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div id="book" onClick={init} style={{ marginTop: "10px", cursor: "pointer" }}>
            Book
          </div>

          <button onClick={toggleAdminOverride} style={{ marginTop: "10px" }}>
            Toggle Admin Override
          </button>

          <div>
            <table id="col" style={{ display: "none", marginTop: "20px" }}>
              <tbody>
                {["A", "B", "C", "D", "E", "F", "G"].map(row => (
                  <tr id={row} key={row}><td>{row}</td></tr>
                ))}
              </tbody>
            </table>

            <button
              id="pay"
              style={{ display: "none", marginTop: "10px" }}
              onClick={() => {
                root.render(<Pay ticket={tickets} movie={movie} />);
              }}
            >
              Go to Payment
            </button>

            <div style={{ marginTop: "15px", fontSize: "14px" }}>
              <strong>Legend:</strong><br />
              <span style={{ background: "red", padding: "2px 6px", marginRight: "5px" }}>Selected</span>
              <span style={{ background: "#ffd700", padding: "2px 6px", marginRight: "5px" }}>VIP</span>
              <span style={{ background: "#90ee90", padding: "2px 6px", marginRight: "5px" }}>Accessible</span>
              <span style={{ background: "#f08080", padding: "2px 6px", marginRight: "5px" }}>No Children</span>
              <span style={{ background: "#add8e6", padding: "2px 6px", marginRight: "5px" }}>Elderly Friendly</span>
              <span style={{ background: "black", color: "white", padding: "2px 6px", marginRight: "5px" }}>Unavailable</span>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

function remticks(arr, value) {
  return arr.filter(ele => ele !== value);
}

function getRandomUnavailableSeats() {
  const totalSeats = [];
  for (let row of ["A", "B", "C", "D", "E", "F", "G"]) {
    for (let j = 0; j < 10; j++) {
      totalSeats.push(`${row}${j}`);
    }
  }
  while (unavailableSeats.size < 5) {
    const randomIndex = Math.floor(Math.random() * totalSeats.length);
    unavailableSeats.add(totalSeats[randomIndex]);
  }
}

function getElderlyFriendlySeats() {
  for (let row of ["C", "D", "F"]) {
    for (let j = 1; j < 9; j++) {
      elderlyFriendlySeats.add(`${row}${j}`);
    }
  }
}

function init() {
  tickets = [];
  selectedCount = 0;
  seatOwners = {};
  unavailableSeats.clear();
  elderlyFriendlySeats.clear();

  getRandomUnavailableSeats();
  getElderlyFriendlySeats();

  const tick = document.getElementById("get");
  groupSize = parseInt(tick.value);
  const col = document.getElementById("col");
  const get = document.getElementById("get");
  const pay = document.getElementById("pay");

  document.getElementById("inter").innerHTML = "Select your tickets";
  get.style.display = "none";
  document.getElementById("book").style.display = "none";
  col.style.display = "block";

  col.innerHTML = "";
  for (let rowLabel of ["A", "B", "C", "D", "E", "F", "G"]) {
    const row = document.createElement("tr");
    row.id = rowLabel;

    const labelCell = document.createElement("td");
    labelCell.innerText = rowLabel;
    row.appendChild(labelCell);

    for (let j = 0; j < 10; j++) {
      const seat = document.createElement("td");
      const seatId = `${rowLabel}${j}`;
      seat.style.height = "20px";
      seat.style.width = "20px";
      seat.style.cursor = "pointer";
      seat.style.margin = "5px";
      seat.style.border = "1px solid black";
      seat.style.borderRadius = "5px";
      seat.style.background = "white";

      // Unavailable/broken seats
      if (unavailableSeats.has(seatId)) {
        seat.style.background = "black";
        seat.style.cursor = "not-allowed";
        seat.title = "Unavailable";
        row.appendChild(seat);
        continue;
      }

      // VIP zone
      if ((rowLabel === "A" || rowLabel === "B") && j >= 3 && j <= 6) {
        seat.style.background = "#ffd700";
        seat.setAttribute("data-type", "VIP");
      }

      // Accessible seats
      if (rowLabel === "G" && (j === 0 || j === 9)) {
        seat.style.background = "#90ee90";
        seat.setAttribute("data-type", "Accessible");
      }

      // Age-restricted row for children (e.g., no children in row E)
      if (rowLabel === "E") {
        seat.setAttribute("data-restrict", "NoChildren");
        seat.style.background = "#f08080";
      }

      // Elderly-friendly seating
      if (elderlyFriendlySeats.has(seatId)) {
        seat.setAttribute("data-elderly", "true");
        seat.style.background = "#add8e6";
      }

      // eslint-disable-next-line no-loop-func
      seat.addEventListener("click", () => {
        const seatType = seat.getAttribute("data-type") || "Normal";
        const isSelected = seat.style.background === "red";
        const isNoChildZone = seat.getAttribute("data-restrict") === "NoChildren";

        if (isSelected) {
          if (adminOverride || currentUserType === "Admin" || seatOwners[seatId] === currentUserType) {
            const originalColor = seatType === "VIP"
              ? "#ffd700"
              : seatType === "Accessible"
              ? "#90ee90"
              : isNoChildZone
              ? "#f08080"
              : elderlyFriendlySeats.has(seatId)
              ? "#add8e6"
              : "white";

            seat.style.background = originalColor;
            tickets = remticks(tickets, seatId);
            delete seatOwners[seatId];
            selectedCount--;
            pay.style.display = "none";
          } else {
            alert("You can't deselect another user's seat.");
          }
          return;
        }

        if (!adminOverride && selectedCount >= groupSize) {
          alert(`You can only select ${groupSize} seat(s).`);
          return;
        }

        if (!adminOverride && currentUserType !== "Admin") {
          if (seatType === "VIP" && currentUserType !== "VIP") {
            alert("Only VIP users can select VIP seats.");
            return;
          }
          if (seatType === "Accessible" && currentUserType !== "Accessible") {
            alert("Only Accessible users can select Accessible seats.");
            return;
          }
          if (isNoChildZone && currentUserType === "Child") {
            alert("Children are not allowed in this row.");
            return;
          }
        }

        if (!adminOverride && groupSize > 1 && tickets.length > 0) {
          const last = tickets[tickets.length - 1];
          const lastRow = last[0];
          const lastIndex = parseInt(last.substring(1));
          const sameRow = lastRow === rowLabel;
          const adjacent = Math.abs(j - lastIndex) <= 1;

          if (!sameRow || !adjacent) {
            alert("Select adjacent seats in the same row.");
            return;
          }
        }

        if (
          !adminOverride &&
          groupSize === 1 &&
          j > 0 &&
          j < 9 &&
          row.children[j]?.style.background === "red" &&
          row.children[j + 2]?.style.background === "red"
        ) {
          alert("Solo attendee cannot sit between group seats.");
          return;
        }

        // Accept seat
        seat.style.background = "red";
        tickets.push(seatId);
        seatOwners[seatId] = currentUserType;
        selectedCount++;

        if (selectedCount === groupSize) {
          pay.style.display = "block";
        }
      });

      row.appendChild(seat);
    }

    col.appendChild(row);
  }
}

export default Logo;
