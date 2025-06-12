// app/dashboard/account/security/page.jsx
'use client'

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { FaArrowLeft, FaShieldAlt, FaLock, FaUserShield, FaInfoCircle } from 'react-icons/fa';

export default function SecurityPage() {
  const { userData } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/mainpage/account" className="mr-4 hover:bg-slate-800/50 p-2 rounded-full transition">
          <FaArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold">Security & Policies</h1>
      </div>

      
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-lg mb-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <FaShieldAlt className="text-yellow-500 mr-3" />
          Terms & Conditions
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <h3 className="text-lg font-medium mb-3">1. Acceptance of Terms</h3>
          <p className="mb-4 text-sm text-slate-300">
            By accessing or using our AI services, you agree to be bound by these Terms and Conditions. 
            If you do not agree with any part of these terms, you must not use our services.
          </p>

          <h3 className="text-lg font-medium mb-3">2. Service Description</h3>
          <p className="mb-4 text-sm text-slate-300">
            Our platform provides AI-powered content generation tools including but not limited to:
            text generation, image creation, audio synthesis, and video processing. We reserve the right
            to modify or discontinue any service at any time without notice.
          </p>

          <h3 className="text-lg font-medium mb-3">3. User Responsibilities</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2 text-sm text-slate-300">
            <li>You must be at least 18 years old or have parental consent to use our services</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You agree not to use our services for any illegal or unauthorized purpose</li>
            <li>You will not generate content that violates copyrights, trademarks, or intellectual property rights</li>
          </ul>

          <h3 className="text-lg font-medium mb-3">4. Content Ownership</h3>
          <p className="mb-4 text-sm text-slate-300">
            You retain ownership of any content you create using our services, subject to these terms.
            However, you grant us a worldwide, non-exclusive license to use, reproduce, and display
            such content for the purpose of providing and improving our services.
          </p>

          <h3 className="text-lg font-medium mb-3">5. Prohibited Content</h3>
          <p className="mb-4 text-sm text-slate-300">
            You may not use our services to generate content that:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2 text-sm text-slate-300">
            <li>Is illegal, harmful, or promotes illegal activities</li>
            <li>Contains hate speech, harassment, or discrimination</li>
            <li>Violates privacy rights or contains personal information</li>
            <li>Is sexually explicit or pornographic</li>
            <li>Contains malware, viruses, or other harmful code</li>
          </ul>

          <h3 className="text-lg font-medium mb-3">6. Subscription and Payments</h3>
          <p className="mb-4 text-sm text-slate-300">
            Paid subscriptions automatically renew unless canceled at least 24 hours before the end of the current period.
            We may change subscription fees but will provide at least 30 days notice before any price changes.
          </p>

          <h3 className="text-lg font-medium mb-3">7. Termination</h3>
          <p className="mb-4 text-sm text-slate-300">
            We may suspend or terminate your account if you violate these terms. You may terminate your
            account at any time through your account settings.
          </p>

          <h3 className="text-lg font-medium mb-3">8. Limitation of Liability</h3>
          <p className="mb-4 text-sm text-slate-300">
            Our services are provided "as is" without warranties of any kind. We shall not be liable
            for any indirect, incidental, or consequential damages arising from your use of our services.
          </p>

          <h3 className="text-lg font-medium mb-3">9. Changes to Terms</h3>
          <p className="mb-4 text-sm text-slate-300">
            We may update these terms periodically. Continued use of our services after changes constitutes
            acceptance of the new terms. We will notify users of significant changes via email or in-app notification.
          </p>

          <h3 className="text-lg font-medium mb-3">10. Governing Law</h3>
          <p className="mb-4 text-sm text-slate-300">
            These terms shall be governed by the laws of [Your Jurisdiction] without regard to its conflict
            of law provisions.
          </p>

          <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <h4 className="font-medium mb-2">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
            <p className="text-sm text-slate-400">
              By using our services, you acknowledge that you have read, understood, and agree to be bound
              by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-lg">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <FaShieldAlt className="text-blue-500 mr-3" />
          Privacy Policy
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <h3 className="text-lg font-medium mb-3">1. Information We Collect</h3>
          <p className="mb-4 text-sm text-slate-300">
            We collect information you provide directly, including account details, payment information,
            and content you generate. We automatically collect usage data, device information, and cookies.
          </p>

          <h3 className="text-lg font-medium mb-3">2. How We Use Information</h3>
          <p className="mb-4 text-sm text-slate-300">
            We use your information to provide and improve our services, process payments, communicate with you,
            and ensure security. We may use aggregated data for research and analytics.
          </p>

          <h3 className="text-lg font-medium mb-3">3. Data Security</h3>
          <p className="mb-4 text-sm text-slate-300">
            We implement industry-standard security measures including encryption, access controls, and regular
            security audits. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h3 className="text-lg font-medium mb-3">4. Data Retention</h3>
          <p className="mb-4 text-sm text-slate-300">
            We retain your personal information only as long as necessary to provide our services and as required
            by law. You may request deletion of your data through your account settings.
          </p>

          <h3 className="text-lg font-medium mb-3">5. Third-Party Services</h3>
          <p className="mb-4 text-sm text-slate-300">
            We may use third-party services for payment processing, analytics, and cloud hosting. These services
            have their own privacy policies governing your information.
          </p>

          <h3 className="text-lg font-medium mb-3">6. Your Rights</h3>
          <p className="mb-4 text-sm text-slate-300">
            You may access, correct, or delete your personal information through your account settings. You may
            opt out of marketing communications at any time.
          </p>

          <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <h4 className="font-medium mb-2">Contact Us</h4>
            <p className="text-sm text-slate-400">
              For questions about these policies, please contact our support team at security@yourdomain.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}