'use client'

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    faithPromise: '',
    paymentMethod: '',
    proofOfTransfer: null,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      proofOfTransfer: e.target.files[0],
    }));
    setTouched((prevTouched) => ({ ...prevTouched, proofOfTransfer: true }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama Lengkap wajib diisi.';
    }

    const numericPromise = Number(formData.faithPromise.replace(/\D/g, ''));
    if (isNaN(numericPromise) || numericPromise <= 0) {
      newErrors.faithPromise = 'Janji Iman harus dalam format IDR yang valid.';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Metode Pembayaran wajib dipilih.';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const formatAsIDR = (value) => {
    const numericValue = Number(value.replace(/\D/g, ''));
    if (isNaN(numericValue)) return '';
    return 'IDR ' + numericValue.toLocaleString('id-ID');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    setTouched({
      fullName: true,
      faithPromise: true,
      paymentMethod: true,
    });

    if (isFormValid) {
      console.log("Simulating data submission to Google Sheet:");
      console.log(formData);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setFormData({
          fullName: '',
          faithPromise: '',
          paymentMethod: '',
          proofOfTransfer: null,
        });
        setTouched({});
        setShowSuccessMessage(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex items-center justify-center space-x-2 text-blue-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-8 w-8 text-blue-600 fill-current">
            <path d="M432 0H160c-26.5 0-48 21.5-48 48v416c0 26.5 21.5 48 48 48h272c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM152 48a8 8 0 018-8h272a8 8 0 018 8v416a8 8 0 01-8 8H160a8 8 0 01-8-8V48zM48 96v352c0 26.5-21.5 48-48 48V48c0-26.5 21.5-48 48-48zM400 64v32H160v-32h240zM160 128h240v32H160v-32zM400 192v32H160v-32h240zM160 256h240v32H160v-32zM400 320v32H160v-32h240zM160 384h240v32H160v-32z" fill="currentColor" />
          </svg>
          <h1 className="text-3xl font-bold text-center text-blue-900">
            Form Janji Iman
          </h1>
        </div>

        {showSuccessMessage ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md" role="alert">
            <p className="font-bold">Pernyataan berhasil dikirim!</p>
            <p>Data Anda telah berhasil dikirim. Terima kasih atas Janji Iman Anda.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  touched.fullName && errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {touched.fullName && errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="faithPromise" className="block text-sm font-medium text-gray-700">
                Janji Iman (IDR Format) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="faithPromise"
                name="faithPromise"
                value={formatAsIDR(formData.faithPromise)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({ ...formData, faithPromise: rawValue });
                }}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  touched.faithPromise && errors.faithPromise ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {touched.faithPromise && errors.faithPromise && (
                <p className="mt-1 text-sm text-red-500">{errors.faithPromise}</p>
              )}
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700">
                Metode Pembayaran <span className="text-red-500">*</span>
              </span>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="cash"
                    name="paymentMethod"
                    type="radio"
                    value="Cash"
                    checked={formData.paymentMethod === 'Cash'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                    Cash
                  </label>
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <input
                      id="transfer"
                      name="paymentMethod"
                      type="radio"
                      value="Transfer"
                      checked={formData.paymentMethod === 'Transfer'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="transfer" className="ml-3 block text-sm font-medium text-gray-700">
                      Transfer
                    </label>
                  </div>
                  {formData.paymentMethod === 'Transfer' && (
                    <div>
                      <p className="mt-1 text-xs text-gray-500 italic">
                        Transfer ke rekening BCA 7305025445 a/n GBI ALTAR FILADELFIA.
                      </p>
                      <p className="mt-1 text-xs text-gray-500 italic">
                        Jangan lupa untuk menambahkan Rp 1 sebagai kode unik (Contoh: Rp. 100.000 menjadi Rp. 100.001)
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {touched.paymentMethod && errors.paymentMethod && (
                <p className="mt-1 text-sm text-red-500">{errors.paymentMethod}</p>
              )}
            </div>

            {formData.paymentMethod === 'Transfer' && (
              <div>
                <label htmlFor="proofOfTransfer" className="block text-sm font-medium text-gray-700">
                  Bukti Transfer
                </label>
                <input
                  type="file"
                  id="proofOfTransfer"
                  name="proofOfTransfer"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
