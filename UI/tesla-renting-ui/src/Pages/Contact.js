import React from "react";

const Contact = () => {
  const fakeContactData = {
    company: "TeslaRenting in Mallorca",
    address: "123 Main Street, Mallorca, Spain",
    email: "info@teslarenting-mallorca.com",
    phone: "+123 456 7890",
  };

  return (
    <div className="content">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or need further assistance, feel free to get
        in touch with us. We're here to help!
      </p>
      <ul>
        <li>
          <strong>Company:</strong> {fakeContactData.company}
        </li>
        <li>
          <strong>Address:</strong> {fakeContactData.address}
        </li>
        <li>
          <strong>Email:</strong> {fakeContactData.email}
        </li>
        <li>
          <strong>Phone:</strong> {fakeContactData.phone}
        </li>
      </ul>
    </div>
  );
};

export default Contact;
