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
  },
};

