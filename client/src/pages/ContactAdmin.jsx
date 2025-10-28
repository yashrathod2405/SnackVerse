import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactAdmin = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/contacts/");
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        setError("Failed to fetch contact submissions");
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <Header />
          <div className="flex justify-center items-center py-20">
            <p className="text-xl text-gray-600">Loading contact submissions...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <Header />
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchContacts}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-600">Contact Submissions</h1>
            <div className="flex gap-4">
              <button
                onClick={fetchContacts}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <button
                onClick={() => navigate('/orders-admin')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                View Orders
              </button>
            </div>
          </div>

          {contacts.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">No contact submissions yet</h2>
              <p className="text-gray-500">Contact form submissions will appear here when users send messages.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="mb-4 text-gray-600">
                Total submissions: {contacts.length}
              </div>
              
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
                        <p className="text-yellow-600 font-medium">{contact.email}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(contact.created_at).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-2">Message:</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{contact.message}</p>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <a
                        href={`mailto:${contact.email}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm transition-colors"
                      >
                        Reply via Email
                      </a>
                      <button
                        onClick={() => navigator.clipboard.writeText(contact.email)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm transition-colors"
                      >
                        Copy Email
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactAdmin;
