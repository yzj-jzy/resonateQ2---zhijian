import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Contact } from "../types/contact";

const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contact");
        }
        const data: Contact = await response.json();
        setContact(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact...</p>
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

  if (!contact) {
    return null;
  }

  const isInvalidGeo =
    parseFloat(contact.address.geo.lat) === 0 ||
    parseFloat(contact.address.geo.lng) === 0 ||
    parseFloat(contact.address.geo.lat) > 90 ||
    parseFloat(contact.address.geo.lat) < -90 ||
    parseFloat(contact.address.geo.lng) > 180 ||
    parseFloat(contact.address.geo.lng) < -180;

  const mapSrc = isInvalidGeo
    ? null
    : `https://www.google.com/maps/embed/v1/view?key=AIzaSyDjfpF-UIk3plR6zYtgwWVWQVr4zirA3ko&center=${contact.address.geo.lat},${contact.address.geo.lng}&zoom=14`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{contact.name}</h1>
        <Link
          to="/"
          className="inline-block px-6 py-2 mb-8 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Back to Contacts
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Details</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-xl font-medium text-gray-600 mb-3 phone:text-md">Company Information</h3>
              <dl>
                <div className="py-2 flex justify-between phone:flex-col">
                  <dt className="text-sm font-medium text-gray-600">Name</dt>
                  <dd className="text-sm text-gray-800 phone:mt-1">
                    {contact.company.name}
                  </dd>
                </div>
                <div className="py-2 flex justify-between phone:flex-col">
                  <dt className="text-sm font-medium text-gray-600">CatchPhrase</dt>
                  <dd className="text-sm text-gray-800 phone:mt-1">
                    {contact.company.catchPhrase}
                  </dd>
                </div>
                <div className="py-2 flex justify-between phone:flex-col">
                  <dt className="text-sm font-medium text-gray-600">Business</dt>
                  <dd className="text-sm text-gray-800 phone:mt-1">
                    {contact.company.bs}
                  </dd>
                </div>
              </dl>
            </div>
            <dl className="mt-6">
              <div className="py-4 phone:py-1 flex justify-between phone:flex-col">
                <dt className="text-sm font-medium text-gray-600">Username</dt>
                <dd className="text-sm text-gray-800 phone:mt-1">{contact.username}</dd>
              </div>
              <div className="py-4 phone:py-1 flex justify-between phone:flex-col">
                <dt className="text-sm font-medium text-gray-600">Email</dt>
                <dd className="text-sm text-gray-800 phone:mt-1">{contact.email}</dd>
              </div>
              <div className="py-4 phone:py-1 flex justify-between phone:flex-col">
                <dt className="text-sm font-medium text-gray-600">Phone</dt>
                <dd className="text-sm text-gray-800 phone:mt-1">{contact.phone}</dd>
              </div>
              <div className="py-4 phone:py-1 flex justify-between phone:flex-col">
                <dt className="text-sm font-medium text-gray-600">Website</dt>
                <dd className="text-sm text-gray-800 phone:mt-1">{contact.website}</dd>
              </div>
              <div className="py-4 phone:py-1 flex justify-between phone:flex-col">
                <dt className="text-sm font-medium text-gray-600">Address</dt>
                <dd className="text-sm text-gray-800 phone:mt-1">
                  {`${contact.address.street}, ${contact.address.suite}, ${contact.address.city}, ${contact.address.zipcode}`}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-6 lg:mt-0">
            {mapSrc ? (
              <iframe
                title="Google Maps"
                width="100%"
                height="400"
                className="rounded-lg border border-gray-300 shadow-md"
                style={{ border: 0, marginTop: "1rem" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
              ></iframe>
            ) : (
              null
            )}
            <p className="text-center text-sm text-red-500 mt-4">
              Map may not be displayed due to virtual address data from jsonplaceholder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
