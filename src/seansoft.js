import React, { useEffect, useState } from "react";
import axios from "axios";
const SeanSoft = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
  });
  const [editingContactId, setEditingContactId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingContactId) {
      // Update existing contact
      try {
        const response = await axios.put(
          `http://localhost:5000/api/contact/${editingContactId}`,
          formData
        );
        alert(response.data.message);
        setEditingContactId(null); // Reset editing state
      } catch (error) {
        console.error("Error updating the contact", error);
      }
    } else {
      // Create new contact
      try {
        const response = await axios.post(
          "http://localhost:5000/api/contact",
          formData
        );
        alert(response.data.message);
      } catch (error) {
        console.error("Error posting to the API", error);
      }
    }
    setFormData({ name: "", address: "", age: "" });
    fetchContacts();
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fetch");
      setContacts(response.data);
    } catch (error) {
      console.error("error fetching the api", error);
    }
  };

  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      address: contact.address,
      age: contact.age,
    });
    setEditingContactId(contact.id);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete one of your data in your database?"
      )
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/contact/${id}`
        );
        alert(response.data.message);
        fetchContacts();
      } catch (error) {
        console.log("Error Deleting your data from your contacts", error);
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      

      <div className="bg white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">CONTACT FORM</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Name:
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-800 transition duration-200"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Address:
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-800 transition duration-200"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Age:
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-800 transition duration-200"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="mt-5 bg-blue-800 text-white p-2 rounded w-full hover:bg-blue-700 transition duraction-200"
            type="submit"
          >
            {editingContactId ? "Update Contact" : "Add to Contacts"}
          </button>
        </form>
      </div>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-blue-800">CONTACT LIST</h2>
        <ul className="bg-white rounded-lg shadow-lg">
          {contacts.map((contact) => (
            <li
              className="flex justify-between items-center p-4 border-b last:border-b-0 hover:bg-gray-100 transition duration-200"
              key={contact.id}
            >
              <span className="text-gray-700">
                {contact.name} - {contact.address} - {contact.age}{" "}
              </span>
              <button
                onClick={() => handleEdit(contact)}
                className="text-blue-600 hover:text-blue-800 transition duration-200"
              >
                Edit
              </button>
              <button onClick={() => handleDelete(contact.id)} className="ml-4 text-red-600 hover:text-red-800 transition duration-200">DELETE</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SeanSoft;
