import React, { useEffect, useState } from "react";
import axios from "axios";

const GuestForm = () => {
  const guestDetail = {
    name: "",
    emailId: "",
    phoneNumber: 0,
    adults: 0,
    children: 0,
    checkIn: null,
    checkOut: null,
    roomCategory: 0,
  };

  const [guestDet, setGuestDet] = useState(guestDetail);
  const [guestsData, setGuestsData] = useState([]);
  const [filterRoom, setFilterRoom] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/guests")
      .then((resp) => {
        console.log("resp", resp);
        return setGuestsData(resp.data);
      })
      .catch((err) => console.log("error", err));
  }, []);

  const fieldChange = (event) => {
    const { name, value } = event.target;
    setGuestDet({ ...guestDet, [name]: value });
  };

  const guestFormSubmit = () => {
    axios
      .post("http://localhost:3000/guests", guestDet)
      .then((resp) => {
        console.log("response", resp);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  // const filterGuests = (event) => {
  //   const { value } = event.target;
  //   setFilterRoom(value);
  //   axios
  //     .get("http://localhost:3000/guests")
  //     .then((resp) => {
  //       console.log("resp", resp);
  //       return setGuestsData(
  //         resp.data.filter((info) => info.roomCategory === value)
  //       );
  //     })
  //     .catch((err) => console.log("error", err));
  // };

  const {
    name,
    emailId,
    phoneNumber,
    adults,
    children,
    checkIn,
    checkOut,
    roomCategory,
  } = guestDet;
  return (
    <div>
      <center>
        <form onSubmit={() => guestFormSubmit()}>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => fieldChange(e)}
          />
          <br />
          <input
            type="email"
            placeholder="emailId"
            name="emailId"
            value={emailId}
            onChange={(e) => fieldChange(e)}
          />
          <br />
          <input
            type="number"
            placeholder="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => fieldChange(e)}
          />
          <br />
          <input
            type="number"
            placeholder="adults"
            name="adults"
            value={adults}
            onChange={(e) => fieldChange(e)}
          />

          <br />
          <input
            type="number"
            placeholder="children"
            name="children"
            value={children}
            onChange={(e) => fieldChange(e)}
          />

          <br />
          <input
            type="date"
            placeholder="checkIn"
            name="checkIn"
            value={checkIn}
            onChange={(e) => fieldChange(e)}
          />
          <br />
          <input
            type="date"
            placeholder="checkOut"
            name="checkOut"
            value={checkOut}
            onChange={(e) => fieldChange(e)}
          />
          <br />
          <input
            type="number"
            placeholder="roomCategory"
            name="roomCategory"
            value={roomCategory}
            onChange={(e) => fieldChange(e)}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </center>
      {guestsData.map((info) => (
        <div
          key={info.id}
          style={{
            backgroundColor: "orange",
            border: "5px solid red",
            margin: "2px",
            padding: "5px",
          }}
        >
          <h5>{info.name}</h5>
          <h5>{info.emailId}</h5>
          <h5>{info.phoneNumber}</h5>
          <h5>{info.adults}</h5>
          <h5>{info.children}</h5>
          <h5>{info.checkIn}</h5>
          <h5>{info.checkOut}</h5>
          <h5>{info.roomCategory}</h5>
        </div>
      ))}
      {/* <br />
      <label>Filter: </label>
      <input
        type="number"
        value={filterRoom}
        onChange={(e) => filterGuests(e)}
      /> */}
    </div>
  );
};

export default GuestForm;
