import React, { useEffect, useState } from "react";
import { Contact } from "../types/contact";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 font-semibold text-lg">Error: {error}</p>
          <p className="text-gray-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 phone:w-full tablet:w-3/4 desktop:w-1/2">

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-6">Contacts</h1>
        {contacts.length > 0 ? (
          <ul role="list" className="divide-y divide-gray-100">
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className="flex flex-col md:flex-row justify-between gap-4 py-4 hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="h-10 w-10 md:h-12 md:w-12 flex-none rounded-full bg-gray-50"
                    src={`https://ui-avatars.com/api/?name=${contact.name}&background=random`}
                    alt={contact.name}
                  />
                  <div className="ml-6">
                    <Link
                      to={`/contact/${contact.id}`}
                      className="text-lg font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      {contact.name}
                    </Link>
                    <p className="mt-1 truncate text-sm text-gray-500 flex items-center gap-2">
                      <FaEnvelope /> {contact.email}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FaPhone /> {contact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:items-end text-sm text-gray-500 gap-1">
                  <p className="flex items-center gap-2">
                    <FaBuilding /> {contact.company.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt /> {contact.address.city}, {contact.address.street}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No contacts available.</p>
        )}
      </div>
    </div>
  );
};

export default ContactsList;
