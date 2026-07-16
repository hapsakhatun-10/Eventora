export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">Privacy Policy</h1>
                <p className="text-sm text-slate-400 mb-10">Last updated: January 15, 2025</p>

                <div className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">1. Information We Collect</h2>
                        <p>
                            When you use Eventora, we collect information you provide directly, such as your name, email address,
                            and payment details when you register or purchase tickets. We also collect usage data including your
                            browsing activity, search queries, and device information to improve our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Provide and maintain our event platform services</li>
                            <li>Process ticket purchases and send confirmations</li>
                            <li>Personalize your event recommendations</li>
                            <li>Send important updates about events you&apos;re interested in</li>
                            <li>Improve our platform and develop new features</li>
                            <li>Detect and prevent fraud or misuse</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">3. Information Sharing</h2>
                        <p>
                            We do not sell your personal information. We may share your data with event organizers only when
                            you purchase a ticket or register for their event. We also share information with trusted service
                            providers who help us operate our platform, such as payment processors and hosting services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">4. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your personal information, including
                            encryption of data in transit and at rest. However, no method of transmission over the Internet
                            is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">5. Cookies</h2>
                        <p>
                            Eventora uses cookies and similar technologies to maintain your session, remember your preferences,
                            and analyze usage patterns. You can control cookie settings through your browser preferences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">6. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Access the personal data we hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your personal data</li>
                            <li>Opt out of marketing communications</li>
                            <li>Export your data in a portable format</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">7. Children&apos;s Privacy</h2>
                        <p>
                            Eventora is not intended for users under the age of 13. We do not knowingly collect personal
                            information from children. If we become aware that we have collected data from a child, we
                            will delete it promptly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">8. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any significant
                            changes by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-3">9. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at{" "}
                            <a href="mailto:privacy@eventora.com" className="text-slate-900 font-semibold hover:underline">
                                privacy@eventora.com
                            </a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
