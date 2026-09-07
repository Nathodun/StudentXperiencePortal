import React, { useState, useEffect } from 'react';
import {
  Shield,
  MessageSquare,
  Calendar,
  HeartHandshake,
  Search,
  Lock,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  X,
  FileText,
  UserCheck,
  Send,
  Sparkles,
  Info,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  ArrowRight,
  Bell,
  Eye,
  ShieldCheck,
  Cookie,
  Sliders,
  Check,
  FileCheck,
  Building,
  GraduationCap
} from 'lucide-react';

const INITIAL_FAQ_ITEMS = [
  {
    id: 'charter',
    title: 'NBU Student Experience Charter & Conduct',
    content: 'Nigeria British University is committed to maintaining a safe, supportive, and academically rich environment. Our charter guarantees fair treatment, prompt resolution of grievances, and equitable access to all university resources and welfare facilities.'
  },
  {
    id: 'privacy',
    title: 'Student Rights & Privacy Confidentiality',
    content: 'All submissions made through the SEO platform operate under strict least-privilege access rules. Your data is strictly handled in compliance with university privacy guidelines and is only shared with authorized personnel directly handling your case.'
  },
  {
    id: 'mandate',
    title: 'The SEO Mandate & Role',
    content: 'The Student Experience Officer (SEO) acts as the bridge between the student body and university leadership, overseeing welfare support, complaint resolution, student engagement activities, feedback channels, and campus life enrichment.'
  },
  {
    id: 'hours',
    title: 'Office Hours & Emergency Access',
    content: 'The SEO Desk in the Student Affairs Building is open Monday to Friday, 8:00 AM – 4:00 PM. For after-hours urgent welfare or security emergencies, our 24/7 hotline (+234 800 NBU HELP) is always available.'
  }
];

const SAMPLE_EVENTS = [
  {
    id: '1',
    title: 'Freshers Orientation & Experience Fair',
    date: '15 Sept 2026',
    location: 'Main University Auditorium',
    category: 'Orientation',
    desc: 'Welcome session for new students, club exhibitions, and executive student life briefings.'
  },
  {
    id: '2',
    title: 'Student Leadership & Governance Forum',
    date: '22 Sept 2026',
    location: 'Senate Council Chamber',
    category: 'Leadership',
    desc: 'Interactive workshop with the SEO and university management on student representation.'
  },
  {
    id: '3',
    title: 'Campus Mental Health & Wellbeing Week',
    date: '05 Oct 2026',
    location: 'Student Centre Pavilion',
    category: 'Welfare',
    desc: 'Free wellness checks, mindfulness workshops, and confidential peer support drop-ins.'
  }
];

export default function App() {
  // Cookie Consent State
  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('nbu_cookie_consent') || null;
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    analytics: true,
    functional: true
  });

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'complaint', 'feedback', 'welfare', 'events', 'lookup', 'login', 'emergency'
  
  // Accordion State
  const [openAccordion, setOpenAccordion] = useState('charter');

  // Form States
  const [complaintForm, setComplaintForm] = useState({
    studentId: '',
    fullName: '',
    email: '',
    faculty: 'Computing & IT',
    category: 'Academic-Support',
    priority: 'Medium',
    description: '',
    actionRequested: ''
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Case Tracker State
  const [lookupRef, setLookupRef] = useState('SE-2026-9142');
  const [foundCase, setFoundCase] = useState(null);
  const [lookupError, setLookupError] = useState('');

  // SEO Staff Login Form State
  const [loginCreds, setLoginCreds] = useState({ email: 'officer@nbu.edu.ng', password: '••••••••••••' });
  const [loginError, setLoginError] = useState('');

  const handleAcceptAllCookies = () => {
    localStorage.setItem('nbu_cookie_consent', 'all');
    setCookieConsent('all');
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('nbu_cookie_consent', 'necessary');
    setCookieConsent('necessary');
  };

  const handleSavePreferences = () => {
    localStorage.setItem('nbu_cookie_consent', JSON.stringify(cookieSettings));
    setCookieConsent('custom');
    setShowPreferences(false);
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!complaintForm.studentId || !complaintForm.fullName || !complaintForm.description) {
      return;
    }
    const generatedRef = `SE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionSuccess({
      ref: generatedRef,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: complaintForm.category,
      student: complaintForm.fullName
    });
  };

  const handleCaseLookup = (e) => {
    e.preventDefault();
    setLookupError('');
    setFoundCase(null);

    const ref = lookupRef.trim().toUpperCase();
    if (!ref) {
      setLookupError('Please enter a valid Case Reference Number.');
      return;
    }

    // Demo lookup logic for SE-2026-9142 or any SE- prefix
    if (ref === 'SE-2026-9142' || ref.startsWith('SE-')) {
      setFoundCase({
        ref: ref,
        student: 'Daniel Adeyemi',
        studentId: 'NBU/26/00187',
        category: 'Attendance & Academic Support Referral',
        dateReported: '02 September 2026',
        priority: 'Medium',
        status: 'In Progress (Assigned)',
        assignedTo: 'Student Experience Officer (SEO)',
        lastAction: 'Contacted Department Chair regarding attendance and academic advisement.',
        nextFollowUp: '08 September 2026',
        timeline: [
          { status: 'Received & Logged', date: '02 Sept 2026', desc: 'Case registered into SEO system.' },
          { status: 'Officer Reviewed', date: '03 Sept 2026', desc: 'Assigned priority and flagged for academic follow-up.' },
          { status: 'Action Taken', date: '05 Sept 2026', desc: 'Communication sent to Academic Advisor.' },
          { status: 'Follow-up Scheduled', date: '08 Sept 2026', desc: 'Pending advisor and student feedback session.' }
        ]
      });
    } else {
      setLookupError('Case reference not found. Example format: SE-2026-9142');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginCreds.email.toLowerCase().includes('nbu.edu.ng')) {
      alert('Authentication verified! Directing to internal SEO Management Dashboard...');
      setActiveModal(null);
    } else {
      setLoginError('Invalid credentials or unauthorized domain. Use an authorized @nbu.edu.ng address.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      
      

      {}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          
          {/* NBU Crest & Brand Title */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-[#0c2340] rounded-lg flex items-center justify-center border-2 border-amber-500 shadow-md">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-[#0c2340] text-lg sm:text-xl tracking-tight leading-none">
                  NIGERIA BRITISH UNIVERSITY
                </h1>
              </div>
              <p className="text-xs font-semibold text-amber-600 mt-0.5 tracking-wider uppercase">
                Office of the Student Experience Officer (SEO)
              </p>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveModal('lookup')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-all"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Case Status</span>
            </button>
            
            <button
              onClick={() => setActiveModal('login')}
              className="flex items-center gap-2 bg-[#0c2340] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg border border-slate-700 shadow-sm transition-all hover:shadow"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>SEO Staff Portal</span>
            </button>
          </div>
        </div>
      </header>

      {}
      <main className="flex-1">
        
        {/* Executive Hero Banner */}
        <section className="relative bg-gradient-to-b from-[#0c2340] via-[#091b33] to-[#051121] text-white py-16 lg:py-24 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1 text-xs font-semibold text-amber-400 mb-6 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Student Support & Welfare Desk</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Your Voice. Your Experience. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Your Success at NBU.
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                The Student Experience Officer (SEO) platform is your official institutional gateway for welfare support, enquiry resolutions, feedback, and active campus engagement at Nigeria British University.
              </p>

              {/* Urgent Notification Banner */}
              <div className="mt-8 bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Immediate Assistance Required?</h4>
                    <p className="text-xs text-slate-400">Reach the SEO Emergency Desk for urgent accommodation or welfare matters.</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal('emergency')}
                  className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all text-center whitespace-nowrap shadow-md"
                >
                  Urgent Support Desk
                </button>
              </div>

            </div>
          </div>
        </section>

        {}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-16">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  What would you like to do today?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select an option below to submit requests, explore events, or track ongoing cases.
                </p>
              </div>
              <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md border border-slate-200 self-start md:self-auto">
                Secure & Confidential Student Access
              </span>
            </div>

            {/* Portal Action Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Submit Complaint / Enquiry */}
              <div 
                onClick={() => setActiveModal('complaint')}
                className="group bg-slate-50 hover:bg-[#0c2340] border border-slate-200 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 text-blue-700 group-hover:text-white rounded-xl flex items-center justify-center transition-colors mb-4">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-white transition-colors">
                    Submit Enquiry or Complaint
                  </h4>
                  <p className="text-xs text-slate-600 group-hover:text-slate-300 mt-2 leading-relaxed">
                    Log academic concerns, facility issues, attendance notes, or service complaints for SEO follow-up.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-blue-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                  <span>Log a new case</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              {/* Card 2: Student Feedback & Voice */}
              <div 
                onClick={() => setActiveModal('feedback')}
                className="group bg-slate-50 hover:bg-[#0c2340] border border-slate-200 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 bg-amber-100 group-hover:bg-amber-500 text-amber-800 group-hover:text-white rounded-xl flex items-center justify-center transition-colors mb-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-white transition-colors">
                    Student Voice & Suggestions
                  </h4>
                  <p className="text-xs text-slate-600 group-hover:text-slate-300 mt-2 leading-relaxed">
                    Share general feedback, campus improvements, or satisfaction ratings directly with university leadership.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                  <span>Share your voice</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              {/* Card 3: Welfare & Academic Support */}
              <div 
                onClick={() => setActiveModal('welfare')}
                className="group bg-slate-50 hover:bg-[#0c2340] border border-slate-200 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white rounded-xl flex items-center justify-center transition-colors mb-4">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-white transition-colors">
                    Welfare & Academic Guidance
                  </h4>
                  <p className="text-xs text-slate-600 group-hover:text-slate-300 mt-2 leading-relaxed">
                    Request confidential assistance for accommodation, academic advisement referrals, or wellness counseling.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-emerald-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                  <span>Request support</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              {/* Card 4: Events & Campus Engagement */}
              <div 
                onClick={() => setActiveModal('events')}
                className="group bg-slate-50 hover:bg-[#0c2340] border border-slate-200 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-600 text-purple-700 group-hover:text-white rounded-xl flex items-center justify-center transition-colors mb-4">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-white transition-colors">
                    Events & Campus Life
                  </h4>
                  <p className="text-xs text-slate-600 group-hover:text-slate-300 mt-2 leading-relaxed">
                    Explore orientation schedules, student society leadership forums, clubs, and wellbeing activities.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-purple-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                  <span>View upcoming events</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              {/* Card 5: Track Case Status */}
              <div 
                onClick={() => setActiveModal('lookup')}
                className="group bg-slate-50 hover:bg-[#0c2340] border border-slate-200 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white rounded-xl flex items-center justify-center transition-colors mb-4">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-white transition-colors">
                    Track Existing Case
                  </h4>
                  <p className="text-xs text-slate-600 group-hover:text-slate-300 mt-2 leading-relaxed">
                    Enter your case reference code (e.g., SE-2026-9142) to check real-time progress and follow-up dates.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-indigo-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                  <span>Check case status</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              {/* Card 6: Internal SEO Officer Portal */}
              <div 
                onClick={() => setActiveModal('login')}
                className="group bg-amber-50/60 hover:bg-[#0c2340] border border-amber-200 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 bg-amber-100 group-hover:bg-amber-600 text-amber-800 group-hover:text-white rounded-xl flex items-center justify-center transition-colors mb-4">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-white transition-colors">
                    SEO Staff Portal
                  </h4>
                  <p className="text-xs text-slate-600 group-hover:text-slate-300 mt-2 leading-relaxed">
                    Restricted access for the Student Experience Officer & designated personnel to manage active cases.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-amber-800 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                  <span>Authorized staff login</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {}
        <section className="bg-slate-100 py-16 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Mandate Overview */}
              <div className="lg:col-span-5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-md">
                  Institutional Commitments
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
                  Ensuring Student Success Through Active Advocacy
                </h3>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  The Student Experience Office sits at the core of Nigeria British University's commitment to holistic student growth. We ensure student voice actively shapes administrative practices while safeguarding individual welfare.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Least-Privilege Data Governance</h4>
                      <p className="text-xs text-slate-500 mt-0.5">We only store data essential to resolving your specific case—never exposing private academic scripts or financial records.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <UserCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Dedicated Case Manager</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Every inquiry is assigned a dedicated follow-up schedule until a formal outcome is recorded.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Guidance Accordion */}
              <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 bg-[#0c2340] text-white font-bold text-sm border-b border-slate-800">
                  NBU Student Experience Guidance & FAQs
                </div>
                <div className="divide-y divide-slate-100">
                  {INITIAL_FAQ_ITEMS.map((item) => {
                    const isOpen = openAccordion === item.id;
                    return (
                      <div key={item.id} className="transition-colors">
                        <button
                          onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                        >
                          <span className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-amber-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                            {item.content}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {}
      <footer className="bg-[#071629] text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-sm mb-3">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>NIGERIA BRITISH UNIVERSITY</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Excellence in Education & Student Life. Dedicated to fostering a world-class university environment.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Quick Actions</h5>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setActiveModal('complaint')} className="hover:text-amber-400 transition-colors">Submit Complaint</button></li>
                <li><button onClick={() => setActiveModal('welfare')} className="hover:text-amber-400 transition-colors">Welfare Support</button></li>
                <li><button onClick={() => setActiveModal('events')} className="hover:text-amber-400 transition-colors">Campus Events</button></li>
                <li><button onClick={() => setActiveModal('lookup')} className="hover:text-amber-400 transition-colors">Case Tracker</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Office Location</h5>
              <p className="text-slate-400 leading-relaxed">
                Student Experience Office (SEO Desk)<br />
                Ground Floor, Student Affairs Building<br />
                NBU Main Campus
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Contact & Support</h5>
              <p className="text-slate-400 space-y-1">
                <span>Hotline: +234 800 NBU HELP</span><br />
                <span>Email: seo@nbu.edu.ng</span><br />
                <span>Mon - Fri: 8:00 AM - 4:00 PM</span>
              </p>
            </div>
          </div>

          {/* Mandatory Disclaimers & Copyright */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px]">
            <div>
              <p>&copy; 2026 Nigeria British University. All rights reserved.</p>
              <p className="text-amber-400 font-semibold mt-1">
                Proposed Solution / Concept Proposal &bull; Developed by SAOS for the NBU Student Experience Office.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <button onClick={() => setShowPreferences(true)} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <Cookie className="w-3.5 h-3.5" /> Cookie Settings
              </button>
              <span className="text-slate-600">|</span>
              <button onClick={() => setActiveModal('login')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Staff Login
              </button>
            </div>
          </div>

        </div>
      </footer>

      {}
      
      {/* MODAL 1: Submit Complaint / Concern Drawer */}
      {activeModal === 'complaint' && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            
            <div className="bg-[#0c2340] text-white p-6 flex justify-between items-center border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  Submit Student Experience Enquiry / Complaint
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Logged directly to the SEO Case Management Desk</p>
              </div>
              <button onClick={() => { setActiveModal(null); setSubmissionSuccess(null); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {submissionSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Case Successfully Registered</h4>
                  <p className="text-xs text-emerald-700 mt-1">Please record your unique case reference code below:</p>
                  
                  <div className="my-4 bg-white border border-emerald-300 rounded-lg p-3 inline-block font-mono text-base font-bold text-slate-900 shadow-sm">
                    {submissionSuccess.ref}
                  </div>

                  <p className="text-xs text-slate-600 mb-6">
                    A notification has been sent to the Student Experience Officer. You can track this case anytime using the "Track Case Status" option.
                  </p>

                  <button
                    onClick={() => { setActiveModal(null); setSubmissionSuccess(null); }}
                    className="bg-[#0c2340] hover:bg-slate-800 text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-all"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleComplaintSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Student ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NBU/26/00187"
                        value={complaintForm.studentId}
                        onChange={(e) => setComplaintForm({ ...complaintForm, studentId: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Daniel Adeyemi"
                        value={complaintForm.fullName}
                        onChange={(e) => setComplaintForm({ ...complaintForm, fullName: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="student@nbu.edu.ng"
                        value={complaintForm.email}
                        onChange={(e) => setComplaintForm({ ...complaintForm, email: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Faculty / School</label>
                      <select
                        value={complaintForm.faculty}
                        onChange={(e) => setComplaintForm({ ...complaintForm, faculty: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                      >
                        <option>Computing & IT</option>
                        <option>Engineering & Technology</option>
                        <option>Business & Management</option>
                        <option>Law & Humanities</option>
                        <option>Basic Medical Sciences</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={complaintForm.category}
                        onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                      >
                        <option value="Academic-Support">Academic Support Referral</option>
                        <option value="Attendance-Concern">Attendance Concern</option>
                        <option value="Welfare">Welfare & Accommodation</option>
                        <option value="Complaint">General Complaint</option>
                        <option value="Disciplinary">Disciplinary Referral</option>
                        <option value="Other">Other Matter</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Priority Level</label>
                      <select
                        value={complaintForm.priority}
                        onChange={(e) => setComplaintForm({ ...complaintForm, priority: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                      >
                        <option value="Low">Low - General Enquiry</option>
                        <option value="Medium">Medium - Attention Required</option>
                        <option value="High">High - Urgent Matter</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe the issue, context, date occurred, and relevant details..."
                      value={complaintForm.description}
                      onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Action Requested / Outcome Desired</label>
                    <input
                      type="text"
                      placeholder="What outcome would you like to see?"
                      value={complaintForm.actionRequested}
                      onChange={(e) => setComplaintForm({ ...complaintForm, actionRequested: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow transition-all flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Case
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Case Status Tracker Modal */}
      {activeModal === 'lookup' && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            
            <div className="bg-[#0c2340] text-white p-5 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm">Track Case Status</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleCaseLookup} className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Enter Case Ref (e.g. SE-2026-9142)"
                  value={lookupRef}
                  onChange={(e) => setLookupRef(e.target.value)}
                  className="flex-1 text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none uppercase font-mono"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all"
                >
                  Search
                </button>
              </form>

              {lookupError && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{lookupError}</span>
                </div>
              )}

              {foundCase && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                    <div>
                      <span className="font-mono text-amber-700 font-bold">{foundCase.ref}</span>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{foundCase.category}</h4>
                    </div>
                    <span className="bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {foundCase.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>Student: <span className="font-semibold text-slate-900">{foundCase.student}</span></div>
                    <div>Reported: <span className="font-semibold text-slate-900">{foundCase.dateReported}</span></div>
                    <div>Follow-up Due: <span className="font-semibold text-amber-700">{foundCase.nextFollowUp}</span></div>
                    <div>Assigned: <span className="font-semibold text-slate-900">{foundCase.assignedTo}</span></div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="font-bold text-slate-700 block mb-2">Case Timeline Progress:</span>
                    <div className="space-y-2">
                      {foundCase.timeline.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900">{step.status} ({step.date})</span>
                            <p className="text-slate-500">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: SEO Staff Login Modal with Mandatory SAOS Disclaimer */}
      {activeModal === 'login' && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            
            <div className="bg-[#0c2340] text-white p-6 text-center relative border-b border-slate-800">
              <button 
                onClick={() => setActiveModal(null)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-bold text-base">Authorized Personnel Access</h3>
              <p className="text-xs text-slate-400 mt-1">SEO Management Desk & Student Experience Officers</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
              
              {loginError && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Staff Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="officer@nbu.edu.ng"
                  value={loginCreds.email}
                  onChange={(e) => setLoginCreds({ ...loginCreds, email: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Security Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginCreds.password}
                  onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[11px] text-amber-900">
                <p className="font-semibold">Notice:</p>
                <p>This portal uses role-based access control and audit logging for all case updates.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0c2340] hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-lg shadow transition-all"
              >
                Authenticate & Enter SEO Dashboard
              </button>

              {/* SAOS Specific Small Disclaimer in Login Modal */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-500 leading-snug">
                  Developed by SAOS for the NBU Student Experience Office. Concept Proposal for NBU Internal Systems.
                </p>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 4: Emergency Welfare Modal */}
      {activeModal === 'emergency' && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border-2 border-red-500">
            <div className="bg-red-600 text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-sm">Urgent Student Welfare Hotline</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 text-xs space-y-4">
              <p className="text-slate-700 leading-relaxed font-medium">
                If you or another student are facing an immediate personal safety, health, or security crisis on campus, please reach out directly:
              </p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">SEO Urgent Welfare Desk</span>
                  <a href="tel:+2348006284357" className="bg-red-600 text-white font-bold px-3 py-1 rounded text-[11px]">Call Now</a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">NBU Campus Security Patrol</span>
                  <a href="tel:+2348009990000" className="bg-slate-900 text-white font-bold px-3 py-1 rounded text-[11px]">24/7 Security</a>
                </div>
              </div>

              <p className="text-slate-500 text-[11px]">
                Non-emergency concerns can be submitted through the standard Complaint & Enquiry drawer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Campus Events View Modal */}
      {activeModal === 'events' && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-[#0c2340] text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm">NBU Campus Life & Student Engagement Events</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {SAMPLE_EVENTS.map((evt) => (
                <div key={evt.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                      {evt.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{evt.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{evt.desc}</p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500">
                      <span>📅 {evt.date}</span>
                      <span>📍 {evt.location}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Registered for ${evt.title}. Confirmation sent!`)}
                    className="bg-[#0c2340] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shrink-0"
                  >
                    Register Attendance
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: Welfare Guidance Modal */}
      {activeModal === 'welfare' && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-emerald-700 text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <HeartHandshake className="w-5 h-5" />
                <h3 className="font-bold text-sm">Welfare & Academic Guidance</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 text-xs space-y-4">
              <p className="text-slate-700 leading-relaxed">
                The Student Experience Office provides discreet referral support for accommodation issues, financial guidance, academic advising, and personal counseling.
              </p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => { setActiveModal('complaint'); }} 
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold p-3 rounded-lg text-left flex justify-between items-center"
                >
                  <span>Request Academic Referral</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setActiveModal('complaint'); }} 
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold p-3 rounded-lg text-left flex justify-between items-center"
                >
                  <span>Accommodation & Living Concern</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 7: Student Feedback Modal */}
      {activeModal === 'feedback' && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-amber-600 text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <h3 className="font-bold text-sm">Student Voice & Suggestions</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 text-xs space-y-4">
              <p className="text-slate-700 leading-relaxed">
                Have suggestions on how NBU can improve campus facilities, teaching experience, or student activities?
              </p>
              <textarea 
                rows={4} 
                placeholder="Share your ideas or general feedback here..."
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button 
                onClick={() => { alert('Thank you! Your feedback has been submitted to the SEO team.'); setActiveModal(null); }}
                className="w-full bg-[#0c2340] hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {!cookieConsent && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#08182b]/95 backdrop-blur-md text-white border-t-2 border-amber-500 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            <div className="flex items-start space-x-3 max-w-3xl">
              <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400 shrink-0 mt-1">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-400">Institutional Data Privacy & Cookie Notice</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Nigeria British University uses necessary session cookies to maintain secure access, process student experience requests, and manage authentication across university systems in accordance with NBU Data Governance policies.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
              <button
                onClick={() => setShowPreferences(true)}
                className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" /> Preferences
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg border border-slate-700 transition-all"
              >
                Necessary Only
              </button>
              <button
                onClick={handleAcceptAllCookies}
                className="text-xs font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Accept All
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-600" /> Cookie Preferences
              </h3>
              <button onClick={() => setShowPreferences(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <div>
                  <h5 className="font-bold text-slate-900">Essential System Cookies</h5>
                  <p className="text-slate-500 text-[11px]">Required for login & security.</p>
                </div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">Always Active</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <div>
                  <h5 className="font-bold text-slate-900">Analytics & Experience</h5>
                  <p className="text-slate-500 text-[11px]">Helps improve portal response times.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={cookieSettings.analytics} 
                  onChange={(e) => setCookieSettings({ ...cookieSettings, analytics: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={handleSavePreferences}
                className="bg-amber-600 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-amber-500"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}