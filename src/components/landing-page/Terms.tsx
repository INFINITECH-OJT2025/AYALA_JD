"use client";

import Image from "next/image";

export default function TermsPrivacy() {
  // ✅ Use default export
  return (
    <div className="relative container mx-auto px-4 py-8 min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/ayalapic3.jpg"
          alt="Ayala Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-50 dark:opacity-40"
        />
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Terms and Privacy Policy
      </h1>

      <section className="mb-8 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Terms and Conditions
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Welcome to Ayala Land. By accessing our website and services, you
          agree to comply with the following Terms and Conditions.
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300">
          <li>You must be at least 18 years old to use our services.</li>
          <li>
            All content is the property of Ayala Land and may not be copied
            without permission.
          </li>
          <li>
            Ayala Land is not responsible for any direct or indirect damages
            from the use of our services.
          </li>
        </ul>
      </section>

      <section className="mb-8 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Ayala Land values your privacy and is committed to protecting your
          personal data.
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300">
          <li>
            We collect personal information such as name, email, and phone
            number.
          </li>
          <li>
            Your data is used to improve our services and personalize your
            experience.
          </li>
          <li>We do not sell your personal data to third parties.</li>
          <li>You may opt out of marketing communications at any time.</li>
        </ul>
      </section>
    </div>
  );
}
