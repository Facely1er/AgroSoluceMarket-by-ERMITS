/**
 * Translation files for AgroSoluce
 * Bilingual support: English (EN) and French (FR)
 */

export type Language = 'en' | 'fr';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    cooperatives: string;
    buyers: string;
    cooperativeSpace: string;
    compliance: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    create: string;
    search: string;
    filter: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
  };

  // Footer
  footer: {
    contact: string;
    principles: string;
    copyright: string;
  };

  // Compliance
  compliance: {
    dashboard: string;
    assessments: string;
    newAssessment: string;
    complianceScore: string;
    violations: string;
    certifications: string;
    schoolEnrollment: string;
  };

  // Cooperative
  cooperative: {
    verified: string;
    pending: string;
    region: string;
    department: string;
    sector: string;
    contact: string;
    loading: string;
    notEvaluated: string;
  };

  // Landing Page
  landing: {
    hero: {
      tagline: string;
      title: string;
      subtitle: string;
      description: string;
      ctaCooperatives: string;
      ctaBuyer: string;
      freeNote: string;
    };
    stats: {
      cooperatives: string;
      regions: string;
      verification: string;
      market: string;
    };
    challenges: {
      tagline: string;
      title: string;
      subtitle: string;
      regulatory: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      environmental: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      social: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
    };
    value: {
      tagline: string;
      title: string;
      subtitle: string;
    };
    outcomes: {
      title: string;
      subtitle: string;
      buyerConnections: {
        title: string;
        feature: string;
        outcome1: string;
        outcome2: string;
        outcome3: string;
        cta: string;
      };
      readiness: {
        title: string;
        feature: string;
        outcome1: string;
        outcome2: string;
        outcome3: string;
      };
      coverage: {
        title: string;
        feature: string;
        outcome1: string;
        outcome2: string;
        outcome3: string;
      };
      assessment: {
        title: string;
        feature: string;
        outcome1: string;
        outcome2: string;
        outcome3: string;
        cta: string;
      };
      evidence: {
        title: string;
        feature: string;
        outcome1: string;
        outcome2: string;
        outcome3: string;
      };
      compliance: {
        title: string;
        feature: string;
        outcome1: string;
        outcome2: string;
        outcome3: string;
        cta: string;
      };
      farmersFirst: {
        title: string;
        feature: string;
        outcome1: string;
        outcome2: string;
        outcome3: string;
      };
      traceability: {
        title: string;
        feature: string;
        outcome1: string;
        outcome2: string;
        outcome3: string;
      };
      gaps: {
        title: string;
        feature: string;
        outcome1: string;
        outcome2: string;
        outcome3: string;
      };
    };
    cta: {
      title: string;
      subtitle: string;
      buttonCooperatives: string;
      buttonBuyer: string;
    };
  };

  // About Page
  about: {
    title: string;
    subtitle: string;
    why: {
      title: string;
      subtitle: string;
      problem: {
        title: string;
        question1: string;
        question2: string;
        question3: string;
        reality: string;
      };
      solution: {
        title: string;
        point1: string;
        point2: string;
        point3: string;
        point4: string;
      };
    };
    whatNot: {
      title: string;
      subtitle: string;
      points: string[];
      footer: string;
    };
    designPrinciples: {
      title: string;
      subtitle: string;
      farmerFirst: {
        title: string;
        description: string;
      };
      progress: {
        title: string;
        description: string;
      };
      transparency: {
        title: string;
        description: string;
      };
      process: {
        title: string;
        description: string;
      };
    };
    oneSentence: string;
    cta: {
      explore: string;
      learnMore: string;
    };
  };

  // What We Do Page
  whatWeDo: {
    title: string;
    subtitle: string;
    features: {
      visibility: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      coverage: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      dueDiligence: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
        cta: string;
      };
      farmersFirst: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      progress: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
        cta: string;
      };
    };
    footer: string;
    cta: string;
  };

  // Who It's For Page
  whoItsFor: {
    title: string;
    subtitle: string;
    audiences: {
      cooperatives: {
        title: string;
        benefit1: string;
        benefit2: string;
        benefit3: string;
        benefit4: string;
        cta: string;
      };
      buyers: {
        title: string;
        benefit1: string;
        benefit2: string;
        benefit3: string;
        benefit4: string;
        cta: string;
      };
      partners: {
        title: string;
        benefit1: string;
        benefit2: string;
        benefit3: string;
        benefit4: string;
        cta: string;
      };
    };
    disclaimer: string;
  };

  // Buyer Landing Page
  buyerLanding: {
    hero: {
      tagline: string;
      title: string;
      subtitle: string;
      description: string;
    };
    problem: {
      title: string;
      subtitle: string;
      points: string[];
      solution: string;
    };
    how: {
      title: string;
    };
    features: {
      discover: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      coverage: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      engagement: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      progress: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
    };
    whatGet: {
      title: string;
      youGet: {
        title: string;
        points: string[];
      };
      youDont: {
        title: string;
        points: string[];
      };
      footer: string;
    };
    why: {
      title: string;
      points: string[];
    };
    cta: {
      explore: string;
      pilot: string;
    };
    disclaimer: string;
  };

  // Partner Landing Page
  partnerLanding: {
    hero: {
      tagline: string;
      title: string;
      subtitle: string;
      description: string;
    };
    challenge: {
      title: string;
      subtitle: string;
      points: string[];
      solution: string;
    };
    how: {
      title: string;
    };
    features: {
      baselines: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      monitoring: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
        point4: string;
      };
      progress: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
      views: {
        title: string;
        description: string;
        point1: string;
        point2: string;
        point3: string;
      };
    };
    whatIs: {
      title: string;
      is: {
        title: string;
        points: string[];
      };
      isNot: {
        title: string;
        points: string[];
      };
    };
    why: {
      title: string;
      points: string[];
    };
    cta: {
      pilot: string;
      explore: string;
    };
    disclaimer: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      cooperatives: 'Cooperatives',
      buyers: 'Buyers',
      cooperativeSpace: 'Cooperative Space',
      compliance: '👨‍👩‍👧‍👦 Compliance',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      search: 'Search',
      filter: 'Filter',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset',
    },
    footer: {
      contact: 'Contact',
      principles: 'Principles',
      copyright: 'All rights reserved',
    },
    compliance: {
      dashboard: 'Child Labor Compliance Dashboard',
      assessments: 'Assessments',
      newAssessment: 'New Assessment',
      complianceScore: 'Compliance Score',
      violations: 'Violations',
      certifications: 'Certifications',
      schoolEnrollment: 'School Enrollment',
    },
    cooperative: {
      verified: 'Verified',
      pending: 'Pending',
      region: 'Region',
      department: 'Department',
      sector: 'Sector',
      contact: 'Contact',
      loading: 'Loading...',
      notEvaluated: 'Not Evaluated',
    },
    landing: {
    hero: {
      tagline: 'Farmers-First Due Diligence for Responsible Agricultural Sourcing',
      title: '🌾 AgroSoluce',
      subtitle: 'Making Farmer Engagement, Documentation Coverage, and Improvement Efforts Visible',
      description: 'AgroSoluce helps cooperatives, buyers, and partners make farmer engagement, documentation coverage, and improvement efforts visible — without overstating compliance or replacing audits. We start from the farmer, structure reality at the cooperative level, and support credible EUDR-aligned due diligence across agricultural supply chains.',
      ctaCooperatives: 'Explore Cooperatives',
      ctaBuyer: 'Buyer Portal',
      freeNote: '✨ Free for cooperatives • Transparent • Progress-focused',
    },
      stats: {
        cooperatives: 'Registered Cooperatives',
        regions: 'Regions Covered',
        verification: 'Verification Rate',
        market: 'Potential Market',
      },
      challenges: {
        tagline: 'The Challenges We Address',
        title: 'Facing Critical Pressures',
        subtitle: 'West African agricultural cooperatives navigate an increasingly complex landscape of regulatory requirements, environmental threats, and social responsibilities.',
        regulatory: {
          title: 'Regulatory Pressure',
          description: 'New regulations are transforming global supply chains, demanding unprecedented levels of documentation and due diligence.',
          point1: 'EUDR requires deforestation-free supply chains with complete traceability by 2025',
          point2: 'Child labor due diligence requirements threaten market access for non-compliant cooperatives',
          point3: 'Buyers demand complete compliance documentation or risk exclusion from European markets',
        },
        environmental: {
          title: 'Environmental Challenges',
          description: 'Climate change and deforestation threaten both agricultural productivity and market access.',
          point1: 'Deforestation-linked agriculture risks European market exclusion under EUDR regulations',
          point2: 'Climate change affects crop yields and farmer livelihoods in West Africa',
          point3: 'Protected area overlap and biodiversity loss create compliance and reputation risks',
        },
        social: {
          title: 'Social Challenges',
          description: 'Ensuring ethical supply chains while maintaining farmer livelihoods requires a delicate balance.',
          point1: 'Child labor remains a critical concern, with zero-tolerance policies from major buyers',
          point2: 'Smallholder farmers struggle with poverty, limiting their ability to invest in compliance',
          point3: 'Limited access to technology and training creates barriers to meeting new requirements',
        },
      },
      value: {
        tagline: 'Value We Bring',
        title: 'Transforming Challenges into Opportunities',
        subtitle: 'Our platform delivers measurable value by helping cooperatives navigate compliance, protect the environment, and improve social outcomes while accessing global markets.',
      },
      outcomes: {
        title: 'Measurable Value Delivered',
        subtitle: 'How we help cooperatives overcome challenges and achieve their goals',
        buyerConnections: {
          title: 'Market Access & Buyer Connections',
          feature: 'Overcome market exclusion by connecting with buyers who value compliance and sustainability',
          outcome1: 'Access premium buyers requiring EUDR-aligned and child-labor-free supply chains',
          outcome2: 'Demonstrate your compliance readiness through verified documentation and assessments',
          outcome3: 'Expand your reach beyond traditional buyers to sustainability-focused global partners',
          cta: 'Access matching',
        },
        readiness: {
          title: 'EUDR Compliance Readiness',
          feature: 'Transform from non-compliant to buyer-ready, systematically meeting EUDR requirements',
          outcome1: 'Progress from not_ready to buyer_ready status with clear, actionable milestones',
          outcome2: 'Build an evidence history demonstrating continuous compliance improvement',
          outcome3: 'Identify and prioritize compliance gaps before they block market access',
        },
        coverage: {
          title: 'Deforestation Risk Mitigation',
          feature: 'Protect market access by proving deforestation-free supply chains with complete coverage',
          outcome1: 'Document farmer and plot coverage to demonstrate supply chain transparency',
          outcome2: 'Use GPS geolocation to prove plots are outside deforestation risk zones',
          outcome3: 'Build an evidence portfolio showing protected area compliance and environmental management',
        },
        assessment: {
          title: 'Compliance Gap Identification',
          feature: 'Understand exactly where you stand and what needs improvement to meet regulatory requirements',
          outcome1: 'Get a comprehensive assessment of compliance status across all regulatory frameworks',
          outcome2: 'Receive a prioritized action plan based on risk and market access impact',
          outcome3: 'Track improvement over time with measurable progress indicators',
          cta: 'Start assessment',
        },
        evidence: {
          title: 'Regulatory Documentation',
          feature: 'Build the evidence portfolio that buyers and regulators require for market access',
          outcome1: 'Organize all compliance documents (EUDR, child labor, certifications) in one place',
          outcome2: 'Ensure documentation meets buyer requirements with appropriate metadata and verifications',
          outcome3: 'Reduce market exclusion risk by maintaining complete, accessible compliance records',
        },
        compliance: {
          title: 'Child Labor Elimination',
          feature: 'Demonstrate zero tolerance for child labor while supporting farmer livelihoods',
          outcome1: 'Conduct systematic assessments to identify and address child labor risks',
          outcome2: 'Track remediation actions that protect children while maintaining farmer income',
          outcome3: 'Build buyer trust through transparent tracking and certification management',
          cta: 'View dashboard',
        },
        farmersFirst: {
          title: 'Farmer Livelihood Protection',
          feature: 'Ensure compliance improvements support rather than harm smallholder communities',
          outcome1: 'Register farmers systematically to provide training and support',
          outcome2: 'Track farmer engagement to ensure compliance measures don\'t exclude vulnerable communities',
          outcome3: 'Measure social impact to demonstrate that compliance and farmer welfare go hand in hand',
        },
        traceability: {
          title: 'Supply Chain Transparency',
          feature: 'Meet EUDR traceability requirements by tracking products from plot to market',
          outcome1: 'Document the complete supply chain from individual plots to final sale',
          outcome2: 'Provide buyers with origin mapping proving deforestation-free sourcing',
          outcome3: 'Create an audit trail that satisfies regulatory due diligence requirements',
        },
        gaps: {
          title: 'Targeted Improvement Guidance',
          feature: 'Get specific, actionable guidance to effectively close compliance gaps',
          outcome1: 'Automatically identify missing documentation before it blocks market access',
          outcome2: 'Receive step-by-step guidance tailored to your specific compliance gaps',
          outcome3: 'Access resources and tools that help you meet requirements without overwhelming your team',
        },
      },
      cta: {
        title: 'Join the Mission',
        subtitle: 'Together, we can build sustainable, compliant supply chains that protect farmers, forests, and future generations',
        buttonCooperatives: 'Explore Cooperatives',
        buttonBuyer: 'Buyer Portal',
      },
    },
    about: {
      title: 'About AgroSoluce',
      subtitle: 'Farmers-First Due Diligence for Responsible Agricultural Sourcing',
      why: {
        title: 'Why AgroSoluce Exists',
        subtitle: 'Responsible sourcing is no longer optional — but most tools still ask impossible questions that don\'t reflect reality in real supply chains.',
        problem: {
          title: 'The Problem with Traditional Tools',
          question1: 'Are you fully compliant?',
          question2: 'Do you certify this cooperative?',
          question3: 'Can you guarantee zero risk?',
          reality: 'In real supply chains, those answers don\'t exist.',
        },
        solution: {
          title: 'AgroSoluce Reflects Reality',
          point1: 'Uneven documentation',
          point2: 'Gradual improvements',
          point3: 'Real people on the ground',
          point4: 'Continuous due diligence — not one-time declarations',
        },
      },
      whatNot: {
        title: 'What AgroSoluce Is Not',
        subtitle: 'To be clear, AgroSoluce:',
        points: [
          'is not a certification body',
          'does not declare EUDR or labor compliance',
          'does not replace audits, field visits, or satellite analysis',
          'does not guarantee outcomes',
        ],
        footer: 'It supports decisions — it does not replace responsibility.',
      },
      designPrinciples: {
        title: 'Our Design Principles',
        subtitle: 'The values that guide how we build AgroSoluce',
        farmerFirst: {
          title: 'Farmer-first, not document-first',
          description: 'We start from the farmer and structure reality at the cooperative level, ensuring farmer engagement is visible without exposing sensitive personal data.',
        },
        progress: {
          title: 'Progress over perfection',
          description: 'We track gradual improvements and readiness over time, recognizing that compliance is a journey, not a destination.',
        },
        transparency: {
          title: 'Transparency without over-claiming',
          description: 'We show what exists, what is missing, and where further verification may be required — without false compliance claims.',
        },
        process: {
          title: 'Due diligence as a process, not a badge',
          description: 'We support continuous due diligence efforts, enabling ongoing oversight rather than one-off compliance checks.',
        },
      },
      oneSentence: 'AgroSoluce makes farmer engagement, documentation coverage, and improvement efforts visible — responsibly, progressively, and without false compliance claims.',
      cta: {
        explore: 'Explore Cooperatives',
        learnMore: 'Learn What We Do',
      },
    },
    whatWeDo: {
      title: 'What AgroSoluce Does',
      subtitle: 'Supporting Responsible Sourcing Through Transparency',
      features: {
        visibility: {
          title: '1. Make Cooperatives Visible',
          description: 'AgroSoluce provides a structured directory of agricultural cooperatives, showing who they are, where they operate, what crops they produce, and what information is available today.',
          point1: 'No inflated claims. No black boxes.',
          point2: 'Stable, shareable cooperative profiles',
          point3: 'Clear visibility into identity and sourcing context',
        },
        coverage: {
          title: '2. Show Documentation Coverage — Not Compliance',
          description: 'Instead of binary labels, AgroSoluce displays documentation coverage indicators: Limited, Partial, Substantial.',
          point1: 'Help buyers understand what exists, what is missing, and where further verification may be required',
          point2: 'Avoid false compliance claims while showing real progress',
          point3: 'Support informed due diligence decisions based on actual documentation',
        },
        dueDiligence: {
          title: '3. Support EUDR & Child-Labor Due Diligence',
          description: 'AgroSoluce supports due diligence by structuring cooperative identity and sourcing context, highlighting documentation gaps, surfacing farmer engagement signals, and tracking improvement efforts over time.',
          point1: 'Provide operational foundation required to perform due diligence responsibly',
          point2: 'AgroSoluce does not certify compliance — it supports the process',
          point3: 'Enable continuous due diligence, not one-time declarations',
          cta: 'View Compliance Dashboard',
        },
        farmersFirst: {
          title: '4. Put Farmers First',
          description: 'AgroSoluce connects farmer-level actions to cooperative-level insight through a Farmers First toolkit, supporting farmer onboarding, training participation tracking, declarations and attestations, and baseline and progress indicators.',
          point1: 'Make farmer engagement visible — without exposing sensitive personal data',
          point2: 'Track farmer-level activities at cooperative scale',
          point3: 'Support behavior-based risk assessment, not just paperwork',
        },
        progress: {
          title: '5. Track Progress, Not Just Promises',
          description: 'AgroSoluce records readiness snapshots and self-assessments over time, enabling transparent progress tracking, honest gap identification, and meaningful follow-up actions.',
          point1: 'All assessments are explicitly self-reported and non-certifying',
          point2: 'Enable buyers to demonstrate ongoing oversight, not one-off checks',
          point3: 'Support evidence-aware reporting, not inflated claims',
          cta: 'Start Assessment',
        },
      },
      footer: 'AgroSoluce provides the operational foundation required to perform due diligence responsibly — without false compliance claims.',
      cta: 'Explore the Cooperative Directory',
    },
    whoItsFor: {
      title: 'Who AgroSoluce Is For',
      subtitle: 'Designed for cooperatives, buyers, and partners working toward responsible sourcing',
      audiences: {
        cooperatives: {
          title: 'For Cooperatives',
          benefit1: 'Organize documentation clearly',
          benefit2: 'Demonstrate effort, not perfection',
          benefit3: 'Prioritize next steps without guesswork',
          benefit4: 'Build trust with buyers and partners',
          cta: 'Access Your Workspace',
        },
        buyers: {
          title: 'For Buyers & Sourcing Teams',
          benefit1: 'Discover cooperatives transparently',
          benefit2: 'Understand what information exists today',
          benefit3: 'Identify where enhanced due diligence is needed',
          benefit4: 'Support engagement instead of exclusion',
          cta: 'Explore Buyer Portal',
        },
        partners: {
          title: 'For NGOs & Partners',
          benefit1: 'Monitor improvement efforts across programs or pilots',
          benefit2: 'Track farmer engagement at cooperative scale',
          benefit3: 'Work from a shared, evidence-aware baseline',
          benefit4: 'Support learning, monitoring, and improvement — not marketing narratives',
          cta: 'Contact Us',
        },
      },
      disclaimer: 'AgroSoluce supports due diligence and transparency efforts. Information shown may include self-reported data and does not constitute certification, regulatory approval, or verified compliance.',
    },
    buyerLanding: {
      hero: {
        tagline: 'For Buyers & Sourcing Teams',
        title: 'AgroSoluce for Buyers',
        subtitle: 'Responsible Sourcing Starts With Visibility — Not Assumptions',
        description: 'AgroSoluce helps buyers understand what exists, what is missing, and where to focus due diligence — without forcing cooperatives into false compliance claims. We provide a structured, farmer-first view of cooperatives so sourcing decisions are based on transparency and progress, not guesswork.',
      },
      problem: {
        title: 'The Buyer Problem',
        subtitle: 'Sourcing teams are under pressure to:',
        points: [
          'support EUDR and labor-risk due diligence',
          'demonstrate responsible sourcing',
          'and make decisions with incomplete information',
        ],
        solution: 'What\'s missing is not another certification — it\'s clear visibility into reality.',
      },
      how: {
        title: 'How AgroSoluce Supports Buyer Due Diligence',
      },
      features: {
        discover: {
          title: '1. Discover Cooperatives Transparently',
          description: 'Explore a structured directory of agricultural cooperatives with identity and sourcing context, crop and regional information, and stable, shareable profiles.',
          point1: 'No hidden scoring. No black boxes.',
          point2: 'Clear visibility into cooperative identity and sourcing context',
          point3: 'Stable, shareable profiles for due diligence workflows',
        },
        coverage: {
          title: '2. See Documentation Coverage (Not Binary Compliance)',
          description: 'AgroSoluce displays documentation coverage as Limited, Partial, or Substantial. This helps buyers quickly assess readiness to engage, need for enhanced due diligence, and where further verification is required.',
          point1: 'Understand what information exists today',
          point2: 'Identify where enhanced due diligence is needed',
          point3: 'Make informed decisions based on actual documentation status',
        },
        engagement: {
          title: '3. Understand Farmer Engagement',
          description: 'Beyond documents, AgroSoluce shows whether farmers are onboarded, training participation at cooperative level, and declarations and engagement activity over time.',
          point1: 'Support behavior-based risk assessment, not just paperwork',
          point2: 'See farmer-level engagement signals at cooperative scale',
          point3: 'Track engagement activity over time',
        },
        progress: {
          title: '4. Track Progress Over Time',
          description: 'AgroSoluce records readiness snapshots, cooperative self-assessments, and visible improvements and remaining gaps.',
          point1: 'Enable buyers to demonstrate ongoing oversight, not one-off checks',
          point2: 'Observe improvement trajectories and remaining gaps',
          point3: 'Support evidence-aware reporting and due diligence documentation',
        },
      },
      whatGet: {
        title: 'What Buyers Get (and What They Don\'t)',
        youGet: {
          title: '✅ You get:',
          points: [
            'structured, comparable cooperative profiles',
            'transparency on information coverage',
            'visibility into farmer-level engagement',
          ],
        },
        youDont: {
          title: '🚫 You don\'t get:',
          points: [
            'compliance guarantees',
            'automated risk determinations',
            'certification badges',
          ],
        },
        footer: 'AgroSoluce supports your due diligence — it does not replace it.',
      },
      why: {
        title: 'Why Buyers Use AgroSoluce',
        points: [
          'Reduce sourcing blind spots',
          'Prioritize engagement instead of exclusion',
          'Prepare audits and field verification more efficiently',
          'Support responsible sourcing without over-claiming',
        ],
      },
      cta: {
        explore: 'Explore the Directory',
        pilot: 'Join a Buyer Pilot',
      },
      disclaimer: 'AgroSoluce supports due diligence processes. All information may include self-reported data and does not constitute certification or regulatory approval.',
    },
    partnerLanding: {
      hero: {
        tagline: 'For NGOs & Program Partners',
        title: 'AgroSoluce for NGOs & Program Partners',
        subtitle: 'Make Farmer-Level Progress Visible — Without Distorting Reality',
        description: 'AgroSoluce helps NGOs and partners monitor, structure, and support improvement efforts across cooperatives — starting from farmers and aggregating to programs and pilots. We focus on what is happening, not what is claimed.',
      },
      challenge: {
        title: 'The NGO & Program Challenge',
        subtitle: 'Programs often struggle to:',
        points: [
          'track progress consistently across cooperatives',
          'compare efforts fairly without oversimplification',
          'report transparently without inflating outcomes',
        ],
        solution: 'AgroSoluce was built to support learning, monitoring, and improvement — not marketing narratives.',
      },
      how: {
        title: 'How AgroSoluce Supports Programs',
      },
      features: {
        baselines: {
          title: '1. Structured Cooperative Baselines',
          description: 'AgroSoluce establishes a common baseline across cooperatives: identity and sourcing context, documentation coverage, and farmer engagement visibility.',
          point1: 'Create a shared language between partners',
          point2: 'Enable fair comparison across cooperatives',
          point3: 'Establish evidence-aware starting points',
        },
        monitoring: {
          title: '2. Farmer-First Monitoring',
          description: 'AgroSoluce tracks farmer onboarding activities, training events, declarations and participation, and baseline vs progress indicators.',
          point1: 'Farmer engagement becomes observable, not anecdotal',
          point2: 'Track farmer-level activities at cooperative scale',
          point3: 'Monitor training participation and engagement over time',
          point4: 'Support evidence-based program evaluation',
        },
        progress: {
          title: '3. Progress Tracking Without Pressure',
          description: 'Programs can record readiness snapshots over time, observe improvement trajectories, and identify where additional support is needed.',
          point1: 'No forced scores. No all-or-nothing labels.',
          point2: 'Track gradual improvements honestly',
          point3: 'Identify where additional support is needed',
        },
        views: {
          title: '4. Pilot & Portfolio Views',
          description: 'AgroSoluce enables grouping cooperatives into pilots or programs, viewing aggregate indicators, and drilling down to cooperative-level reality when needed.',
          point1: 'Support evidence-aware reporting, not inflated claims',
          point2: 'View aggregate progress across programs',
          point3: 'Drill down to cooperative-level detail when needed',
        },
      },
      whatIs: {
        title: 'What AgroSoluce Is (and Is Not)',
        is: {
          title: '✅ AgroSoluce is:',
          points: [
            'a transparency and monitoring platform',
            'a due-diligence support tool',
            'a farmer-first program visibility layer',
          ],
        },
        isNot: {
          title: '🚫 AgroSoluce is not:',
          points: [
            'a certification scheme',
            'an audit engine',
            'an outcome guarantor',
          ],
        },
      },
      why: {
        title: 'Why NGOs & Partners Use AgroSoluce',
        points: [
          'Strengthen program credibility',
          'Align cooperatives around realistic improvement paths',
          'Share structured insights with buyers and funders',
          'Reduce reporting friction without losing nuance',
        ],
      },
      cta: {
        pilot: 'Start a Program Pilot',
        explore: 'Explore Cooperatives',
      },
      disclaimer: 'AgroSoluce supports monitoring and due diligence efforts. It does not certify outcomes or replace independent verification.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      cooperatives: 'Coopératives',
      buyers: 'Acheteurs',
      cooperativeSpace: 'Espace Coopérative',
      compliance: '👨‍👩‍👧‍👦 Conformité',
    },
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      search: 'Rechercher',
      filter: 'Filtrer',
      close: 'Fermer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      submit: 'Soumettre',
      reset: 'Réinitialiser',
    },
    footer: {
      contact: 'Contact',
      principles: 'Principes',
      copyright: 'Tous droits réservés',
    },
    compliance: {
      dashboard: 'Tableau de Bord de Conformité',
      assessments: 'Évaluations',
      newAssessment: 'Nouvelle Évaluation',
      complianceScore: 'Score de Conformité',
      violations: 'Violations',
      certifications: 'Certifications',
      schoolEnrollment: 'Scolarisation',
    },
    cooperative: {
      verified: 'Vérifié',
      pending: 'En attente',
      region: 'Région',
      department: 'Département',
      sector: 'Secteur',
      contact: 'Contact',
      loading: 'Chargement...',
      notEvaluated: 'Non évalué',
    },
    landing: {
      hero: {
        tagline: 'Autonomiser l\'Agriculture Durable en Afrique de l\'Ouest',
        title: '🌾 AgroSoluce® Marketplace',
        subtitle: 'Naviguer la Conformité Réglementaire, la Protection Environnementale et la Responsabilité Sociale',
        description: 'Une plateforme axée sur la mission qui aide les coopératives ouest-africaines à répondre aux exigences de l\'EUDR, à lutter contre la déforestation, à éliminer le travail des enfants et à accéder aux marchés mondiaux tout en protégeant les moyens de subsistance des agriculteurs et en préservant notre planète.',
        ctaCooperatives: 'Explorer les Coopératives',
        ctaBuyer: 'Espace Acheteur',
        freeNote: '✨ Gratuit pour les coopératives • Sécurisé • Conforme aux réglementations',
      },
      stats: {
        cooperatives: 'Coopératives Enregistrées',
        regions: 'Régions Couvertes',
        verification: 'Taux de Vérification',
        market: 'Marché Potentiel',
      },
      challenges: {
        tagline: 'Les Défis que Nous Relevons',
        title: 'Face aux Pressions Critiques',
        subtitle: 'Les coopératives agricoles ouest-africaines naviguent dans un paysage de plus en plus complexe d\'exigences réglementaires, de menaces environnementales et de responsabilités sociales.',
        regulatory: {
          title: 'Pression Réglementaire',
          description: 'De nouvelles réglementations transforment les chaînes d\'approvisionnement mondiales, exigeant des niveaux sans précédent de documentation et de diligence raisonnable.',
          point1: 'L\'EUDR exige des chaînes d\'approvisionnement sans déforestation avec traçabilité complète d\'ici 2025',
          point2: 'Les exigences de diligence raisonnable sur le travail des enfants menacent l\'accès au marché pour les coopératives non conformes',
          point3: 'Les acheteurs exigent une documentation de conformité complète ou risquent l\'exclusion des marchés européens',
        },
        environmental: {
          title: 'Défis Environnementaux',
          description: 'Le changement climatique et la déforestation menacent à la fois la productivité agricole et l\'accès au marché.',
          point1: 'La déforestation liée à l\'agriculture risque l\'exclusion du marché européen sous les réglementations EUDR',
          point2: 'Le changement climatique affecte les rendements des cultures et les moyens de subsistance des agriculteurs en Afrique de l\'Ouest',
          point3: 'Le chevauchement des zones protégées et la perte de biodiversité créent des risques de conformité et de réputation',
        },
        social: {
          title: 'Défis Sociaux',
          description: 'Assurer des chaînes d\'approvisionnement éthiques tout en maintenant les moyens de subsistance des agriculteurs nécessite un équilibre délicat.',
          point1: 'Le travail des enfants reste une préoccupation critique, avec des politiques de tolérance zéro des principaux acheteurs',
          point2: 'Les petits exploitants agricoles luttent contre la pauvreté, limitant leur capacité à investir dans la conformité',
          point3: 'L\'accès limité à la technologie et à la formation crée des obstacles pour répondre aux nouvelles exigences',
        },
      },
      value: {
        tagline: 'Valeur que Nous Apportons',
        title: 'Transformer les Défis en Opportunités',
        subtitle: 'Notre plateforme apporte une valeur mesurable en aidant les coopératives à naviguer la conformité, protéger l\'environnement et améliorer les résultats sociaux tout en accédant aux marchés mondiaux.',
      },
      outcomes: {
        title: 'Valeur Mesurable Apportée',
        subtitle: 'Comment nous aidons les coopératives à surmonter les défis et atteindre leurs objectifs',
        buyerConnections: {
          title: 'Accès au Marché & Connexions Acheteurs',
          feature: 'Surmontez l\'exclusion du marché en vous connectant avec des acheteurs qui valorisent la conformité et la durabilité',
          outcome1: 'Accédez à des acheteurs premium exigeant des chaînes d\'approvisionnement alignées EUDR et sans travail des enfants',
          outcome2: 'Démontrez votre préparation à la conformité grâce à une documentation vérifiée et des évaluations',
          outcome3: 'Élargissez votre portée au-delà des acheteurs traditionnels vers des partenaires mondiaux axés sur la durabilité',
          cta: 'Accéder au matching',
        },
        readiness: {
          title: 'Préparation à la Conformité EUDR',
          feature: 'Transformez-vous de non conforme à prêt pour les acheteurs, répondant systématiquement aux exigences EUDR',
          outcome1: 'Progressez du statut not_ready à buyer_ready avec des jalons clairs et actionnables',
          outcome2: 'Construisez un historique de preuves démontrant une amélioration continue de la conformité',
          outcome3: 'Identifiez et priorisez les gaps de conformité avant qu\'ils ne bloquent l\'accès au marché',
        },
        coverage: {
          title: 'Atténuation des Risques de Déforestation',
          feature: 'Protégez l\'accès au marché en prouvant des chaînes d\'approvisionnement sans déforestation avec une couverture complète',
          outcome1: 'Documentez la couverture des agriculteurs et parcelles pour démontrer la transparence de la chaîne',
          outcome2: 'Utilisez la géolocalisation GPS pour prouver que les parcelles sont en dehors des zones à risque de déforestation',
          outcome3: 'Construisez un portefeuille de preuves montrant la conformité aux zones protégées et la gestion environnementale',
        },
        assessment: {
          title: 'Identification des Gaps de Conformité',
          feature: 'Comprenez exactement où vous en êtes et ce qui doit être amélioré pour répondre aux exigences réglementaires',
          outcome1: 'Obtenez une évaluation complète du statut de conformité dans tous les cadres réglementaires',
          outcome2: 'Recevez un plan d\'action priorisé basé sur le risque et l\'impact sur l\'accès au marché',
          outcome3: 'Suivez l\'amélioration dans le temps avec des indicateurs de progrès mesurables',
          cta: 'Commencer l\'évaluation',
        },
        evidence: {
          title: 'Documentation Réglementaire',
          feature: 'Construisez le portefeuille de preuves que les acheteurs et régulateurs exigent pour l\'accès au marché',
          outcome1: 'Organisez tous les documents de conformité (EUDR, travail des enfants, certifications) en un seul endroit',
          outcome2: 'Assurez-vous que la documentation répond aux exigences des acheteurs avec des métadonnées et vérifications appropriées',
          outcome3: 'Réduisez le risque d\'exclusion du marché en maintenant des dossiers de conformité complets et accessibles',
        },
        compliance: {
          title: 'Élimination du Travail des Enfants',
          feature: 'Démontrez une tolérance zéro pour le travail des enfants tout en soutenant les moyens de subsistance des agriculteurs',
          outcome1: 'Menez des évaluations systématiques pour identifier et traiter les risques de travail des enfants',
          outcome2: 'Suivez les actions de remédiation qui protègent les enfants tout en maintenant le revenu des agriculteurs',
          outcome3: 'Renforcez la confiance des acheteurs grâce à un suivi transparent et une gestion des certifications',
          cta: 'Voir le tableau de bord',
        },
        farmersFirst: {
          title: 'Protection des Moyens de Subsistance des Agriculteurs',
          feature: 'Assurez-vous que les améliorations de conformité soutiennent plutôt que nuisent aux communautés de petits exploitants',
          outcome1: 'Enregistrez les agriculteurs systématiquement pour leur fournir formation et soutien',
          outcome2: 'Suivez l\'engagement des agriculteurs pour garantir que les mesures de conformité n\'excluent pas les communautés vulnérables',
          outcome3: 'Mesurez l\'impact social pour démontrer que conformité et bien-être des agriculteurs vont de pair',
        },
        traceability: {
          title: 'Transparence de la Chaîne d\'Approvisionnement',
          feature: 'Répondez aux exigences de traçabilité EUDR en suivant les produits de la parcelle au marché',
          outcome1: 'Documentez la chaîne d\'approvisionnement complète des parcelles individuelles à la vente finale',
          outcome2: 'Fournissez aux acheteurs une cartographie d\'origine prouvant un approvisionnement sans déforestation',
          outcome3: 'Créez une piste d\'audit qui satisfait les exigences de diligence raisonnable réglementaire',
        },
        gaps: {
          title: 'Guidance d\'Amélioration Ciblée',
          feature: 'Obtenez des conseils spécifiques et actionnables pour combler efficacement les gaps de conformité',
          outcome1: 'Identifiez automatiquement la documentation manquante avant qu\'elle ne bloque l\'accès au marché',
          outcome2: 'Recevez des conseils étape par étape adaptés à vos gaps de conformité spécifiques',
          outcome3: 'Accédez à des ressources et outils qui vous aident à répondre aux exigences sans submerger votre équipe',
        },
      },
      cta: {
        title: 'Rejoignez la Mission',
        subtitle: 'Ensemble, nous pouvons construire des chaînes d\'approvisionnement durables et conformes qui protègent les agriculteurs, les forêts et les générations futures',
        buttonCooperatives: 'Explorer les Coopératives',
        buttonBuyer: 'Espace Acheteur',
      },
    },
    about: {
      title: 'À Propos d\'AgroSoluce',
      subtitle: 'Diligence Raisonnable Axée sur les Agriculteurs pour un Approvisionnement Agricole Responsable',
      why: {
        title: 'Pourquoi AgroSoluce Existe',
        subtitle: 'L\'approvisionnement responsable n\'est plus optionnel — mais la plupart des outils posent encore des questions impossibles qui ne reflètent pas la réalité des chaînes d\'approvisionnement réelles.',
        problem: {
          title: 'Le Problème avec les Outils Traditionnels',
          question1: 'Êtes-vous entièrement conforme?',
          question2: 'Certifiez-vous cette coopérative?',
          question3: 'Pouvez-vous garantir zéro risque?',
          reality: 'Dans les chaînes d\'approvisionnement réelles, ces réponses n\'existent pas.',
        },
        solution: {
          title: 'AgroSoluce Reflète la Réalité',
          point1: 'Documentation inégale',
          point2: 'Améliorations graduelles',
          point3: 'Vraies personnes sur le terrain',
          point4: 'Diligence raisonnable continue — pas de déclarations ponctuelles',
        },
      },
      whatNot: {
        title: 'Ce qu\'AgroSoluce N\'est Pas',
        subtitle: 'Pour être clair, AgroSoluce:',
        points: [
          'n\'est pas un organisme de certification',
          'ne déclare pas la conformité EUDR ou du travail',
          'ne remplace pas les audits, visites sur le terrain ou analyses satellitaires',
          'ne garantit pas les résultats',
        ],
        footer: 'Il soutient les décisions — il ne remplace pas la responsabilité.',
      },
      designPrinciples: {
        title: 'Nos Principes de Conception',
        subtitle: 'Les valeurs qui guident la construction d\'AgroSoluce',
        farmerFirst: {
          title: 'Agriculteurs d\'abord, pas documents d\'abord',
          description: 'Nous commençons par l\'agriculteur et structurons la réalité au niveau de la coopérative, garantissant que l\'engagement des agriculteurs est visible sans exposer de données personnelles sensibles.',
        },
        progress: {
          title: 'Progrès plutôt que perfection',
          description: 'Nous suivons les améliorations graduelles et la préparation dans le temps, reconnaissant que la conformité est un voyage, pas une destination.',
        },
        transparency: {
          title: 'Transparence sans exagération',
          description: 'Nous montrons ce qui existe, ce qui manque et où une vérification supplémentaire peut être requise — sans fausses déclarations de conformité.',
        },
        process: {
          title: 'Diligence raisonnable comme processus, pas comme badge',
          description: 'Nous soutenons les efforts continus de diligence raisonnable, permettant une surveillance continue plutôt que des contrôles de conformité ponctuels.',
        },
      },
      oneSentence: 'AgroSoluce rend visible l\'engagement des agriculteurs, la couverture de la documentation et les efforts d\'amélioration — de manière responsable, progressive et sans fausses déclarations de conformité.',
      cta: {
        explore: 'Explorer les Coopératives',
        learnMore: 'Découvrir Ce Que Nous Faisons',
      },
    },
    whatWeDo: {
      title: 'Ce Qu\'AgroSoluce Fait',
      subtitle: 'Soutenir l\'Approvisionnement Responsable par la Transparence',
      features: {
        visibility: {
          title: '1. Rendre les Coopératives Visibles',
          description: 'AgroSoluce fournit un répertoire structuré de coopératives agricoles, montrant qui elles sont, où elles opèrent, quelles cultures elles produisent et quelles informations sont disponibles aujourd\'hui.',
          point1: 'Pas de déclarations exagérées. Pas de boîtes noires.',
          point2: 'Profils de coopératives stables et partageables',
          point3: 'Visibilité claire de l\'identité et du contexte d\'approvisionnement',
        },
        coverage: {
          title: '2. Montrer la Couverture de Documentation — Pas la Conformité',
          description: 'Au lieu d\'étiquettes binaires, AgroSoluce affiche des indicateurs de couverture de documentation: Limité, Partiel, Substantiel.',
          point1: 'Aider les acheteurs à comprendre ce qui existe, ce qui manque et où une vérification supplémentaire peut être requise',
          point2: 'Éviter les fausses déclarations de conformité tout en montrant de vrais progrès',
          point3: 'Soutenir des décisions de diligence raisonnable éclairées basées sur la documentation réelle',
        },
        dueDiligence: {
          title: '3. Soutenir la Diligence Raisonnable EUDR & Travail des Enfants',
          description: 'AgroSoluce soutient la diligence raisonnable en structurant l\'identité de la coopérative et le contexte d\'approvisionnement, en mettant en évidence les lacunes de documentation, en révélant les signaux d\'engagement des agriculteurs et en suivant les efforts d\'amélioration dans le temps.',
          point1: 'Fournir la base opérationnelle requise pour effectuer la diligence raisonnable de manière responsable',
          point2: 'AgroSoluce ne certifie pas la conformité — il soutient le processus',
          point3: 'Permettre une diligence raisonnable continue, pas des déclarations ponctuelles',
          cta: 'Voir le Tableau de Bord',
        },
        farmersFirst: {
          title: '4. Mettre les Agriculteurs en Premier',
          description: 'AgroSoluce connecte les actions au niveau des agriculteurs aux informations au niveau de la coopérative grâce à un toolkit Farmers First, soutenant l\'intégration des agriculteurs, le suivi de la participation à la formation, les déclarations et attestations, et les indicateurs de base et de progrès.',
          point1: 'Rendre l\'engagement des agriculteurs visible — sans exposer de données personnelles sensibles',
          point2: 'Suivre les activités au niveau des agriculteurs à l\'échelle de la coopérative',
          point3: 'Soutenir l\'évaluation des risques basée sur le comportement, pas seulement sur les documents',
        },
        progress: {
          title: '5. Suivre le Progrès, Pas Seulement les Promesses',
          description: 'AgroSoluce enregistre des instantanés de préparation et des auto-évaluations dans le temps, permettant un suivi transparent des progrès, une identification honnête des lacunes et des actions de suivi significatives.',
          point1: 'Toutes les évaluations sont explicitement auto-déclarées et non certifiantes',
          point2: 'Permettre aux acheteurs de démontrer une surveillance continue, pas des contrôles ponctuels',
          point3: 'Soutenir un reporting basé sur des preuves, pas des déclarations exagérées',
          cta: 'Commencer l\'Évaluation',
        },
      },
      footer: 'AgroSoluce fournit la base opérationnelle requise pour effectuer la diligence raisonnable de manière responsable — sans fausses déclarations de conformité.',
      cta: 'Explorer le Répertoire des Coopératives',
    },
    whoItsFor: {
      title: 'Pour Qui est AgroSoluce',
      subtitle: 'Conçu pour les coopératives, acheteurs et partenaires travaillant vers un approvisionnement responsable',
      audiences: {
        cooperatives: {
          title: 'Pour les Coopératives',
          benefit1: 'Organiser la documentation clairement',
          benefit2: 'Démontrer l\'effort, pas la perfection',
          benefit3: 'Prioriser les prochaines étapes sans deviner',
          benefit4: 'Construire la confiance avec les acheteurs et partenaires',
          cta: 'Accéder à Votre Espace de Travail',
        },
        buyers: {
          title: 'Pour les Acheteurs & Équipes d\'Approvisionnement',
          benefit1: 'Découvrir les coopératives de manière transparente',
          benefit2: 'Comprendre quelles informations existent aujourd\'hui',
          benefit3: 'Identifier où une diligence raisonnable renforcée est nécessaire',
          benefit4: 'Soutenir l\'engagement plutôt que l\'exclusion',
          cta: 'Explorer le Portail Acheteur',
        },
        partners: {
          title: 'Pour les ONG & Partenaires',
          benefit1: 'Surveiller les efforts d\'amélioration dans les programmes ou pilotes',
          benefit2: 'Suivre l\'engagement des agriculteurs à l\'échelle de la coopérative',
          benefit3: 'Travailler à partir d\'une base commune basée sur des preuves',
          benefit4: 'Soutenir l\'apprentissage, la surveillance et l\'amélioration — pas les récits marketing',
          cta: 'Nous Contacter',
        },
      },
      disclaimer: 'AgroSoluce soutient les efforts de diligence raisonnable et de transparence. Les informations affichées peuvent inclure des données auto-déclarées et ne constituent pas une certification, une approbation réglementaire ou une conformité vérifiée.',
    },
    buyerLanding: {
      hero: {
        tagline: 'Pour les Acheteurs & Équipes d\'Approvisionnement',
        title: 'AgroSoluce pour les Acheteurs',
        subtitle: 'L\'Approvisionnement Responsable Commence par la Visibilité — Pas les Hypothèses',
        description: 'AgroSoluce aide les acheteurs à comprendre ce qui existe, ce qui manque et où se concentrer sur la diligence raisonnable — sans forcer les coopératives à faire de fausses déclarations de conformité. Nous fournissons une vue structurée, axée sur les agriculteurs, des coopératives afin que les décisions d\'approvisionnement soient basées sur la transparence et le progrès, pas sur des suppositions.',
      },
      problem: {
        title: 'Le Problème des Acheteurs',
        subtitle: 'Les équipes d\'approvisionnement sont sous pression pour:',
        points: [
          'soutenir la diligence raisonnable EUDR et les risques de travail',
          'démontrer un approvisionnement responsable',
          'et prendre des décisions avec des informations incomplètes',
        ],
        solution: 'Ce qui manque n\'est pas une autre certification — c\'est une visibilité claire sur la réalité.',
      },
      how: {
        title: 'Comment AgroSoluce Soutient la Diligence Raisonnable des Acheteurs',
      },
      features: {
        discover: {
          title: '1. Découvrir les Coopératives de Manière Transparente',
          description: 'Explorez un répertoire structuré de coopératives agricoles avec identité et contexte d\'approvisionnement, informations sur les cultures et régions, et profils stables et partageables.',
          point1: 'Pas de scoring caché. Pas de boîtes noires.',
          point2: 'Visibilité claire de l\'identité de la coopérative et du contexte d\'approvisionnement',
          point3: 'Profils stables et partageables pour les workflows de diligence raisonnable',
        },
        coverage: {
          title: '2. Voir la Couverture de Documentation (Pas la Conformité Binaire)',
          description: 'AgroSoluce affiche la couverture de documentation comme Limité, Partiel ou Substantiel. Cela aide les acheteurs à évaluer rapidement la préparation à l\'engagement, le besoin de diligence raisonnable renforcée et où une vérification supplémentaire est requise.',
          point1: 'Comprendre quelles informations existent aujourd\'hui',
          point2: 'Identifier où une diligence raisonnable renforcée est nécessaire',
          point3: 'Prendre des décisions éclairées basées sur le statut réel de la documentation',
        },
        engagement: {
          title: '3. Comprendre l\'Engagement des Agriculteurs',
          description: 'Au-delà des documents, AgroSoluce montre si les agriculteurs sont intégrés, la participation à la formation au niveau de la coopérative, et les déclarations et activités d\'engagement dans le temps.',
          point1: 'Soutenir l\'évaluation des risques basée sur le comportement, pas seulement sur les documents',
          point2: 'Voir les signaux d\'engagement au niveau des agriculteurs à l\'échelle de la coopérative',
          point3: 'Suivre l\'activité d\'engagement dans le temps',
        },
        progress: {
          title: '4. Suivre le Progrès dans le Temps',
          description: 'AgroSoluce enregistre des instantanés de préparation, des auto-évaluations de coopératives, et des améliorations visibles et lacunes restantes.',
          point1: 'Permettre aux acheteurs de démontrer une surveillance continue, pas des contrôles ponctuels',
          point2: 'Observer les trajectoires d\'amélioration et les lacunes restantes',
          point3: 'Soutenir le reporting basé sur des preuves et la documentation de diligence raisonnable',
        },
      },
      whatGet: {
        title: 'Ce Que les Acheteurs Obtiennent (et Ce Qu\'ils N\'Obtiennent Pas)',
        youGet: {
          title: '✅ Vous obtenez:',
          points: [
            'profils de coopératives structurés et comparables',
            'transparence sur la couverture des informations',
            'visibilité sur l\'engagement au niveau des agriculteurs',
          ],
        },
        youDont: {
          title: '🚫 Vous n\'obtenez pas:',
          points: [
            'garanties de conformité',
            'déterminations de risque automatisées',
            'badges de certification',
          ],
        },
        footer: 'AgroSoluce soutient votre diligence raisonnable — il ne la remplace pas.',
      },
      why: {
        title: 'Pourquoi les Acheteurs Utilisent AgroSoluce',
        points: [
          'Réduire les angles morts d\'approvisionnement',
          'Prioriser l\'engagement plutôt que l\'exclusion',
          'Préparer les audits et vérifications sur le terrain plus efficacement',
          'Soutenir un approvisionnement responsable sans exagération',
        ],
      },
      cta: {
        explore: 'Explorer le Répertoire',
        pilot: 'Rejoindre un Pilote Acheteur',
      },
      disclaimer: 'AgroSoluce soutient les processus de diligence raisonnable. Toutes les informations peuvent inclure des données auto-déclarées et ne constituent pas une certification ou une approbation réglementaire.',
    },
    partnerLanding: {
      hero: {
        tagline: 'Pour les ONG & Partenaires de Programme',
        title: 'AgroSoluce pour les ONG & Partenaires de Programme',
        subtitle: 'Rendre Visible le Progrès au Niveau des Agriculteurs — Sans Déformer la Réalité',
        description: 'AgroSoluce aide les ONG et partenaires à surveiller, structurer et soutenir les efforts d\'amélioration dans les coopératives — en commençant par les agriculteurs et en agrégant aux programmes et pilotes. Nous nous concentrons sur ce qui se passe, pas sur ce qui est revendiqué.',
      },
      challenge: {
        title: 'Le Défi des ONG & Programmes',
        subtitle: 'Les programmes ont souvent du mal à:',
        points: [
          'suivre les progrès de manière cohérente dans les coopératives',
          'comparer les efforts équitablement sans simplification excessive',
          'rapporter de manière transparente sans exagérer les résultats',
        ],
        solution: 'AgroSoluce a été construit pour soutenir l\'apprentissage, la surveillance et l\'amélioration — pas les récits marketing.',
      },
      how: {
        title: 'Comment AgroSoluce Soutient les Programmes',
      },
      features: {
        baselines: {
          title: '1. Bases de Coopératives Structurées',
          description: 'AgroSoluce établit une base commune dans les coopératives: identité et contexte d\'approvisionnement, couverture de documentation, et visibilité de l\'engagement des agriculteurs.',
          point1: 'Créer un langage commun entre partenaires',
          point2: 'Permettre une comparaison équitable entre coopératives',
          point3: 'Établir des points de départ basés sur des preuves',
        },
        monitoring: {
          title: '2. Surveillance Axée sur les Agriculteurs',
          description: 'AgroSoluce suit les activités d\'intégration des agriculteurs, les événements de formation, les déclarations et la participation, et les indicateurs de base vs progrès.',
          point1: 'L\'engagement des agriculteurs devient observable, pas anecdotique',
          point2: 'Suivre les activités au niveau des agriculteurs à l\'échelle de la coopérative',
          point3: 'Surveiller la participation à la formation et l\'engagement dans le temps',
          point4: 'Soutenir l\'évaluation de programme basée sur des preuves',
        },
        progress: {
          title: '3. Suivi des Progrès Sans Pression',
          description: 'Les programmes peuvent enregistrer des instantanés de préparation dans le temps, observer les trajectoires d\'amélioration et identifier où un soutien supplémentaire est nécessaire.',
          point1: 'Pas de scores forcés. Pas d\'étiquettes tout ou rien.',
          point2: 'Suivre les améliorations graduelles honnêtement',
          point3: 'Identifier où un soutien supplémentaire est nécessaire',
        },
        views: {
          title: '4. Vues Pilote & Portefeuille',
          description: 'AgroSoluce permet de regrouper les coopératives en pilotes ou programmes, de visualiser des indicateurs agrégés et de descendre à la réalité au niveau de la coopérative lorsque nécessaire.',
          point1: 'Soutenir un reporting basé sur des preuves, pas des déclarations exagérées',
          point2: 'Visualiser les progrès agrégés dans les programmes',
          point3: 'Descendre au détail au niveau de la coopérative lorsque nécessaire',
        },
      },
      whatIs: {
        title: 'Ce Qu\'AgroSoluce Est (et N\'Est Pas)',
        is: {
          title: '✅ AgroSoluce est:',
          points: [
            'une plateforme de transparence et de surveillance',
            'un outil de soutien à la diligence raisonnable',
            'une couche de visibilité de programme axée sur les agriculteurs',
          ],
        },
        isNot: {
          title: '🚫 AgroSoluce n\'est pas:',
          points: [
            'un système de certification',
            'un moteur d\'audit',
            'un garant de résultats',
          ],
        },
      },
      why: {
        title: 'Pourquoi les ONG & Partenaires Utilisent AgroSoluce',
        points: [
          'Renforcer la crédibilité du programme',
          'Aligner les coopératives autour de chemins d\'amélioration réalistes',
          'Partager des informations structurées avec les acheteurs et bailleurs de fonds',
          'Réduire les frictions de reporting sans perdre la nuance',
        ],
      },
      cta: {
        pilot: 'Démarrer un Pilote de Programme',
        explore: 'Explorer les Coopératives',
      },
      disclaimer: 'AgroSoluce soutient les efforts de surveillance et de diligence raisonnable. Il ne certifie pas les résultats ni ne remplace la vérification indépendante.',
    },
  },
};

