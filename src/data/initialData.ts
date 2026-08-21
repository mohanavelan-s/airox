/**
 * AIROX 2026 - Official Data Source
 * Contains verified institutional parameters and structured placeholders for symposium data.
 * Adheres strictly to non-invention constraints.
 */

import { CollegeInfo, SymposiumInfo, SymposiumEvent, TeamMember, FAQItem, OptionalSectionPlaceholder } from '../types';

export const COLLEGE_INFO: CollegeInfo = {
  name: 'JJ College of Engineering and Technology',
  autonomyStatus: 'Autonomous Institution',
  institutionGroup: 'Sowdambikaa Group of Institutions',
  location: 'Trichy, Tamil Nadu, India',
  establishedYear: 1994,
  department: {
    name: 'Department of Artificial Intelligence and Data Science',
    code: 'AI & DS',
    establishedYear: 2022,
    programme: 'B.Tech Artificial Intelligence and Data Science',
    facultyCount: '40+ Faculty Members',
    pastEditionParticipants: '500+ Participants (AIROX 2024)',
    vision: 'To emerge as a center of excellence in Artificial Intelligence and Data Science education, empowering students with cutting-edge analytical skills, ethical AI principles, and innovative research capabilities to address global challenges.',
    mission: [
      'Deliver rigorous academic programs with hands-on industrial practice in machine learning, data engineering, and intelligent systems.',
      'Establish state-of-the-art computational laboratories and collaborative research environments.',
      'Cultivate leadership, lifelong learning, and ethical responsibility in technology deployment.',
      'Bridge academia and industry through interdisciplinary hackathons, symposiums, and real-world project engagements.'
    ],
    overview: 'Established in 2022, the Department of Artificial Intelligence and Data Science at JJ College of Engineering and Technology provides an advanced curriculum combining foundational computing with modern machine learning, deep learning, big data analytics, and intelligent automation.',
    highlights: [
      'NBA / NAAC Accredited Ecosystem',
      'Advanced High-Performance AI & Data Computing Labs',
      '40+ Highly Qualified Faculty Members & Researchers',
      'Active Student Chapters and AI Research Clubs',
      '100% Industry-Aligned Project & Internship Ecosystem'
    ]
  }
};

export const SYMPOSIUM_INFO: SymposiumInfo = {
  name: 'AIROX 2026',
  edition: '2026 National Level Technical Symposium',
  theme: 'Accelerating Intelligence, Engineering the Future',
  date: '22 August 2026',
  isoDate: '2026-08-22',
  venue: 'Auditorium, JJ College of Engineering and Technology, Trichy',
  registration: {
    onlineFee: 200,
    onSpotFee: 250,
    closingDate: '21 August 2026',
    currency: 'INR'
  },
  eventCounts: {
    technical: 4,
    nonTechnical: 5
  }
};

/**
 * Technical Events (4)
 * Strictly structured placeholders until official names, rules & prizes are finalized.
 */
export const TECHNICAL_EVENTS: SymposiumEvent[] = [
  {
    id: 'tech-01',
    title: 'Paper presentation',
    category: 'technical',
    shortDescription: 'Open category – present on any academic, technical, research, innovation, or emerging technology topic.',
    fullDescription: 'Welcome to the AIROX 2026 Paper Presentation Event. Participants are requested to follow the rules below to ensure a smooth and fair competition. Topic: Open category – participants may present a paper on any academic, technical, research, innovation, or emerging technology topic.',
    isPlaceholder: false,
    imageUrl: 'https://drive.google.com/thumbnail?id=14cp7bIWAy6mRkLiFnfY7_FYdFwKZ8CuU&sz=w1000',
    timeSlot: '10:45 AM - 03:30 PM',
    venue: 'RK Block – Seminar Hall 1',
    teamSize: '2 - 4 Members',
    prizes: {
      first: 'Trophy + Certificate',
      second: 'Trophy + Certificate',
      third: 'Trophy + Certificate'
    },
    rules: [
      'Event Details: Team Size: 2–4 members per team | Presentation: 6 mins | Q&A: 2 mins | Total Time: 8 mins per team.',
      'Topic: Open category – participants may present a paper on any academic, technical, research, innovation, or emerging technology topic.',
      'Presentation Rules: Each team must consist of 2 to 4 members. Only registered team members are allowed to present.',
      'Timing: Each team will receive 6 minutes for the presentation followed by 2 minutes of Q&A with the judge.',
      'A warning will be given before the presentation time ends, and teams must stop when instructed.',
      'PPT presentations are recommended.',
      'Judging Criteria: Innovation & Originality, Problem Statement & Objectives, Technical Depth & Accuracy, Research / Methodology, Presentation & Communication, Practical Relevance, and Q&A Performance.',
      'General Guidelines: Maintain professional behavior throughout the event. Respect the judges\' decisions; the judges\' decision will be final.',
      'General Guidelines: Mobile phones should be kept on silent mode during presentations. Any form of plagiarism or inappropriate content may result in disqualification.'
    ],
    coordinators: {
      student: [
        { name: 'Elango Y', phone: '+91 91762 00584' },
        { name: 'Gayathri K', phone: '+91 93857 84514' }
      ]
    },
    tags: ['Paper Presentation', 'AI & DS', 'Research'],
    participationMode: 'team',
    isOnlineRegistrationClosed: true,
    closedNotice: 'Online registration for Paper Presentation is closed. Please come for on-spot registration at the venue!'
  },
  {
    id: 'tech-02',
    title: 'The Final Hire',
    category: 'technical',
    shortDescription: 'Step into an exciting recruitment experience through Aptitude, Technical Quiz, and HR rounds.',
    fullDescription: 'THE FINAL HIRE — Step into an exciting recruitment experience where you’ll put your skills to the test through Aptitude & Logical Reasoning, showcase your knowledge in the Technical Quiz, and express your Communication & Articulation in the final HR round. Compete, learn, and make your way through all three rounds for a chance to secure 1st, 2nd, or 3rd place. Three rounds. One exciting journey. Will you be the Final Hire?',
    isPlaceholder: false,
    imageUrl: 'https://drive.google.com/thumbnail?id=1hZ_hTEPNQikE8VFTv8jaNDNkGvEdYywQ&sz=w1000',
    timeSlot: '10:45 AM - 03:30 PM',
    venue: 'RK Block – 2nd Floor Classrooms',
    teamSize: 'Individual',
    prizes: {
      first: 'Trophy + Certificate',
      second: 'Trophy + Certificate',
      third: 'Trophy + Certificate'
    },
    rules: [
      'Paper-pen test on aptitude and technical round.',
      'To be completed within the specified time constraint.',
      'No usage of mobile devices during testing.'
    ],
    coordinators: {
      student: [
        { name: 'Abdul Basith', phone: '+91 63819 53283' },
        { name: 'Sandhiya S', phone: '+91 93453 52973' }
      ]
    },
    tags: ['Placement', 'Aptitude', 'Interview'],
    participationMode: 'individual',
    isOnlineRegistrationClosed: true,
    closedNotice: 'Online registration for The Final Hire is closed. Please come for on-spot registration at the venue!'
  },
  {
    id: 'tech-03',
    title: 'Zero Hour',
    category: 'technical',
    shortDescription: 'Design, build, and deploy a live website using AI tools — starting from a blank slate, entirely within a fixed time window.',
    fullDescription: 'Design, build, and deploy a live website using AI tools — starting from a blank slate, entirely within a fixed time window. Teams are judged not just on what they ship, but on how they plan, prompt, and think under pressure.',
    isPlaceholder: false,
    imageUrl: 'https://drive.google.com/thumbnail?id=1OIPsUOtwZ77h_U9_wjNJe52VtzLKxZ1d&sz=w1000',
    timeSlot: '10:45 AM - 03:30 PM',
    venue: 'AI & DS Lab',
    teamSize: '1 - 4 Members',
    prizes: {
      first: 'Trophy + Certificate',
      second: 'Trophy + Certificate',
      third: 'Trophy + Certificate'
    },
    rules: [
      'Any AI tool allowed — ChatGPT, Claude, Cursor, Antigravity, v0, or similar. No pre-written code; teams start from an empty project.',
      'Internet access is required and permitted throughout — this is an AI-assisted build, not a closed-book round.',
      'Final submission must include a live deployed link, project files, and your AI prompt log.'
    ],
    coordinators: {
      student: [
        { name: 'Mohanavelan S', phone: '+91 86677 95829' },
        { name: 'Deepa U', phone: '+91 73958 68047' }
      ]
    },
    tags: ['AI Build', 'Web Dev', 'Rapid Deploy'],
    participationMode: 'both',
    isOnlineRegistrationClosed: true,
    closedNotice: 'Online registration for Zero Hour is closed. Please come for on-spot registration at the venue!'
  },
  {
    id: 'tech-04',
    title: 'The Prompt League',
    category: 'technical',
    shortDescription: 'A three-round battle of wits testing prompt mastery, individual problem solving with AI, and creativity under pressure.',
    fullDescription: 'A three-round battle of wits where success depends less on knowing AI and more on knowing how to talk to it — from solo theory, to individual problem-solving with a chosen AI tool, to a final surprise test of creativity under pressure.',
    isPlaceholder: false,
    imageUrl: 'https://drive.google.com/thumbnail?id=14RY1O1q7XLcrev1C3P6EjRa9WVFjWSAw&sz=w1000',
    timeSlot: '10:45 AM - 03:30 PM',
    venue: 'Supernova Lab (RK Block)',
    teamSize: 'Individual',
    prizes: {
      first: 'Trophy + Certificate',
      second: 'Trophy + Certificate',
      third: 'Trophy + Certificate'
    },
    rules: [
      'Round 1 — Prompt Mastery: Individual MCQ round with 15 questions on prompt engineering concepts & scenarios.',
      'Round 2 — Ultimate Prompt Battle: Shortlisted participants craft/refine prompts using a designated AI tool to solve a real-world problem.',
      'Round 3 — Surprise Round: Finalists face a surprise challenge testing creativity, observation, and prompting skill revealed at the start.'
    ],
    coordinators: {
      student: [
        { name: 'Vishalini V', phone: '+91 93611 38477' },
        { name: 'Princy G', phone: '+91 73395 61880' }
      ]
    },
    tags: ['Prompt Engineering', 'GenAI', 'LLM'],
    participationMode: 'individual',
    isOnlineRegistrationClosed: true,
    closedNotice: 'Online registration for The Prompt League is closed. Please come for on-spot registration at the venue!'
  }
];

export const NON_TECHNICAL_EVENTS: SymposiumEvent[] = [
  {
    id: 'nontech-01',
    title: 'Ads Shot',
    category: 'non-technical',
    shortDescription: 'Get a theme, a limited time, and create an advertisement video from scratch!',
    fullDescription: 'Get a theme, a limited time, and create an advertisement from scratch! Only real-time footage is allowed — no movie clips, stock videos, or pre-recorded content. During the challenge, surprise topics will be sent at different time intervals (e.g., after 15 or 30 minutes), and participants must creatively include the given topic in their advertisement before final submission. Music, BGM, dialogues, effects, and editing are completely up to your creativity! Think fast. Create smart. Advertise creatively!',
    isPlaceholder: false,
    imageUrl: 'https://drive.google.com/thumbnail?id=1chmxdwKpxUdL4-YhpnmGXg93VnqsGwLB&sz=w1000',
    timeSlot: '10:45 AM - 03:30 PM',
    venue: 'RK Block – 2nd Floor Classrooms',
    teamSize: '1 - 3 Members',
    prizes: {
      first: 'Trophy + Certificate',
      second: 'Trophy + Certificate',
      third: 'Trophy + Certificate'
    },
    rules: [
      'Only real-time footage is allowed — no movie clips, stock videos, or pre-recorded content.',
      'Surprise topics will be sent at intervals (e.g., after 15 or 30 mins) and must be creatively included.',
      'Music, BGM, dialogues, effects, and editing are completely up to your creativity.'
    ],
    coordinators: {
      student: [
        { name: 'Sunpoornarajan M', phone: '+91 63694 61227' },
        { name: 'Madhushree B', phone: '+91 73392 17479' }
      ]
    },
    tags: ['Video Creation', 'Advertisement', 'Editing', 'Creative'],
    participationMode: 'both',
    isOnlineRegistrationClosed: true,
    closedNotice: 'Online registration for Ads Shot is closed. Please come for on-spot registration at the venue!'
  },
  {
    id: 'nontech-02',
    title: 'Goated or Ghosted',
    category: 'non-technical',
    shortDescription: 'A fun 4-round team challenge testing logic, memory, speed, teamwork, and coordination with a surprise final round!',
    fullDescription: 'GOATED OR GHOSTED is a fun 4-round team challenge that tests logic, memory, speed, teamwork, and coordination. Each round brings a different challenge, with the final round kept as a surprise! Think Fast. Play Smart. Be GOATED!',
    isPlaceholder: false,
    imageUrl: 'https://drive.google.com/thumbnail?id=1FFblsTw-iao1_2N1qnFD3aOpjUfhk7p4&sz=w1000',
    timeSlot: '10:45 AM - 03:30 PM',
    venue: 'RK Block – 2nd Floor Classrooms',
    teamSize: '3 - 4 Members',
    prizes: {
      first: 'Trophy + Certificate',
      second: 'Trophy + Certificate',
      third: 'Trophy + Certificate'
    },
    rules: [
      'Round 1 – Connection: Connect clues correctly within time limit. Teamwork and logical thinking are key.',
      'Round 2 – Memory Snapshot: Observe snapshot for allotted time and answer questions from memory. No peeking after time ends!',
      'Round 3 – Chair Relay: Complete relay as fast as possible following instructions. Speed & team coordination matter.',
      'Round 4 – Surprise Challenge: Rules revealed at venue. Be ready to adapt and give your best!',
      'General: Minimum 3 and maximum 4 members per team. Follow instructions; no external help or unfair means. Organizers\' decision is final.'
    ],
    coordinators: {
      student: [
        { name: 'Kishore R.K', phone: '+91 63790 45415' },
        { name: 'Thamizharsi V', phone: '+91 99628 29929' }
      ]
    },
    tags: ['Talent', 'Stage', 'Entertainment'],
    participationMode: 'team',
    isOnlineRegistrationClosed: true,
    closedNotice: 'Online registration for Goated or Ghosted is closed. Please come for on-spot registration at the venue!'
  },
  {
    id: 'nontech-03',
    title: 'Clash and Conquer',
    category: 'non-technical',
    shortDescription: 'A 3-round strategic team competition testing observation, memory, drawing, and recall under pressure.',
    fullDescription: 'Clash and Conquer features 3 exciting rounds: Imposter Hunt, Memory Rush, and Draw & Recall! Test your observation, memory, drawing, and team coordination under pressure.',
    isPlaceholder: false,
    imageUrl: 'https://drive.google.com/thumbnail?id=1Ixl3juw8bxWe0mlN0Qhe8dzfIBeO_9ss&sz=w1000',
    timeSlot: '10:45 AM - 03:30 PM',
    venue: 'RK Block – Seminar Hall 2',
    teamSize: '1 - 4 Members',
    prizes: {
      first: 'Trophy + Certificate',
      second: 'Trophy + Certificate',
      third: 'Trophy + Certificate'
    },
    rules: [
      'Round 1 – Imposter Hunt: Play in teams and identify the imposter based on clues given by team members.',
      'Round 2 – Memory Rush: Objects/images displayed followed by buzzer-based questions testing memory and observation.',
      'Round 3 – Draw and Recall: Quickly draw objects announced one by one and later recall objects and sequence.',
      'Team size: 1 to 4 members per team.'
    ],
    coordinators: {
      student: [
        { name: 'Sheik Zayed F', phone: '+91 85085 40901' },
        { name: 'Rithiha V', phone: '+91 93636 38835' }
      ]
    },
    tags: ['Strategy', 'Teamwork', 'Fun'],
    participationMode: 'both',
    isOnlineRegistrationClosed: true,
    closedNotice: 'Online registration for Clash and Conquer is closed. Please come for on-spot registration at the venue!'
  },
  {
    id: 'nontech-04',
    title: 'Box Cricket',
    category: 'non-technical',
    shortDescription: 'Action-packed short format indoor box cricket tournament.',
    fullDescription: 'High-energy fast-paced box cricket matches played under official symposium knockout rules.',
    isPlaceholder: false,
    imageUrl: 'https://drive.google.com/thumbnail?id=1N_lvTATs7TrzOTyVfq6IAy_5oK71ZqRb&sz=w1000',
    timeSlot: '10:45 AM - 03:30 PM',
    venue: 'Playground',
    teamSize: '4 - 5 Players',
    prizes: {
      first: 'Trophy + Certificate',
      second: 'Trophy + Certificate'
    },
    rules: [
      'Team Size: 4–5 players per team. Format: Knockout matches only.',
      'Overs: 3–4 overs per innings depending on available time.',
      'Equipment (bat & ball) provided by organizers. Bowling: Max 1 over per bowler.',
      'Behind Stumps: No runs awarded for shots played behind stumps.',
      'Outside Box: If ball pitches directly outside box, batsman is OUT.',
      'Umpire\'s decision is final. All players must cooperate and maintain sportsmanship.'
    ],
    coordinators: {
      student: [
        { name: 'MahendraVarman A', phone: '+91 93423 97445' },
        { name: 'Sridhar S', phone: '+91 95149 32484' }
      ]
    },
    tags: ['Sports', 'Cricket', 'Team'],
    participationMode: 'team',
    isOnlineRegistrationClosed: true,
    closedNotice: 'Online registration for Box Cricket is closed. Please come for on-spot registration at the venue!'
  },
  {
    id: 'nontech-05',
    title: 'eSports (Free Fire & Stumble Guys)',
    category: 'non-technical',
    shortDescription: 'Free Fire Squad Battle Royale & Clash Squad plus Stumble Guys multiplayer obstacle survival challenge.',
    fullDescription: 'An intense Esports showcase featuring two thrilling games: Free Fire (Squad Battle Royale leading to Clash Squad Finals) and Stumble Guys (Multi-round obstacle elimination race). Form your squad, test your reflexes, and battle for the top spot!',
    isPlaceholder: false,
    imageUrl: 'https://drive.google.com/thumbnail?id=1qGeaZ1haouQW8RZ-GVmhu7af8nwSHdhk&sz=w1000',
    timeSlot: '10:45 AM - 03:30 PM',
    venue: 'RK Block – 2nd Floor Classrooms',
    teamSize: 'Free Fire: 4 Players | Stumble Guys: Individual',
    prizes: {
      first: 'Trophy + Certificate',
      second: 'Trophy + Certificate',
      third: 'Trophy + Certificate'
    },
    rules: [
      '🔥 FREE FIRE RULES & FORMAT:',
      '• Team Size: Each team must consist of 4 players.',
      '• Format: Battle Royale (BR) matches based on total participants. The last surviving team from each BR match qualifies for Clash Squad. Clash Squad winner becomes Overall Champion.',
      '• Rules: No hacks, scripts, mods, third-party apps, or exploits allowed. Teaming up with other teams is strictly prohibited. Cheating = immediate disqualification.',
      '🏃 STUMBLE GUYS RULES & FORMAT:',
      '• Format: Individual multi-round obstacle competition. Players compete across qualifying rounds to advance to the Final Round Champion determination.',
      '• Rules: Hacks, mods, scripts, exploits, or third-party applications strictly prohibited. Maintain sportsmanship and respectful behavior.',
      '• Device & Network: Participants must bring their own mobile devices with active data connection.'
    ],
    coordinators: {
      student: [
        { name: 'Nobil S', phone: '+91 97901 95432' },
        { name: 'Siddharth T', phone: '+91 99520 64094' }
      ]
    },
    tags: ['Esports', 'Free Fire', 'Stumble Guys', 'Gaming'],
    participationMode: 'both',
    isOnlineRegistrationClosed: true,
    closedNotice: 'Online registration for eSports is closed. Please come for on-spot registration at the venue!'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-01',
    name: 'Mr. K. Saravana Kumar',
    role: 'Faculty Convenor',
    department: 'HOD, Department of AI & DS',
    photoUrl: 'https://drive.google.com/thumbnail?id=1Wgxt31QRMglHgIPD8VJojU8lBaoAgdO2&sz=w1000',
    bio: 'Head of Department, overseeing academic excellence, symposium organization, and institutional collaboration for AIROX 2026.',
    contact: { email: 'airoxteam.jjcet@gmail.com' },
    isPlaceholder: false
  },
  {
    id: 'team-02',
    name: 'Mrs. G. Deepalakshmi',
    role: 'Faculty Coordinator',
    department: 'Assistant Professor, Dept. of AI & DS',
    photoUrl: 'https://drive.google.com/thumbnail?id=10EjfgaCyRKZcUYevkWEe2_gEQ3R_t4_R&sz=w1000',
    bio: 'Coordinating symposium operations, paper presentations, and academic evaluation.',
    contact: { email: 'airoxteam.jjcet@gmail.com' },
    isPlaceholder: false
  },
  {
    id: 'team-03',
    name: 'Mrs. P. Sumathi',
    role: 'Faculty Coordinator',
    department: 'Assistant Professor, Dept. of AI & DS',
    photoUrl: 'https://drive.google.com/thumbnail?id=1-9CR6qfxUouClOYjfEJW59KFlp-XWE8a&sz=w1000',
    bio: 'Managing event scheduling, technical challenge guidelines, and faculty judges.',
    contact: { email: 'airoxteam.jjcet@gmail.com' },
    isPlaceholder: false
  },
  {
    id: 'team-04',
    name: 'Mrs. M. Shanmugapriya',
    role: 'Faculty Coordinator',
    department: 'Assistant Professor, Dept. of AI & DS',
    photoUrl: 'https://drive.google.com/thumbnail?id=1S97KkMhb90RXEbM2RXd1OZYcRlsf3b2i&sz=w1000',
    bio: 'Overseeing participant queries, non-technical event logistics, and institutional arrangements.',
    contact: { email: 'airoxteam.jjcet@gmail.com' },
    isPlaceholder: false
  },
  {
    id: 'team-05',
    name: 'Mr. S. Lekshman',
    role: 'Student Lead Coordinator',
    department: 'Department of AI & DS (Final Year)',
    photoUrl: 'https://drive.google.com/thumbnail?id=1lXYrXwchFJ7d_mxrzIf4kdlYSCJ0Nni-&sz=w1000',
    bio: 'Managing student volunteer committees, venue logistics, and hospitality for AIROX 2026 delegates.',
    contact: { phone: '+91 91503 13122' },
    isPlaceholder: false
  },
  {
    id: 'team-06',
    name: 'Ms. D. Bhula Nancy',
    role: 'Student Lead Coordinator',
    department: 'Department of AI & DS (Final Year)',
    photoUrl: 'https://drive.google.com/thumbnail?id=1oKb3QNVMKw6zAJihtrl5OJZ9FlnsGYlL&sz=w1000',
    bio: 'Coordinating delegate registrations, campus assistance, and event execution.',
    contact: { phone: '+91 82202 32970' },
    isPlaceholder: false
  },
  {
    id: 'team-07',
    name: 'Mr. Y. Elango',
    role: 'Student Coordinator',
    department: 'Department of AI & DS (Final Year)',
    photoUrl: 'https://drive.google.com/thumbnail?id=1SsX6yZ94FETwYhbyucT1NI9d7Tecyb3k&sz=w1000',
    bio: 'Coordinating student committees, delegate assistance, and event execution for AIROX 2026.',
    contact: { phone: '+91 63694 61227' },
    isPlaceholder: false
  },
  {
    id: 'team-08',
    name: 'Mr. S. Mohanavelan',
    role: 'Digital Experience Lead',
    department: 'Department of AI & DS (Final Year)',
    photoUrl: 'https://drive.google.com/thumbnail?id=17oi1wfDT_6bavCFYamXE2dSSYInpRvpQ&sz=w1000',
    bio: 'Architected and built the AIROX 2026 official web application, custom registration pipeline, and digital experience system.',
    contact: { email: 'mohanavelandev@gmail.com' },
    socials: { linkedin: 'https://www.linkedin.com/in/mohanavelan-s/' },
    isPlaceholder: false
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'When and where will AIROX 2026 take place?',
    answer: 'AIROX 2026 will be held on 22 August 2026 at the Main Auditorium, JJ College of Engineering and Technology (Autonomous), Trichy, Tamil Nadu.'
  },
  {
    id: 'faq-2',
    category: 'registration',
    question: 'What is the registration fee for participants?',
    answer: 'Online registration is ₹200 per participant. On-spot registration on event day is ₹250 per participant. Online registration closes on 21 August 2026.'
  },
  {
    id: 'faq-3',
    category: 'registration',
    question: 'Can I register for multiple technical and non-technical events?',
    answer: 'Yes! A single registration allows entry to technical and non-technical events, provided event time schedules do not conflict.'
  },
  {
    id: 'faq-4',
    category: 'general',
    question: 'Who can participate in AIROX 2026?',
    answer: 'AIROX 2026 is open to undergraduate and postgraduate students from all recognized engineering, technology, and science colleges across India.'
  },
  {
    id: 'faq-5',
    category: 'venue',
    question: 'Is transportation or accommodation provided?',
    answer: 'College bus transportation routes from major Trichy locations will be available on the event morning. Spot guidance will be provided at the reception desk.'
  },
  {
    id: 'faq-6',
    category: 'general',
    question: 'Will participation certificates be issued?',
    answer: 'Yes, official verified certificates will be provided to all registered participants, along with merit trophies and awards for event winners.'
  }
];

/**
 * Optional Placeholders clearly marked for future integration without altering structure
 */
export const OPTIONAL_SECTION_PLACEHOLDERS: OptionalSectionPlaceholder[] = [
  {
    id: 'opt-accreditation',
    title: 'Accreditation & Approvals',
    category: 'accreditation',
    description: 'Autonomous Institutional Accreditations, AICTE Approvals, and Anna University Affiliation records.',
    isAvailable: false
  },
  {
    id: 'opt-achievements',
    title: 'Department Achievements',
    category: 'achievements',
    description: 'National hackathon victories, faculty research publications, patents, and student awards.',
    isAvailable: false
  },
  {
    id: 'opt-labs',
    title: 'Laboratories & Infrastructure',
    category: 'laboratories',
    description: 'High-Performance GPU Computing Lab, Data Analytics Studio, and IoT/AI Hardware setup.',
    isAvailable: false
  },
  {
    id: 'opt-sponsors',
    title: 'Sponsors & Industry Partners',
    category: 'sponsors',
    description: 'Corporate partners, technology sponsors, and industrial collaborators.',
    isAvailable: false
  },
  {
    id: 'opt-gallery',
    title: 'Symposium Gallery (AIROX 2024)',
    category: 'gallery',
    description: 'High-resolution photo and video archives from previous symposium editions.',
    isAvailable: false
  },
  {
    id: 'opt-brochure',
    title: 'Official Brochure Download',
    category: 'brochure',
    description: 'Downloadable high-res AIROX 2026 event poster, schedule brochure, and campus map.',
    isAvailable: false
  },
  {
    id: 'opt-certificates',
    title: 'Certificate Verification Portal',
    category: 'certificates',
    description: 'Online verification system for AIROX 2026 participant certificates.',
    isAvailable: false
  },
  {
    id: 'opt-newsletter',
    title: 'AI & DS Department Newsletter',
    category: 'newsletter',
    description: 'Quarterly department publication featuring student achievements and AI trends.',
    isAvailable: false
  }
];
