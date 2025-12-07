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
        tagline: 'Secure Agricultural Marketplace Platform',
        title: '🌾 AgroSoluce® Marketplace',
        subtitle: 'Connect West African Cooperatives with Global Buyers',
        description: 'The secure agricultural marketplace platform that transforms farming operations through technology, compliance, and global market access.',
        ctaCooperatives: 'Explore Cooperatives',
        ctaBuyer: 'Buyer Portal',
        freeNote: '✨ Free for cooperatives • Secure • Regulatory compliant',
      },
      stats: {
        cooperatives: 'Registered Cooperatives',
        regions: 'Regions Covered',
        verification: 'Verification Rate',
        market: 'Potential Market',
      },
      outcomes: {
        title: 'Measurable Outcomes',
        subtitle: 'Features designed to produce concrete results',
        buyerConnections: {
          title: 'Buyer Connections',
          feature: 'Intelligent matching system between buyers and cooperatives',
          outcome1: 'Receive automatic matches based on your capabilities',
          outcome2: 'Post purchase requests and find qualified suppliers',
          outcome3: 'Access a global market of 3,797+ verified cooperatives',
          cta: 'Access matching',
        },
        readiness: {
          title: 'Readiness Tracking',
          feature: 'Readiness Snapshots and status assessment',
          outcome1: 'Track your progress: not_ready → in_progress → buyer_ready',
          outcome2: 'Create historical snapshots of your readiness',
          outcome3: 'Identify gaps to fill to reach buyer_ready status',
        },
        coverage: {
          title: 'Coverage Metrics',
          feature: 'Tracking of farmer and plot coverage',
          outcome1: 'Visualize coverage percentage: farmers, plots, documents',
          outcome2: 'Identify plots with GPS geolocation',
          outcome3: 'Track presence of required documents for compliance',
        },
        assessment: {
          title: 'Self-Assessment',
          feature: 'Assessment Flow with scoring and recommendations',
          outcome1: 'Complete a multi-section self-assessment',
          outcome2: 'Receive an overall score and scores by section',
          outcome3: 'Get prioritized recommendations for improvement',
          cta: 'Start assessment',
        },
        evidence: {
          title: 'Evidence Management',
          feature: 'Document upload and organization',
          outcome1: 'Upload compliance documents (certifications, policies, land evidence)',
          outcome2: 'Organize by evidence type with complete metadata',
          outcome3: 'Improve your coverage score by adding documents',
        },
        compliance: {
          title: 'Compliance Monitoring',
          feature: 'Child Labor Compliance and EUDR Verification',
          outcome1: 'Create and manage child labor compliance assessments',
          outcome2: 'Track remediation actions and their progress',
          outcome3: 'Manage certifications (Fair Trade, Rainforest Alliance)',
          cta: 'View dashboard',
        },
        farmersFirst: {
          title: 'Farmers First Toolkit',
          feature: 'Farmer management and engagement tools',
          outcome1: 'Register and manage your farmers with declarations',
          outcome2: 'Track farmer onboarding and training',
          outcome3: 'Measure impact with baseline assessments and monthly reports',
        },
        traceability: {
          title: 'Supply Chain Traceability',
          feature: 'Batch tracking and supply chain traceability',
          outcome1: 'Track batches from harvest to sale',
          outcome2: 'Visualize supply chain with origin mapping',
          outcome3: 'Record transfer transactions between entities',
        },
        gaps: {
          title: 'Gap Analysis',
          feature: 'Gap identification and guidance',
          outcome1: 'Automatically identify missing documents',
          outcome2: 'Receive specific guidance for each gap type',
          outcome3: 'Access targeted enablement resources and tools',
        },
      },
      cta: {
        title: 'Start Measuring Your Results',
        subtitle: 'Access your workspace to start tracking your progress',
        buttonCooperatives: 'Explore Cooperatives',
        buttonBuyer: 'Buyer Portal',
      },
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
        tagline: 'Plateforme de marché agricole sécurisée',
        title: '🌾 AgroSoluce® Marketplace',
        subtitle: 'Connect West African Cooperatives with Global Buyers',
        description: 'La plateforme de marché agricole sécurisée qui transforme les opérations agricoles grâce à la technologie, la conformité et l\'accès au marché mondial.',
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
      outcomes: {
        title: 'Résultats Mesurables',
        subtitle: 'Des fonctionnalités conçues pour produire des résultats concrets',
        buyerConnections: {
          title: 'Connexions avec les Acheteurs',
          feature: 'Système de matching intelligent entre acheteurs et coopératives',
          outcome1: 'Recevez des correspondances automatiques basées sur vos capacités',
          outcome2: 'Publiez des demandes d\'achat et trouvez des fournisseurs qualifiés',
          outcome3: 'Accédez à un marché mondial de 3,797+ coopératives vérifiées',
          cta: 'Accéder au matching',
        },
        readiness: {
          title: 'Suivi de Préparation',
          feature: 'Readiness Snapshots et évaluation de statut',
          outcome1: 'Suivez votre progression: not_ready → in_progress → buyer_ready',
          outcome2: 'Créez des instantanés historiques de votre préparation',
          outcome3: 'Identifiez les gaps à combler pour atteindre le statut buyer_ready',
        },
        coverage: {
          title: 'Métriques de Couverture',
          feature: 'Suivi de la couverture des agriculteurs et parcelles',
          outcome1: 'Visualisez le pourcentage de couverture: agriculteurs, parcelles, documents',
          outcome2: 'Identifiez les parcelles avec géolocalisation GPS',
          outcome3: 'Suivez la présence des documents requis pour la conformité',
        },
        assessment: {
          title: 'Auto-Évaluation',
          feature: 'Assessment Flow avec scoring et recommandations',
          outcome1: 'Complétez une auto-évaluation multi-sections',
          outcome2: 'Recevez un score global et des scores par section',
          outcome3: 'Obtenez des recommandations prioritaires pour amélioration',
          cta: 'Commencer l\'évaluation',
        },
        evidence: {
          title: 'Gestion des Preuves',
          feature: 'Téléchargement et organisation de documents',
          outcome1: 'Téléchargez des documents de conformité (certifications, politiques, preuves foncières)',
          outcome2: 'Organisez par type d\'évidence avec métadonnées complètes',
          outcome3: 'Améliorez votre score de couverture en ajoutant des documents',
        },
        compliance: {
          title: 'Surveillance de la Conformité',
          feature: 'Child Labor Compliance et EUDR Verification',
          outcome1: 'Créez et gérez des évaluations de conformité du travail des enfants',
          outcome2: 'Suivez les actions de remédiation et leur progression',
          outcome3: 'Gérez les certifications (Fair Trade, Rainforest Alliance)',
          cta: 'Voir le tableau de bord',
        },
        farmersFirst: {
          title: 'Farmers First Toolkit',
          feature: 'Gestion des agriculteurs et outils d\'engagement',
          outcome1: 'Enregistrez et gérez vos agriculteurs avec déclarations',
          outcome2: 'Suivez l\'onboarding et la formation des agriculteurs',
          outcome3: 'Mesurez l\'impact avec des évaluations de base et rapports mensuels',
        },
        traceability: {
          title: 'Traçabilité de la Chaîne',
          feature: 'Batch tracking et supply chain traceability',
          outcome1: 'Suivez les lots de la récolte à la vente',
          outcome2: 'Visualisez la chaîne d\'approvisionnement avec cartographie des origines',
          outcome3: 'Enregistrez les transactions de transfert entre entités',
        },
        gaps: {
          title: 'Analyse des Gaps',
          feature: 'Identification des gaps et guidance',
          outcome1: 'Identifiez automatiquement les documents manquants',
          outcome2: 'Recevez des conseils spécifiques pour chaque type de gap',
          outcome3: 'Accédez à des ressources et outils d\'enablement ciblés',
        },
      },
      cta: {
        title: 'Commencez à Mesurer vos Résultats',
        subtitle: 'Accédez à votre espace de travail pour commencer à suivre votre progression',
        buttonCooperatives: 'Explorer les Coopératives',
        buttonBuyer: 'Espace Acheteur',
      },
    },
  },
};

