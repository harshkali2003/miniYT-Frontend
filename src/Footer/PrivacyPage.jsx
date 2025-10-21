import React from "react";
import "../Styles/PrivacyPolicy.css";

const PrivacyPage = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>Last updated: October 14, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Mini YouTube! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          We may collect personal data such as your name, email address, and activity data when you interact with our services.
        </p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To improve user experience.</li>
          <li>To provide personalized content recommendations.</li>
          <li>To enhance our platform and fix bugs.</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We use encryption and authentication to protect your data. However, no online service is 100% secure.
        </p>
      </section>

      <section>
        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          <a href="mailto:support@miniyt.com">support@miniyt.com</a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
