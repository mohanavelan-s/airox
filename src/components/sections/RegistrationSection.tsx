/**
 * AIROX 2026 - Futuristic Multi-Step Registration Portal Component
 * Features:
 * - 5-Step Guided Mobile-First UX Flow:
 *   STEP 1: Personal Details
 *   STEP 2: Participation
 *   STEP 3: Events
 *   STEP 4: Payment
 *   STEP 5: Review & Submit
 * - Per-step validation with instant feedback & persistent state
 * - Automatic smooth scroll to registration top on step transitions
 * - Direct Apps Script JSON API endpoint POST submission on Step 5
 * - Base64 image encoding for payment screenshot (max 1MB validation)
 * - Mobile-first Android responsive layout & thumb-friendly touch targets
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import QRCode from 'qrcode';
const paymentQrImage = '/images/payment-qr.png';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Container } from '../ui/Container';
import { Modal } from '../ui/Modal';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowUpRight,
  ArrowLeft,
  Code2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Sparkles,
  CheckSquare,
  Square,
  Upload,
  X,
  Image as ImageIcon,
  AlertCircle,
  User,
  Users,
  Building2,
  FileCheck,
  Mail,
  GraduationCap,
  Layers,
  Award,
  CreditCard,
  Eye
} from 'lucide-react';
import { TECHNICAL_EVENTS, NON_TECHNICAL_EVENTS, SYMPOSIUM_INFO } from '../../data/initialData';
import { RegistrationFormData, SymposiumEvent } from '../../types';
import { submitRegistration, SubmissionResult } from '../../services/registrationService';
import { CustomYearDropdown } from '../ui/CustomYearDropdown';

interface RegistrationSectionProps {
  preSelectedEventId?: string | null;
  onClearPreSelectedEvent?: () => void;
}

const YEAR_OPTIONS = [
  { label: '1st Year', value: '1st Year' },
  { label: '2nd Year', value: '2nd Year' },
  { label: '3rd Year', value: '3rd Year' },
  { label: '4th Year', value: '4th Year' },
];

const MAJOR_OPTIONS = [
  { label: 'B.E (Bachelor of Engineering)', value: 'B.E' },
  { label: 'B.Tech (Bachelor of Technology)', value: 'B.Tech' },
  { label: 'B.Sc / BCA / Other UG', value: 'B.Sc / BCA' },
  { label: 'M.E / M.Tech / Post Graduate', value: 'M.E / M.Tech' },
  { label: 'Others', value: 'Others' },
];

const DEPARTMENT_OPTIONS = [
  { label: 'Artificial Intelligence and Data Science', value: 'Artificial Intelligence and Data Science' },
  { label: 'Artificial Intelligence and Machine Learning', value: 'Artificial Intelligence and Machine Learning' },
  { label: 'Computer Science and Engineering', value: 'Computer Science and Engineering' },
  { label: 'Information Technology', value: 'Information Technology' },
  { label: 'Cyber Security / Information Security', value: 'Cyber Security' },
  { label: 'Electronics and Communication Engineering', value: 'Electronics and Communication Engineering' },
  { label: 'Electrical and Electronics Engineering', value: 'Electrical and Electronics Engineering' },
  { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
  { label: 'Civil Engineering', value: 'Civil Engineering' },
  { label: 'Biomedical Engineering', value: 'Biomedical Engineering' },
  { label: 'Biotechnology', value: 'Biotechnology' },
  { label: 'Chemical Engineering', value: 'Chemical Engineering' },
  { label: 'Mechatronics Engineering', value: 'Mechatronics Engineering' },
  { label: 'Agricultural Engineering', value: 'Agricultural Engineering' },
  { label: 'Aerospace Engineering', value: 'Aerospace Engineering' },
  { label: 'Robotics and Automation', value: 'Robotics and Automation' },
  { label: 'Master of Computer Applications (MCA)', value: 'MCA' },
  { label: 'Master of Business Administration (MBA)', value: 'MBA' },
  { label: 'Science and Humanities / General', value: 'Science and Humanities' },
  { label: 'Other', value: 'Other' },
];

export const getDepartmentsForMajor = (major: string) => {
  switch (major) {
    case 'B.E':
    case 'B.Tech':
      return DEPARTMENT_OPTIONS.filter((dept) =>
        [
          'Artificial Intelligence and Data Science',
          'Artificial Intelligence and Machine Learning',
          'Computer Science and Engineering',
          'Information Technology',
          'Cyber Security',
          'Electronics and Communication Engineering',
          'Electrical and Electronics Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Biomedical Engineering',
          'Biotechnology',
          'Chemical Engineering',
          'Mechatronics Engineering',
          'Agricultural Engineering',
          'Aerospace Engineering',
          'Robotics and Automation',
          'Science and Humanities',
          'Other',
        ].includes(dept.value)
      );

    case 'B.Sc / BCA':
      return DEPARTMENT_OPTIONS.filter((dept) =>
        [
          'Computer Science and Engineering',
          'Information Technology',
          'Cyber Security',
          'Artificial Intelligence and Data Science',
          'Artificial Intelligence and Machine Learning',
          'Biotechnology',
          'MCA',
          'Science and Humanities',
          'Other',
        ].includes(dept.value)
      );

    case 'M.E / M.Tech':
      return DEPARTMENT_OPTIONS.filter((dept) =>
        [
          'Artificial Intelligence and Data Science',
          'Artificial Intelligence and Machine Learning',
          'Computer Science and Engineering',
          'Information Technology',
          'Cyber Security',
          'Electronics and Communication Engineering',
          'Electrical and Electronics Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Biomedical Engineering',
          'Biotechnology',
          'Chemical Engineering',
          'Mechatronics Engineering',
          'Agricultural Engineering',
          'Aerospace Engineering',
          'Robotics and Automation',
          'MCA',
          'MBA',
          'Science and Humanities',
          'Other',
        ].includes(dept.value)
      );

    case 'Others':
    default:
      return DEPARTMENT_OPTIONS;
  }
};

const STEP_TITLES = [
  { step: 1, title: 'Personal Details', shortTitle: 'Personal', icon: User },
  { step: 2, title: 'Participation', shortTitle: 'Participation', icon: Users },
  { step: 3, title: 'Event Selection', shortTitle: 'Events', icon: Cpu },
  { step: 4, title: 'Payment', shortTitle: 'Payment', icon: CreditCard },
  { step: 5, title: 'Review & Submit', shortTitle: 'Review', icon: FileCheck },
];

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  preSelectedEventId,
  onClearPreSelectedEvent,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const step5MountedAtRef = useRef<number>(0);

  useEffect(() => {
    if (currentStep === 5) {
      step5MountedAtRef.current = Date.now();
    }
  }, [currentStep]);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    yearOfStudy: '3rd Year',
    major: 'B.E',
    majorOther: '',
    department: 'Computer Science and Engineering',
    departmentOther: '',
    participationType: 'Individual',
    teamName: '',
    technicalEvents: [],
    nonTechnicalEvents: [],
    utrNumber: '',
    paymentScreenshot: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null);
  const [copiedReceiptId, setCopiedReceiptId] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  
  const [isTechOpen, setIsTechOpen] = useState(true);
  const [isNonTechOpen, setIsNonTechOpen] = useState(true);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [closedEventNotice, setClosedEventNotice] = useState<SymposiumEvent | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll smooth to top of registration section on step change
  const scrollToFormTop = () => {
    const el = document.getElementById('registration');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      collegeName: '',
      yearOfStudy: '3rd Year',
      major: 'B.E',
      majorOther: '',
      department: 'Artificial Intelligence and Data Science',
      departmentOther: '',
      participationType: 'Individual',
      teamName: '',
      technicalEvents: [],
      nonTechnicalEvents: [],
      utrNumber: '',
      paymentScreenshot: null,
    });
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Generate guaranteed client-side UPI QR code
  useEffect(() => {
    const upiUri = 'upi://pay?pa=mohanavelan2006-1@oksbi&pn=MV&am=200&cu=INR';
    QRCode.toDataURL(upiUri, {
      width: 400,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }).then(url => {
      setQrCodeDataUrl(url);
    }).catch(err => {
      console.error('Failed to generate local QR code:', err);
    });
  }, []);

  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 86677 95829');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('mohanavelan2006-1@oksbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Manage image preview memory URL
  useEffect(() => {
    if (!formData.paymentScreenshot) {
      setImagePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(formData.paymentScreenshot);
    setImagePreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.paymentScreenshot]);

  // Filter events based on selected participation type (Individual vs Team)
  const filteredTechnicalEvents = useMemo(() => {
    const isTeam = formData.participationType === 'Team';
    return TECHNICAL_EVENTS.filter((event) => {
      if (isTeam) {
        return true; // Teams can participate in all events including individual events
      } else {
        return event.participationMode === 'individual' || event.participationMode === 'both';
      }
    });
  }, [formData.participationType]);

  const filteredNonTechnicalEvents = useMemo(() => {
    const isTeam = formData.participationType === 'Team';
    return NON_TECHNICAL_EVENTS.filter((event) => {
      if (isTeam) {
        return true; // Teams can participate in all events including individual events
      } else {
        return event.participationMode === 'individual' || event.participationMode === 'both';
      }
    });
  }, [formData.participationType]);

  // Handle switching participation type and cleaning up invalid event choices
  const handleParticipationTypeChange = (type: 'Individual' | 'Team') => {
    setFormData((prev) => {
      const validTech = TECHNICAL_EVENTS.filter((e) =>
        !e.isOnlineRegistrationClosed && (
          type === 'Team'
            ? true
            : e.participationMode === 'individual' || e.participationMode === 'both'
        )
      ).map((e) => e.title);

      const validNonTech = NON_TECHNICAL_EVENTS.filter((e) =>
        !e.isOnlineRegistrationClosed && (
          type === 'Team'
            ? true
            : e.participationMode === 'individual' || e.participationMode === 'both'
        )
      ).map((e) => e.title);

      return {
        ...prev,
        participationType: type,
        teamName: type === 'Individual' ? '' : prev.teamName,
        technicalEvents: prev.technicalEvents.filter((t) => validTech.includes(t)),
        nonTechnicalEvents: prev.nonTechnicalEvents.filter((nt) => validNonTech.includes(nt)),
      };
    });
    if (errors.participationType) {
      setErrors((prev) => ({ ...prev, participationType: '' }));
    }
  };

  // Handle pre-selected event from parent click
  useEffect(() => {
    if (preSelectedEventId) {
      const techMatch = TECHNICAL_EVENTS.find((e) => e.id === preSelectedEventId || e.title === preSelectedEventId);
      const nonTechMatch = NON_TECHNICAL_EVENTS.find((e) => e.id === preSelectedEventId || e.title === preSelectedEventId);
      const match = techMatch || nonTechMatch;

      if (match) {
        if (match.isOnlineRegistrationClosed) {
          setClosedEventNotice(match);
          if (techMatch) setIsTechOpen(true);
          if (nonTechMatch) setIsNonTechOpen(true);
          setCurrentStep(3);
          scrollToFormTop();
          return;
        }

        setFormData((prev) => {
          let updatedParticipationType = prev.participationType;
          if (match.participationMode === 'team' && prev.participationType === 'Individual') {
            updatedParticipationType = 'Team';
          }

          const validTech = TECHNICAL_EVENTS.filter((e) =>
            !e.isOnlineRegistrationClosed && (
              updatedParticipationType === 'Team'
                ? true
                : e.participationMode === 'individual' || e.participationMode === 'both'
            )
          ).map((e) => e.title);

          const validNonTech = NON_TECHNICAL_EVENTS.filter((e) =>
            !e.isOnlineRegistrationClosed && (
              updatedParticipationType === 'Team'
                ? true
                : e.participationMode === 'individual' || e.participationMode === 'both'
            )
          ).map((e) => e.title);

          let newTech = prev.technicalEvents.filter((t) => validTech.includes(t));
          let newNonTech = prev.nonTechnicalEvents.filter((nt) => validNonTech.includes(nt));

          if (techMatch && !newTech.includes(techMatch.title)) {
            const total = newTech.length + newNonTech.length;
            if (total < 3) {
              newTech = [...newTech, techMatch.title];
            }
          } else if (nonTechMatch && !newNonTech.includes(nonTechMatch.title)) {
            const total = newTech.length + newNonTech.length;
            if (total < 3) {
              newNonTech = [...newNonTech, nonTechMatch.title];
            }
          }

          return {
            ...prev,
            participationType: updatedParticipationType,
            technicalEvents: newTech,
            nonTechnicalEvents: newNonTech,
          };
        });

        if (techMatch) setIsTechOpen(true);
        if (nonTechMatch) setIsNonTechOpen(true);
        setCurrentStep(1);
        scrollToFormTop();
      }
    }
  }, [preSelectedEventId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      if (errors.phone) {
        setErrors((prev) => ({
          ...prev,
          phone: digitsOnly.length === 10 ? '' : 'Mobile number must be exactly 10 digits.',
        }));
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, paymentScreenshot: 'Please select a valid image file (PNG, JPG, WEBP).' }));
      return;
    }

    if (file.size > 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        paymentScreenshot: `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the 1 MB maximum limit.`,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, paymentScreenshot: file }));
    setErrors((prev) => ({ ...prev, paymentScreenshot: '' }));
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, paymentScreenshot: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTechToggle = (eventTitle: string) => {
    const targetEvent = TECHNICAL_EVENTS.find((e) => e.title === eventTitle);
    if (targetEvent?.isOnlineRegistrationClosed) {
      setClosedEventNotice(targetEvent);
      return;
    }

    setFormData((prev) => {
      const isSelected = prev.technicalEvents.includes(eventTitle);
      if (isSelected) {
        return { ...prev, technicalEvents: prev.technicalEvents.filter((t) => t !== eventTitle) };
      } else {
        const totalSelected = prev.technicalEvents.length + prev.nonTechnicalEvents.length;
        if (totalSelected >= 3) {
          setErrors((prevErr) => ({
            ...prevErr,
            events: 'Maximum limit reached! You can select up to 3 events in total.',
          }));
          return prev;
        }
        if (errors.events) setErrors((prevErr) => ({ ...prevErr, events: '' }));
        return { ...prev, technicalEvents: [...prev.technicalEvents, eventTitle] };
      }
    });
  };

  const handleNonTechToggle = (eventTitle: string) => {
    const targetEvent = NON_TECHNICAL_EVENTS.find((e) => e.title === eventTitle);
    if (targetEvent?.isOnlineRegistrationClosed) {
      setClosedEventNotice(targetEvent);
      return;
    }

    setFormData((prev) => {
      const isSelected = prev.nonTechnicalEvents.includes(eventTitle);
      if (isSelected) {
        return { ...prev, nonTechnicalEvents: prev.nonTechnicalEvents.filter((t) => t !== eventTitle) };
      } else {
        const totalSelected = prev.technicalEvents.length + prev.nonTechnicalEvents.length;
        if (totalSelected >= 3) {
          setErrors((prevErr) => ({
            ...prevErr,
            events: 'Maximum limit reached! You can select up to 3 events in total.',
          }));
          return prev;
        }
        if (errors.events) setErrors((prevErr) => ({ ...prevErr, events: '' }));
        return { ...prev, nonTechnicalEvents: [...prev.nonTechnicalEvents, eventTitle] };
      }
    });
  };

  const totalSelectedEvents = formData.technicalEvents.length + formData.nonTechnicalEvents.length;

  // Validation function per step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Valid email address is required.';
      }
      if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Mobile number must be exactly 10 digits.';
      }
      if (!formData.collegeName.trim()) newErrors.collegeName = 'College / Institution name is required.';
      if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required.';
      if (!formData.major) newErrors.major = 'Major is required.';

      if ((formData.major === 'Others' || formData.major === 'Other') && !formData.majorOther?.trim()) {
        newErrors.majorOther = 'Please specify your Major / Degree.';
      }

      if (!formData.department) newErrors.department = 'Department is required.';

      if ((formData.department === 'Other' || formData.department === 'Others') && !formData.departmentOther.trim()) {
        newErrors.departmentOther = 'Please specify your department.';
      }
    } else if (step === 2) {
      if (!formData.participationType) {
        newErrors.participationType = 'Participation type is required.';
      }
      if (formData.participationType === 'Team' && !formData.teamName.trim()) {
        newErrors.teamName = 'Team name is required for team participation.';
      }
    } else if (step === 3) {
      const activeTechEvents = formData.technicalEvents.filter(
        (t) => !TECHNICAL_EVENTS.find((e) => e.title === t)?.isOnlineRegistrationClosed
      );
      if (activeTechEvents.length !== formData.technicalEvents.length) {
        setFormData((prev) => ({ ...prev, technicalEvents: activeTechEvents }));
      }
      const activeNonTechEvents = formData.nonTechnicalEvents.filter(
        (nt) => !NON_TECHNICAL_EVENTS.find((e) => e.title === nt)?.isOnlineRegistrationClosed
      );
      if (activeNonTechEvents.length !== formData.nonTechnicalEvents.length) {
        setFormData((prev) => ({ ...prev, nonTechnicalEvents: activeNonTechEvents }));
      }
      const activeTotal = activeTechEvents.length + activeNonTechEvents.length;

      if (activeTotal < 1) {
        newErrors.events = 'Select at least 1 Technical event and 1 Non-Technical event to proceed.';
      } else if (activeTechEvents.length < 1) {
        newErrors.events = 'Constraint: Out of your choices, you MUST select at least 1 Technical event (e.g. The Final Hire or The Prompt League). Note: Paper Presentation and Zero Hour are closed for online registration.';
      } else if (activeNonTechEvents.length < 1) {
        newErrors.events = 'Constraint: Out of your choices, you MUST select at least 1 Non-Technical event. Note: Goated or Ghosted is closed for online registration.';
      } else if (activeTotal > 3) {
        newErrors.events = 'You can select a maximum of 3 events total.';
      }
    } else if (step === 4) {
      if (!formData.paymentScreenshot) {
        newErrors.paymentScreenshot = 'Payment screenshot is required.';
      } else {
        if (!formData.paymentScreenshot.type.startsWith('image/')) {
          newErrors.paymentScreenshot = 'Uploaded file must be an image (PNG, JPG, WEBP).';
        } else if (formData.paymentScreenshot.size > 1024 * 1024) {
          newErrors.paymentScreenshot = 'File size exceeds 1 MB limit. Please upload a smaller screenshot.';
        }
      }

      if (!formData.utrNumber || !formData.utrNumber.trim()) {
        newErrors.utrNumber = 'UTR / UPI Reference Number is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep((prev) => prev + 1);
        scrollToFormTop();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollToFormTop();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If user is not yet on Step 5 (Review & Submit), do not submit; just advance to next step
    if (currentStep < 5) {
      handleNextStep();
      return;
    }

    // Guard against accidental double clicks / click event propagation from Step 4 Continue button
    if (Date.now() - step5MountedAtRef.current < 500) {
      console.warn('Prevented accidental instant submit during Step 5 transition');
      return;
    }
    
    // Final sanity validation check across all steps before API submission
    let isValid = true;
    for (let step = 1; step <= 4; step++) {
      if (!validateStep(step)) {
        isValid = false;
        setCurrentStep(step);
        scrollToFormTop();
        break;
      }
    }

    if (!isValid) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    // EXACT submission payload function call
    const result = await submitRegistration(formData);
    setIsSubmitting(false);
    setSubmissionResult(result);

    if (result.success) {
      setSubmittedData({ ...formData });
      resetForm();
      if (onClearPreSelectedEvent) {
        onClearPreSelectedEvent();
      }
    }
  };

  const copyReceiptId = () => {
    if (submissionResult?.registrationId) {
      navigator.clipboard.writeText(submissionResult.registrationId);
      setCopiedReceiptId(true);
      setTimeout(() => setCopiedReceiptId(false), 2000);
    }
  };

  return (
    <section id="registration" className="py-16 sm:py-24 bg-transparent text-white relative font-dm overflow-hidden">
      {/* Background Radial Metallic Blue Burst */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Radiant Light Streaks Background Layer */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #2563eb 0%, transparent 60%), linear-gradient(135deg, rgba(37,99,235,0.2) 0%, transparent 100%)`
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
          
          {/* Section Header */}
          <SectionHeader
            badgeText="Registration Portal"
            title="Register for AIROX '26"
            ghostWatermark="REGISTER"
            description="Reserve your official delegate seat for the National Level Technical Symposium. Complete the guided steps below."
            align="center"
          />

          {/* MAIN FUTURISTIC CHAMFERED CARD CONTAINER */}
          <div className="relative mx-auto w-full">
            
            {/* CHAMFERED CARD CONTAINER WITH METALLIC SHEEN */}
            <div 
              className="relative p-5 sm:p-10 md:p-12 bg-[#0a0d14]/90 backdrop-blur-xl border border-white/20 shadow-[0_0_80px_rgba(37,99,235,0.25)] rounded-3xl overflow-visible"
            >
              
              {/* Inner Chamfered Hairline Glow Border */}
              <div 
                className="absolute inset-1 pointer-events-none border border-white/10 rounded-2xl"
              />

              {/* CARD BRAND HEADER - "AIROX" Logo */}
              <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-white/10">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <img
                    src="https://drive.google.com/thumbnail?id=1LIMz7pr3bpS-geAYazJ-vu_0KL7lcU8V&sz=w1000"
                    onError={(e) => {
                      e.currentTarget.src = 'https://lh3.googleusercontent.com/d/1LIMz7pr3bpS-geAYazJ-vu_0KL7lcU8V';
                    }}
                    alt="AIROX Symposium Logo"
                    className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full bg-black/40 p-1 border border-cyan-500/30"
                  />
                  <span className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase font-dm">AIROX</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
                  DELEGATE PASS
                </span>
              </div>

              {/* MULTI-STEP PROGRESS NAVIGATION INDICATOR */}
              <div className="py-6 border-b border-white/10">
                
                {/* Mobile View Progress Header (< sm) */}
                <div className="sm:hidden space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 uppercase tracking-wider">
                      STEP {currentStep} OF 5
                    </span>
                    <span className="text-cyan-400 font-bold uppercase tracking-wider">
                      {STEP_TITLES[currentStep - 1].title}
                    </span>
                  </div>

                  {/* Progress Bar Line */}
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-400 transition-all duration-300 rounded-full"
                      style={{ width: `${(currentStep / 5) * 100}%` }}
                    />
                  </div>

                  {/* Step dots */}
                  <div className="flex justify-between px-1">
                    {STEP_TITLES.map((st) => (
                      <button
                        key={st.step}
                        type="button"
                        onClick={() => {
                          if (st.step < currentStep || validateStep(currentStep)) {
                            setCurrentStep(st.step);
                            scrollToFormTop();
                          }
                        }}
                        className={`w-6 h-6 rounded-full text-[10px] font-mono font-bold flex items-center justify-center transition-all ${
                          currentStep === st.step
                            ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                            : st.step < currentStep
                            ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                            : 'bg-white/10 text-gray-500'
                        }`}
                      >
                        {st.step < currentStep ? <Check className="w-3 h-3 text-emerald-400" /> : st.step}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desktop View Horizontal Stepper (sm+) */}
                <div className="hidden sm:grid grid-cols-5 gap-2">
                  {STEP_TITLES.map((st) => {
                    const isActive = currentStep === st.step;
                    const isCompleted = currentStep > st.step;
                    const Icon = st.icon;

                    return (
                      <button
                        key={st.step}
                        type="button"
                        onClick={() => {
                          if (st.step < currentStep || validateStep(currentStep)) {
                            setCurrentStep(st.step);
                            scrollToFormTop();
                          }
                        }}
                        className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all text-center cursor-pointer ${
                          isActive
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                            : isCompleted
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                            isActive
                              ? 'bg-cyan-400 text-black'
                              : isCompleted
                              ? 'bg-emerald-500 text-black'
                              : 'bg-white/20 text-white'
                          }`}>
                            {isCompleted ? <Check className="w-3 h-3" /> : st.step}
                          </span>
                          <Icon className="w-3.5 h-3.5 opacity-80" />
                        </div>
                        <span className="text-[11px] font-semibold leading-tight tracking-tight">
                          {st.shortTitle}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* REGISTRATION FORM MULTI-STEP BODY */}
              <form onSubmit={handleSubmit} className="py-6 space-y-6">

                {/* ====================================================== */}
                {/* STEP 1: PERSONAL DETAILS */}
                {/* ====================================================== */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {totalSelectedEvents > 0 && (
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-between gap-3 text-xs font-mono text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        <div className="flex items-center gap-2 min-w-0">
                          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
                          <span className="truncate">
                            Pre-selected event: <strong className="text-white font-bold">{[...formData.technicalEvents, ...formData.nonTechnicalEvents].join(', ')}</strong>
                          </span>
                        </div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase bg-cyan-900/80 px-2.5 py-1 rounded-full border border-cyan-500/30 shrink-0">
                          SELECTION QUEUED
                        </span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-cyan-400" />
                        <span>Step 1 — Personal Details</span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        Enter your primary contact and academic institution details to start registration.
                      </p>
                    </div>

                    {/* Full Name Input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-white tracking-wide pl-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Rivera"
                        autoCapitalize="words"
                        className={`w-full bg-white/10 border text-white text-sm rounded-2xl px-5 py-3.5 placeholder-gray-500 focus:bg-white/15 focus:border-white focus:outline-none transition-all ${
                          errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-white/15'
                        }`}
                      />
                      {errors.fullName && <p className="text-xs text-red-400 pl-2">{errors.fullName}</p>}
                    </div>

                    {/* Email Address Input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-white tracking-wide pl-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        inputMode="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. alex.rivera@example.com"
                        autoCapitalize="none"
                        className={`w-full bg-white/10 border text-white text-sm rounded-2xl px-5 py-3.5 placeholder-gray-500 focus:bg-white/15 focus:border-white focus:outline-none transition-all ${
                          errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-white/15'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-400 pl-2">{errors.email}</p>}
                    </div>

                    {/* Mobile Number & College Inputs in Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-white tracking-wide pl-1">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          inputMode="numeric"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength={10}
                          pattern="[0-9]{10}"
                          placeholder="10-digit mobile number"
                          className={`w-full bg-white/10 border text-white text-sm rounded-2xl px-5 py-3.5 placeholder-gray-500 focus:bg-white/15 focus:border-white focus:outline-none transition-all ${
                            errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-white/15'
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-red-400 pl-2">{errors.phone}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-white tracking-wide pl-1">
                          College / Institution *
                        </label>
                        <input
                          type="text"
                          name="collegeName"
                          value={formData.collegeName}
                          onChange={handleInputChange}
                          placeholder="College or University name"
                          className={`w-full bg-white/10 border text-white text-sm rounded-2xl px-5 py-3.5 placeholder-gray-500 focus:bg-white/15 focus:border-white focus:outline-none transition-all ${
                            errors.collegeName ? 'border-red-500 ring-1 ring-red-500' : 'border-white/15'
                          }`}
                        />
                        {errors.collegeName && <p className="text-xs text-red-400 pl-2">{errors.collegeName}</p>}
                      </div>
                    </div>

                    {/* Year of Study & Major Dropdowns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-white tracking-wide pl-1">
                          Year of Study *
                        </label>
                        <CustomYearDropdown
                          value={formData.yearOfStudy}
                          onChange={(val) => setFormData((prev) => ({ ...prev, yearOfStudy: val }))}
                          options={YEAR_OPTIONS}
                          placeholder="Select Year of Study"
                          error={!!errors.yearOfStudy}
                        />
                        {errors.yearOfStudy && <p className="text-xs text-red-400 pl-2">{errors.yearOfStudy}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-white tracking-wide pl-1">
                          Major / Degree *
                        </label>
                        <CustomYearDropdown
                          value={formData.major}
                          onChange={(val) => {
                            const validDepts = getDepartmentsForMajor(val);
                            const isCurrentValid = validDepts.some((d) => d.value === formData.department);
                            setFormData((prev) => ({
                              ...prev,
                              major: val,
                              department: isCurrentValid ? prev.department : (validDepts[0]?.value || 'Other'),
                              majorOther: (val !== 'Others' && val !== 'Other') ? '' : prev.majorOther,
                            }));
                          }}
                          options={MAJOR_OPTIONS}
                          placeholder="Select Major / Degree"
                          error={!!errors.major}
                        />
                        {errors.major && <p className="text-xs text-red-400 pl-2">{errors.major}</p>}
                      </div>
                    </div>

                    {/* Conditional Major 'Others' Field */}
                    {(formData.major === 'Others' || formData.major === 'Other') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5 pt-1"
                      >
                        <label className="block text-xs font-semibold text-cyan-300 tracking-wide pl-1">
                          Please specify your Major / Degree *
                        </label>
                        <input
                          type="text"
                          name="majorOther"
                          value={formData.majorOther || ''}
                          onChange={handleInputChange}
                          placeholder="Type your Major / Degree name (e.g. B.Sc CS, B.Arch, BBA)"
                          className={`w-full bg-cyan-950/30 border text-white text-sm rounded-2xl px-5 py-3.5 placeholder-gray-500 focus:bg-cyan-900/40 focus:border-cyan-400 focus:outline-none transition-all ${
                            errors.majorOther ? 'border-red-500 ring-1 ring-red-500' : 'border-cyan-500/40'
                          }`}
                        />
                        {errors.majorOther && (
                          <p className="text-xs text-red-400 pl-2">{errors.majorOther}</p>
                        )}
                      </motion.div>
                    )}

                    {/* Department Selection & Conditional 'Other' Field */}
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-white tracking-wide pl-1">
                          Department *
                        </label>
                        <CustomYearDropdown
                          value={formData.department}
                          onChange={(val) => {
                            setFormData((prev) => ({ ...prev, department: val }));
                            if (val !== 'Other' && val !== 'Others') {
                              setFormData((prev) => ({ ...prev, departmentOther: '' }));
                            }
                          }}
                          options={getDepartmentsForMajor(formData.major)}
                          placeholder="Select Department"
                          error={!!errors.department}
                        />
                        {errors.department && <p className="text-xs text-red-400 pl-2">{errors.department}</p>}
                      </div>

                      {(formData.department === 'Other' || formData.department === 'Others') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5 pt-1"
                        >
                          <label className="block text-xs font-semibold text-cyan-300 tracking-wide pl-1">
                            Please specify your department *
                          </label>
                          <input
                            type="text"
                            name="departmentOther"
                            value={formData.departmentOther}
                            onChange={handleInputChange}
                            placeholder="Type your department name"
                            className={`w-full bg-cyan-950/30 border text-white text-sm rounded-2xl px-5 py-3.5 placeholder-gray-500 focus:bg-cyan-900/40 focus:border-cyan-400 focus:outline-none transition-all ${
                              errors.departmentOther ? 'border-red-500 ring-1 ring-red-500' : 'border-cyan-500/40'
                            }`}
                          />
                          {errors.departmentOther && (
                            <p className="text-xs text-red-400 pl-2">{errors.departmentOther}</p>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ====================================================== */}
                {/* STEP 2: PARTICIPATION TYPE */}
                {/* ====================================================== */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-cyan-400" />
                        <span>Step 2 — Participation Type</span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        Choose whether you are registering as an individual delegate or with a team.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-white tracking-wide pl-1">
                        How will you participate? *
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleParticipationTypeChange('Individual')}
                          className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                            formData.participationType === 'Individual'
                              ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <div className={`p-3 rounded-xl shrink-0 ${
                            formData.participationType === 'Individual' ? 'bg-cyan-400 text-black' : 'bg-white/10 text-gray-300'
                          }`}>
                            <User className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block">Individual Delegate</span>
                            <span className="text-xs text-gray-400">Compete individually in events that accept solo participants.</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleParticipationTypeChange('Team')}
                          className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                            formData.participationType === 'Team'
                              ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <div className={`p-3 rounded-xl shrink-0 ${
                            formData.participationType === 'Team' ? 'bg-cyan-400 text-black' : 'bg-white/10 text-gray-300'
                          }`}>
                            <Users className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block">Team Participation</span>
                            <span className="text-xs text-gray-400">Represent a squad/team with access to all symposium events.</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Conditional Team Name Input */}
                    {formData.participationType === 'Team' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5 pt-2"
                      >
                        <label className="block text-xs font-semibold text-cyan-300 tracking-wide pl-1">
                          Team Name *
                        </label>
                        <input
                          type="text"
                          name="teamName"
                          value={formData.teamName}
                          onChange={handleInputChange}
                          placeholder="e.g. Cyber Matrix"
                          className={`w-full bg-cyan-950/30 border text-white text-sm rounded-2xl px-5 py-3.5 placeholder-gray-500 focus:bg-cyan-900/40 focus:border-cyan-400 focus:outline-none transition-all ${
                            errors.teamName ? 'border-red-500 ring-1 ring-red-500' : 'border-cyan-500/40'
                          }`}
                        />
                        {errors.teamName && <p className="text-xs text-red-400 pl-2">{errors.teamName}</p>}
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* ====================================================== */}
                {/* STEP 3: EVENT SELECTION */}
                {/* ====================================================== */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <Cpu className="w-5 h-5 text-cyan-400" />
                          <span>Step 3 — Select Events</span>
                        </h3>
                        <p className="text-xs text-gray-300">
                          Choose up to <strong>3 events total</strong> (Must include at least <strong>1 Technical</strong> and at least <strong>1 Non-Technical</strong> event).
                        </p>
                      </div>

                      {/* Live Counter Badge */}
                      <div className="shrink-0">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
                          totalSelectedEvents === 3
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : totalSelectedEvents > 0
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-white/10 text-gray-400 border-white/10'
                        }`}>
                          <span>{totalSelectedEvents} / 3 Events Selected</span>
                        </span>
                      </div>
                    </div>

                    {/* Participation Mode Status Banner */}
                    <div className="p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-cyan-200">
                        {formData.participationType === 'Individual' ? (
                          <User className="w-4 h-4 text-cyan-400 shrink-0" />
                        ) : (
                          <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                        )}
                        <span>
                          Showing events available for:{' '}
                          <strong className="text-white font-semibold">
                            {formData.participationType === 'Individual'
                              ? 'Individual Participant'
                              : `Team: ${formData.teamName?.trim() || 'Team'}`}
                          </strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setCurrentStep(2); scrollToFormTop(); }}
                        className="text-[11px] font-mono font-bold text-cyan-400 hover:text-cyan-300 underline shrink-0 cursor-pointer"
                      >
                        Change
                      </button>
                    </div>

                    {errors.events && (
                      <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{errors.events}</span>
                      </div>
                    )}

                    {/* ONLINE REGISTRATION CLOSED NOTIFICATION BANNER */}
                    <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-xs">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 leading-relaxed text-gray-300">
                        <span className="text-amber-300 font-bold block">
                          Important Notice: Online Registration Closed for Certain Events
                        </span>
                        <p className="text-gray-300 text-[11px]">
                          Online registration for <strong className="text-white">Paper Presentation</strong>, <strong className="text-white">Zero Hour</strong>, and <strong className="text-white">Goated or Ghosted</strong> has concluded. Please select from our other exciting events below.
                        </p>
                      </div>
                    </div>

                    {/* TECHNICAL EVENTS CATEGORY */}
                    <div className="rounded-2xl border border-cyan-500/40 overflow-hidden bg-cyan-950/20 backdrop-blur-md">
                      <button
                        type="button"
                        onClick={() => setIsTechOpen(!isTechOpen)}
                        className="w-full p-4 flex items-center justify-between bg-cyan-950/60 hover:bg-cyan-900/40 text-cyan-200 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                            Technical Events ({filteredTechnicalEvents.length})
                          </span>
                        </div>
                        {isTechOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
                      </button>

                      {isTechOpen && (
                        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-cyan-500/20 bg-black/40">
                          {filteredTechnicalEvents.map((event) => {
                            const isClosed = Boolean(event.isOnlineRegistrationClosed);
                            const isChecked = formData.technicalEvents.includes(event.title);
                            const isDisabled = !isChecked && totalSelectedEvents >= 3;

                            if (isClosed) {
                              return (
                                <div
                                  key={event.id}
                                  className="col-span-1 sm:col-span-2 p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 flex items-center justify-between gap-2.5 shadow-sm opacity-90 cursor-not-allowed select-none"
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                                      <AlertCircle className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs font-bold text-gray-300 line-through opacity-80">
                                          {event.title}
                                        </span>
                                        <span className="text-[9px] font-mono uppercase font-extrabold px-2 py-0.5 rounded bg-amber-500 text-black shadow-sm">
                                          ONLINE REGISTRATION CLOSED
                                        </span>
                                      </div>
                                      <span className="text-[11px] text-amber-300/90 font-medium block mt-0.5">
                                        The event is closed for online registration
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div
                                key={event.id}
                                onClick={() => !isDisabled && handleTechToggle(event.title)}
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  isChecked
                                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer'
                                    : isDisabled
                                    ? 'bg-white/5 border-white/5 text-gray-500 opacity-50 cursor-not-allowed'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-cyan-500/40 hover:bg-white/10 cursor-pointer'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-gray-500 shrink-0" />
                                  )}
                                  <div className="min-w-0">
                                    <span className="text-xs font-medium text-white truncate block">{event.title}</span>
                                    <span className="text-[10px] text-gray-400 block">{event.teamSize}</span>
                                  </div>
                                </div>
                                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded shrink-0">
                                  TECH
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* NON-TECHNICAL EVENTS CATEGORY */}
                    <div className="rounded-2xl border border-amber-500/40 overflow-hidden bg-amber-950/20 backdrop-blur-md">
                      <button
                        type="button"
                        onClick={() => setIsNonTechOpen(!isNonTechOpen)}
                        className="w-full p-4 flex items-center justify-between bg-amber-950/60 hover:bg-amber-900/40 text-amber-200 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                            Non-Technical Events ({filteredNonTechnicalEvents.length})
                          </span>
                        </div>
                        {isNonTechOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-amber-400" />}
                      </button>

                      {isNonTechOpen && (
                        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-amber-500/20 bg-black/40">
                          {filteredNonTechnicalEvents.map((event) => {
                            const isClosed = Boolean(event.isOnlineRegistrationClosed);
                            const isChecked = formData.nonTechnicalEvents.includes(event.title);
                            const isDisabled = !isChecked && totalSelectedEvents >= 3;

                            if (isClosed) {
                              return (
                                <div
                                  key={event.id}
                                  className="col-span-1 sm:col-span-2 p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 flex items-center justify-between gap-2.5 shadow-sm opacity-90 cursor-not-allowed select-none"
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                                      <AlertCircle className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs font-bold text-gray-300 line-through opacity-80">
                                          {event.title}
                                        </span>
                                        <span className="text-[9px] font-mono uppercase font-extrabold px-2 py-0.5 rounded bg-amber-500 text-black shadow-sm">
                                          ONLINE REGISTRATION CLOSED
                                        </span>
                                      </div>
                                      <span className="text-[11px] text-amber-300/90 font-medium block mt-0.5">
                                        The event is closed for online registration
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div
                                key={event.id}
                                onClick={() => !isDisabled && handleNonTechToggle(event.title)}
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  isChecked
                                    ? 'bg-amber-950/80 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer'
                                    : isDisabled
                                    ? 'bg-white/5 border-white/5 text-gray-500 opacity-50 cursor-not-allowed'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-amber-500/40 hover:bg-white/10 cursor-pointer'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-gray-500 shrink-0" />
                                  )}
                                  <div className="min-w-0">
                                    <span className="text-xs font-medium text-white truncate block">{event.title}</span>
                                    <span className="text-[10px] text-gray-400 block">{event.teamSize}</span>
                                  </div>
                                </div>
                                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded shrink-0">
                                  NON-TECH
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Summary Pills of Selected Events */}
                    {totalSelectedEvents > 0 && (
                      <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                        <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">
                          Current Event Selection ({totalSelectedEvents} / 3):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.technicalEvents.map((title) => (
                            <span
                              key={title}
                              className="text-[11px] font-medium bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/40 flex items-center gap-1.5"
                            >
                              <span>{title} (Tech)</span>
                              <button
                                type="button"
                                onClick={() => handleTechToggle(title)}
                                className="text-cyan-400 hover:text-white text-xs font-bold ml-1 cursor-pointer"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                          {formData.nonTechnicalEvents.map((title) => (
                            <span
                              key={title}
                              className="text-[11px] font-medium bg-amber-950/80 text-amber-300 px-3 py-1 rounded-full border border-amber-500/40 flex items-center gap-1.5"
                            >
                              <span>{title} (Non-Tech)</span>
                              <button
                                type="button"
                                onClick={() => handleNonTechToggle(title)}
                                className="text-amber-400 hover:text-white text-xs font-bold ml-1 cursor-pointer"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ====================================================== */}
                {/* STEP 4: PAYMENT */}
                {/* ====================================================== */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-cyan-400" />
                        <span>Step 4 — Payment</span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        Scan the UPI QR code or transfer to the account below, then upload your payment screenshot.
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 bg-white/5 border border-white/15 rounded-2xl space-y-4">
                      <div className="flex flex-col sm:flex-row items-center gap-5">
                        
                        {/* QR Code Container */}
                        <div className="p-3.5 bg-white rounded-2xl shrink-0 flex flex-col items-center shadow-xl border border-gray-200 text-center w-full sm:w-auto max-w-[240px]">
                          <div className="flex items-center gap-1.5 text-black text-xs font-bold mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                            MV
                          </div>
                          <div className="p-1 bg-white rounded-xl border border-gray-200 shadow-inner flex items-center justify-center overflow-hidden min-h-[160px] min-w-[160px]">
                            {qrCodeDataUrl ? (
                              <img
                                src={qrCodeDataUrl}
                                alt="Google Pay QR Code - MV (mohanavelan2006-1@oksbi)"
                                className="w-44 h-44 object-contain rounded-lg"
                              />
                            ) : (
                              <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi%3A%2F%2Fpay%3Fpa%3Dmohanavelan2006-1%40oksbi%26pn%3DMV%26am%3D200%26cu%3DINR"
                                alt="Google Pay QR Code - MV"
                                className="w-44 h-44 object-contain rounded-lg"
                              />
                            )}
                          </div>
                          <div className="mt-2 text-[10px] font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200 w-full truncate font-mono select-all">
                            UPI ID: mohanavelan2006-1@oksbi
                          </div>
                          <span className="text-[11px] text-emerald-700 font-bold mt-1">Fee: ₹200.00</span>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-3 flex-1 text-xs">
                          <div>
                            <span className="text-emerald-400 font-bold text-base block">
                              Registration Fee: ₹{SYMPOSIUM_INFO.registration.onlineFee}
                            </span>
                            <span className="text-gray-300 text-xs">A/C Holder: <strong className="text-white">MV</strong></span>
                          </div>

                          {/* UPI ID Box */}
                          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                            <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
                              <span className="text-gray-300 font-medium">UPI ID (Google Pay / PhonePe):</span>
                              <button
                                type="button"
                                onClick={handleCopyUpi}
                                className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-semibold rounded-md border border-cyan-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                {copiedUpi ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-cyan-400" />
                                    <span>Copy UPI ID</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <code className="block bg-black/40 px-3 py-1.5 rounded-lg text-cyan-300 font-mono text-xs border border-white/10 select-all">
                              mohanavelan2006-1@oksbi
                            </code>
                          </div>

                          {/* Mobile Number Box */}
                          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                            <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
                              <span className="text-gray-300 font-medium">Mobile Number:</span>
                              <button
                                type="button"
                                onClick={handleCopyPhone}
                                className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-semibold rounded-md border border-cyan-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                {copiedPhone ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-cyan-400" />
                                    <span>Copy Number</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <code className="block bg-black/40 px-3 py-1.5 rounded-lg text-cyan-300 font-mono text-xs border border-white/10 select-all">
                              +91 86677 95829
                            </code>
                          </div>

                          <p className="text-gray-300 leading-relaxed text-[11px]">
                            Scan QR code or pay via Google Pay, PhonePe, Paytm, BHIM to <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan-300 font-mono">mohanavelan2006-1@oksbi</code> or <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan-300 font-mono">+91 86677 95829</code>.
                          </p>
                        </div>
                      </div>

                      {/* Payment Screenshot Upload Box */}
                      <div className="space-y-2 pt-3 border-t border-white/10">
                        <label className="block text-xs font-semibold text-white tracking-wide">
                          Payment Screenshot * (Required)
                        </label>

                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        {!formData.paymentScreenshot ? (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`p-5 sm:p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all bg-black/30 hover:bg-white/5 ${
                              errors.paymentScreenshot ? 'border-red-500 bg-red-950/20' : 'border-white/20 hover:border-cyan-400/60'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                              <Upload className="w-6 h-6" />
                            </div>
                            <div className="text-center">
                              <span className="text-sm font-bold text-white block">
                                Click to upload payment screenshot
                              </span>
                              <span className="text-xs text-gray-400">
                                PNG, JPG or WEBP (Max file size: 1 MB)
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3.5 bg-cyan-950/30 border border-cyan-500/40 rounded-2xl flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              {imagePreviewUrl ? (
                                <img
                                  src={imagePreviewUrl}
                                  alt="Payment Screenshot Preview"
                                  className="w-14 h-14 object-cover rounded-lg border border-cyan-500/40 shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center shrink-0">
                                  <ImageIcon className="w-6 h-6 text-cyan-400" />
                                </div>
                              )}

                              <div className="min-w-0">
                                <span className="text-xs font-bold text-white truncate block">
                                  {formData.paymentScreenshot.name}
                                </span>
                                <span className="text-[11px] font-mono text-cyan-300">
                                  {(formData.paymentScreenshot.size / 1024).toFixed(1)} KB
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                              >
                                Change
                              </button>
                              <button
                                type="button"
                                onClick={removeFile}
                                className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors cursor-pointer"
                                title="Remove screenshot"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {errors.paymentScreenshot && (
                          <p className="text-xs text-red-400 pl-1">{errors.paymentScreenshot}</p>
                        )}
                      </div>

                      {/* UTR / UPI Reference Number */}
                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        <label className="block text-xs font-semibold text-white tracking-wide pl-1">
                          UTR / UPI Reference Number <span className="text-cyan-400 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          inputMode="text"
                          name="utrNumber"
                          value={formData.utrNumber}
                          onChange={handleInputChange}
                          placeholder="e.g. 12-digit UTR ID (123456789012)"
                          className={`w-full bg-white/10 border text-white text-sm rounded-2xl px-5 py-3.5 placeholder-gray-500 focus:bg-white/15 focus:border-white focus:outline-none transition-all ${
                            errors.utrNumber ? 'border-red-500/70 focus:border-red-500' : 'border-white/15'
                          }`}
                        />
                        {errors.utrNumber && (
                          <p className="text-xs text-red-400 pl-1">{errors.utrNumber}</p>
                        )}
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* ====================================================== */}
                {/* STEP 5: REVIEW & SUBMIT */}
                {/* ====================================================== */}
                {currentStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-cyan-400" />
                        <span>Step 5 — Review Your Registration</span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        Please review all details before submitting. You can click 'Back' to make any edits.
                      </p>
                    </div>

                    {/* Summary Review Card */}
                    <div className="p-5 bg-white/5 border border-white/15 rounded-2xl space-y-4">
                      
                      {/* Section 1: Personal Details */}
                      <div className="space-y-2 pb-3 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" /> PERSONAL DETAILS
                          </span>
                          <button
                            type="button"
                            onClick={() => { setCurrentStep(1); scrollToFormTop(); }}
                            className="text-[11px] font-mono text-cyan-300 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div><span className="text-gray-400">Name:</span> <strong className="text-white">{formData.fullName}</strong></div>
                          <div><span className="text-gray-400">Email:</span> <strong className="text-white">{formData.email}</strong></div>
                          <div><span className="text-gray-400">Phone:</span> <strong className="text-white">{formData.phone}</strong></div>
                          <div><span className="text-gray-400">College:</span> <strong className="text-white">{formData.collegeName}</strong></div>
                          <div><span className="text-gray-400">Year:</span> <strong className="text-white">{formData.yearOfStudy}</strong></div>
                          <div>
                            <span className="text-gray-400">Major:</span>{' '}
                            <strong className="text-white">
                              {(formData.major === 'Others' || formData.major === 'Other') ? (formData.majorOther || 'Others') : formData.major}
                            </strong>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-gray-400">Department:</span>{' '}
                            <strong className="text-white">
                              {(formData.department === 'Other' || formData.department === 'Others') ? (formData.departmentOther || 'Other') : formData.department}
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Participation */}
                      <div className="space-y-2 pb-3 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" /> PARTICIPATION
                          </span>
                          <button
                            type="button"
                            onClick={() => { setCurrentStep(2); scrollToFormTop(); }}
                            className="text-[11px] font-mono text-cyan-300 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        <div className="text-xs">
                          <span className="text-gray-400">Type:</span>{' '}
                          <strong className="text-white">
                            {formData.participationType} {formData.teamName ? `(Team Name: ${formData.teamName})` : ''}
                          </strong>
                        </div>
                      </div>

                      {/* Section 3: Events */}
                      <div className="space-y-2 pb-3 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5" /> SELECTED EVENTS ({totalSelectedEvents} / 3)
                          </span>
                          <button
                            type="button"
                            onClick={() => { setCurrentStep(3); scrollToFormTop(); }}
                            className="text-[11px] font-mono text-cyan-300 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {formData.technicalEvents.map((evt) => (
                            <span key={evt} className="text-[11px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                              {evt} (Tech)
                            </span>
                          ))}
                          {formData.nonTechnicalEvents.map((evt) => (
                            <span key={evt} className="text-[11px] bg-amber-950/80 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-md">
                              {evt} (Non-Tech)
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Section 4: Payment */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5" /> PAYMENT INFO
                          </span>
                          <button
                            type="button"
                            onClick={() => { setCurrentStep(4); scrollToFormTop(); }}
                            className="text-[11px] font-mono text-cyan-300 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div>
                            <span className="text-gray-400">UTR / Ref:</span>{' '}
                            <strong className="text-white font-mono">{formData.utrNumber || 'Not provided'}</strong>
                          </div>
                          {formData.paymentScreenshot && (
                            <div className="flex items-center gap-3 pt-1">
                              {imagePreviewUrl && (
                                <img
                                  src={imagePreviewUrl}
                                  alt="Preview"
                                  className="w-12 h-12 object-cover rounded-lg border border-cyan-500/40 shrink-0"
                                />
                              )}
                              <div>
                                <span className="text-white font-bold block">{formData.paymentScreenshot.name}</span>
                                <span className="text-[10px] text-cyan-300 font-mono">
                                  {(formData.paymentScreenshot.size / 1024).toFixed(1)} KB
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* API SUBMISSION ERROR BANNER */}
                    {submissionResult && !submissionResult.success && (
                      <div className="p-4 bg-red-950/60 border border-red-500/60 rounded-2xl text-red-200 text-xs space-y-1">
                        <div className="flex items-center gap-2 font-bold text-red-400">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>Registration Error</span>
                        </div>
                        <p className="pl-6">{submissionResult.message}</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* NAVIGATION BUTTONS BAR */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-white/20 hover:border-white text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : <div className="hidden sm:block" />}

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Continue</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white hover:bg-gray-100 text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </span>
                      ) : (
                        <>
                          <span>Submit Registration</span>
                          <ArrowUpRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>

            </div>

          </div>

        </div>
      </Container>

      {/* Success Receipt Modal */}
      {submissionResult?.success && (() => {
        const displayData = submittedData || formData;
        const handleCloseModal = () => {
          setSubmissionResult(null);
          setSubmittedData(null);
        };

        return (
          <Modal
            isOpen={!!submissionResult}
            onClose={handleCloseModal}
            title="Registration Verification Pass"
            subtitle="OFFICIAL AIROX '26 DELEGATE PASS"
            maxWidth="md"
          >
            <div className="space-y-6 text-gray-200 font-dm">
              
              {/* Confirmation Banner */}
              <div className="flex items-start gap-3 p-4 bg-blue-600/20 border border-blue-500/40 rounded-2xl text-white">
                <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-sm block">Registration Successful!</span>
                  <span className="text-xs text-gray-300 block">{submissionResult.message}</span>
                </div>
              </div>

              {/* Spam Folder Verification Notice */}
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-xs text-amber-200">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 block mb-0.5">Check Your Email / Spam Folder</span>
                  <span>A confirmation email with your Pass ID has been sent. If you do not see it in your Primary Inbox, please <strong>check your Spam / Junk folder</strong>.</span>
                </div>
              </div>

              {/* Pass Graphic */}
              <div className="bg-[#0a0d14] border border-white/20 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider block">
                      AIROX '26
                    </span>
                    <span className="text-xs text-gray-400">
                      DEPT OF AI & DS • JJCET
                    </span>
                  </div>
                  <Badge variant="ember" size="sm">VERIFIED DELEGATE</Badge>
                </div>

                {/* Pass ID Copy Box */}
                {submissionResult.registrationId && (
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase tracking-widest">REGISTRATION PASS ID</span>
                      <span className="text-lg sm:text-xl font-bold text-white tracking-wider">
                        {submissionResult.registrationId}
                      </span>
                    </div>
                    <button
                      onClick={copyReceiptId}
                      className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                      title="Copy Pass ID"
                    >
                      {copiedReceiptId ? <Check className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase">FULL NAME</span>
                    <span className="text-white font-bold">{displayData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase">INSTITUTION</span>
                    <span className="text-white font-bold truncate block">{displayData.collegeName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase">PARTICIPATION TYPE</span>
                    <span className="text-cyan-400 font-bold">
                      {displayData.participationType} {displayData.teamName ? `(${displayData.teamName})` : ''}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase">EVENT DATE</span>
                    <span className="text-white font-bold">22 AUGUST 2026</span>
                  </div>
                </div>

                {/* Selected Events List */}
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] text-gray-400 block mb-1 uppercase">REGISTERED COMPETITIONS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {displayData.technicalEvents.map((evt) => (
                      <span key={evt} className="text-[11px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                        {evt} (Tech)
                      </span>
                    ))}
                    {displayData.nonTechnicalEvents.map((evt) => (
                      <span key={evt} className="text-[11px] bg-amber-950/80 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-md">
                        {evt} (Non-Tech)
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                📍 Present this Pass ID at the registration desk in the Main Auditorium, JJCET, Trichy on <span className="text-white font-bold">22 August 2026</span> to collect your delegate badge and participation kit.
              </p>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </Modal>
        );
      })()}

      {/* POPUP MODAL: ONLINE REGISTRATION CLOSED */}
      {closedEventNotice && (
        <Modal
          isOpen={!!closedEventNotice}
          onClose={() => setClosedEventNotice(null)}
          title="Online Registration Closed"
          subtitle={`${closedEventNotice.title.toUpperCase()} • REGISTRATION UPDATE`}
          maxWidth="sm"
        >
          <div className="space-y-5 text-gray-200 font-dm">
            {/* Primary Alert Box */}
            <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-300 font-sans">
                  The event is closed for online registration
                </h4>
                <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
                  Online registration for <strong className="text-white">{closedEventNotice.title}</strong> is closed.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setClosedEventNotice(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-white/20 text-xs font-bold text-gray-200 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
