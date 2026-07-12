"use client";

import Link from "next/link";
import { Ticket } from "lucide-react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#1b0b33] text-gray-300">
            <div className="mx-auto  px-18 py-14">
                {/* Logo */}
                <div >
                    {/* Logo */}
                    <div className="mb-12">
                        <Link href="/" className="group flex w-fit items-center gap-3">
                            {/* Logo Icon */}
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                                <Ticket className="h-6 w-6" />
                            </div>

                            {/* Logo Text */}
                            <div>
                                <h1 className="text-3xl font-black tracking-tight">
                                    <span className="text-white">Even</span>
                                    <span className="text-orange-500">to</span>
                                </h1>

                                <p className="mt-1 text-xs text-gray-400">
                                    Discover • Connect • Celebrate
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Top Links */}
                <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                    {/* Use Evento */}
                    <div>
                        <h3 className="footer-heading">Use Evento</h3>

                        <ul className="space-y-3">
                            <li><Link href="/events" className="footer-link">Browse Events</Link></li>
                            <li><Link href="/categories" className="footer-link">Categories</Link></li>
                            <li><Link href="/pricing" className="footer-link">Pricing</Link></li>
                            <li><Link href="/mobile-app" className="footer-link">Mobile App</Link></li>
                            <li><Link href="/register" className="footer-link">Event Registration</Link></li>
                            <li><Link href="/guidelines" className="footer-link">Community Guidelines</Link></li>
                            <li><Link href="/faq" className="footer-link">FAQs</Link></li>
                            <li><Link href="/sitemap" className="footer-link">Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Organize */}
                    <div>
                        <h3 className="footer-heading">Organize Events</h3>

                        <ul className="space-y-3">
                            <li><Link href="/create-event" className="footer-link">Create Event</Link></li>
                            <li><Link href="/sell-tickets" className="footer-link">Sell Tickets</Link></li>
                            <li><Link href="/analytics" className="footer-link">Analytics</Link></li>
                            <li><Link href="/marketing" className="footer-link">Marketing Tools</Link></li>
                            <li><Link href="/payments" className="footer-link">Payment System</Link></li>
                            <li><Link href="/check-in" className="footer-link">QR Check-in</Link></li>
                            <li><Link href="/virtual-events" className="footer-link">Virtual Events</Link></li>
                            <li><Link href="/organizer-guide" className="footer-link">Organizer Guide</Link></li>
                        </ul>
                    </div>

                    {/* Discover */}
                    <div>
                        <h3 className="footer-heading">Discover</h3>

                        <ul className="space-y-3">
                            <li><Link href="/events/concerts" className="footer-link">Concerts</Link></li>
                            <li><Link href="/events/workshops" className="footer-link">Workshops</Link></li>
                            <li><Link href="/events/conferences" className="footer-link">Conferences</Link></li>
                            <li><Link href="/events/festivals" className="footer-link">Festivals</Link></li>
                            <li><Link href="/events/meetups" className="footer-link">Meetups</Link></li>
                            <li><Link href="/events/sports" className="footer-link">Sports</Link></li>
                            <li><Link href="/events/technology" className="footer-link">Technology</Link></li>
                            <li><Link href="/events/business" className="footer-link">Business</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="footer-heading">Connect With Us</h3>

                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:support@evento.com"
                                    className="footer-link"
                                >
                                    Contact Support
                                </a>
                            </li>

                            <li>
                                <a
                                    href="mailto:sales@evento.com"
                                    className="footer-link"
                                >
                                    Contact Sales
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://x.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    X
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    Facebook
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    LinkedIn
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    Instagram
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://tiktok.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    TikTok
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 border-t border-white/10 pt-6">
                    <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
                        <p className="text-sm text-gray-400">
                            © {year} Evento
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <Link href="/how-it-works" className="footer-link">
                                How It Works
                            </Link>

                            <span>•</span>

                            <Link href="/pricing" className="footer-link">
                                Pricing
                            </Link>

                            <span>•</span>

                            <Link href="/contact" className="footer-link">
                                Contact
                            </Link>

                            <span>•</span>

                            <Link href="/about" className="footer-link">
                                About
                            </Link>

                            <span>•</span>

                            <Link href="/blog" className="footer-link">
                                Blog
                            </Link>

                            <span>•</span>

                            <Link href="/careers" className="footer-link">
                                Careers
                            </Link>

                            <span>•</span>

                            <Link href="/privacy" className="footer-link">
                                Privacy
                            </Link>

                            <span>•</span>

                            <Link href="/terms" className="footer-link">
                                Terms
                            </Link>

                            <span>•</span>

                            <Link href="/cookies" className="footer-link">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;