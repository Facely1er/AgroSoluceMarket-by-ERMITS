# AgroSoluce Assessment Module - Cursor AI Development Guide

## 🎯 Project Overview
Transform the basic assessment module into a production-ready platform with full functionality, database integration, and deployment capability.

---

## 🚀 Phase 1: Project Setup in Cursor (30 minutes)

### **Step 1: Create New Project**
```bash
# In terminal within Cursor
mkdir agrosoluce-assessment
cd agrosoluce-assessment
npm init -y
```

### **Step 2: Install Dependencies (Copy-Paste This)**
```bash
# Core framework
npm install react@18 react-dom@18 typescript @types/react @types/react-dom

# Build tools
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer

# Database & Auth
npm install @supabase/supabase-js

# Form handling
npm install react-hook-form @hookform/resolvers zod

# UI & Icons
npm install lucide-react clsx tailwind-merge

# Initialize Tailwind
npx tailwindcss init -p
```

### **Step 3: Cursor AI Prompt for Initial Setup**
```
Create a React + TypeScript + Vite project structure for AgroSoluce Assessment Module with:
1. Tailwind CSS configuration
2. TypeScript config for strict mode
3. Basic folder structure: src/components, src/hooks, src/types, src/utils
4. Vite config with React plugin
5. Package.json scripts for dev, build, preview
6. Import the working assessment HTML and convert to React components
```

---

## 🏗️ Phase 2: Core Assessment Structure (2 hours)

### **Step 1: Define Assessment Types**
**Cursor Prompt:**
```
Create TypeScript interfaces for AgroSoluce assessment system:

1. AssessmentQuestion interface with:
   - id, question text, answer options with scores
   - question type (single-choice, multi-choice)
   - validation rules, help text

2. AssessmentSection interface with:
   - id, title, icon, description
   - array of questions, completion requirements

3. AssessmentResults interface with:
   - overall score (0-100), section scores
   - recommendations array with priorities
   - toolkit readiness boolean

Create these in src/types/assessment.ts
```

### **Step 2: Assessment Data Structure**
**Cursor Prompt:**
```
Create comprehensive assessment data in src/data/assessmentData.ts covering:

1. FARM PROFILE (5 questions):
   - Cooperative size (50-150, 150-400, 400+)
   - Primary crops (cocoa, cashew, coffee, mixed)
   - Certifications (Fair Trade, Organic, none)
   - Geographic location, market access

2. SECURITY ASSESSMENT (6 questions):
   - Data storage (digital secure, basic computer, paper)
   - Financial security (bank, mobile money, cash)
   - Communication security, device security

3. CHILD PROTECTION (6 questions):
   - Child labor policies (written enforced, written, verbal, none)
   - Education support (fund, supplies, encouragement, none)
   - Monitoring systems

4. COMPLIANCE (5 questions):
   - Document organization, deadline tracking
   - Audit preparation, certification management

5. ECONOMIC BASELINE (5 questions):
   - Market information, buyer relationships
   - Financial planning, price negotiation

Each question has 3-4 weighted options (0-3 points) realistic for Côte d'Ivoire cooperatives.
```

### **Step 3: Assessment Engine Hook**
**Cursor Prompt:**
```
Create useAssessment hook in src/hooks/useAssessment.ts that:

1. Manages current section/question state
2. Handles answer collection with validation
3. Calculates progress percentage
4. Persists to localStorage
5. Computes real-time scoring
6. Generates personalized recommendations

Include TypeScript types and proper error handling.
```

---

## 📱 Phase 3: React Components (3 hours)

### **Step 1: Convert HTML to React Components**
**Cursor Prompt:**
```
Convert the working AgroSoluce assessment HTML to React components:

1. AssessmentApp (main container)
2. ProgressBar (shows completion percentage)
3. AssessmentCard (question display)
4. QuestionGroup (individual questions with options)
5. NavigationControls (prev/next buttons)
6. ResultsDisplay (scoring and recommendations)

Maintain the exact styling and functionality but use:
- React state management
- TypeScript props interfaces
- Tailwind CSS classes
- Component modularity

Place components in src/components/ folder.
```

### **Step 2: Enhanced UI Components**
**Cursor Prompt:**
```
Create additional React components for AgroSoluce:

1. Header component:
   - Logo with orbital animation
   - "Farmers First" badge
   - Mobile-responsive design

2. ScoreCircle component:
   - Animated circular progress
   - Dynamic color based on score
   - Percentage display in center

3. RecommendationCard component:
   - Priority indicators (Critical, High, Medium)
   - Action items with icons
   - Mobile-optimized layout

Use AgroSoluce brand colors: green #2E7D32, gold #FFB300
Ensure mobile-first responsive design.
```

---

## 🗃️ Phase 4: Database Integration (2 hours)

### **Step 1: Supabase Setup**
**Cursor Prompt:**
```
Create Supabase database schema for AgroSoluce:

1. Database tables SQL:
   - assessments (id, created_at, cooperative_name, responses, scores, completed)
   - recommendations (id, assessment_id, category, priority, description)

2. Row Level Security policies for data protection

3. TypeScript types for database tables

4. Environment variables setup for Supabase connection

Create files: src/lib/supabase.ts, src/types/database.ts
```

### **Step 2: Database Service Layer**
**Cursor Prompt:**
```
Create database service in src/services/assessmentService.ts:

1. saveAssessment(data) - save assessment responses
2. loadAssessment(id) - retrieve assessment by ID  
3. generateRecommendations(scores) - create personalized recommendations
4. getAssessmentHistory() - list previous assessments

Include:
- Error handling and retry logic
- Offline storage fallback
- TypeScript types and validation
- Loading states management
```

---

## 🎨 Phase 5: Advanced Features (2 hours)

### **Step 1: Intelligent Recommendations**
**Cursor Prompt:**
```
Create recommendation engine in src/utils/recommendationEngine.ts:

1. Score-based recommendation logic:
   - Child protection gaps → Critical priority recommendations
   - Security issues → High priority recommendations  
   - Economic optimization → Medium priority recommendations

2. Toolkit readiness determination:
   - Overall score >= 60% = Ready for toolkit
   - < 60% = Foundation building needed

3. Specific action items based on weak areas:
   - Low child protection scores → Policy development recommendations
   - Poor security → Data protection recommendations
   - Weak compliance → Documentation recommendations

Return structured recommendations with priorities and next steps.
```

### **Step 2: Export and Sharing**
**Cursor Prompt:**
```
Add export capabilities to AgroSoluce assessment:

1. PDF Report Generation:
   - Assessment summary with scores
   - Recommendations list with priorities
   - Next steps and contact information

2. Shareable Results:
   - Generate unique assessment links
   - WhatsApp/SMS sharing capability
   - Email report delivery

3. Data Export:
   - JSON format for data portability
   - CSV export for analysis

Create components: ExportButton, ShareResults, ReportGenerator
```

---

## 🚀 Phase 6: Production Optimization (1 hour)

### **Step 1: Build Configuration**
**Cursor Prompt:**
```
Optimize AgroSoluce for production deployment:

1. Vite configuration optimization:
   - Code splitting by routes
   - Bundle size optimization
   - Asset optimization (images, fonts)

2. Performance improvements:
   - Lazy loading of components
   - Image optimization
   - Caching strategies

3. PWA features:
   - Service worker for offline access
   - App manifest for mobile installation
   - Background sync capability

4. SEO and social sharing:
   - Meta tags for social media
   - Open Graph protocol
   - Structured data markup

Update vite.config.ts and create public/manifest.json
```

### **Step 2: Deployment Setup**
**Cursor Prompt:**
```
Create deployment configuration:

1. Vercel deployment:
   - vercel.json configuration
   - Environment variables setup
   - Custom domain configuration

2. GitHub Actions workflow:
   - Automated testing
   - Build and deployment
   - Security scanning

3. Monitoring setup:
   - Error tracking
   - Performance monitoring
   - User analytics (privacy-focused)

Create .github/workflows/deploy.yml and vercel.json
```

---

## 📱 Phase 7: Mobile Optimization (1 hour)

### **Step 1: Offline-First Architecture**
**Cursor Prompt:**
```
Implement offline-first capabilities for rural farmers:

1. Service Worker setup:
   - Cache assessment app for offline use
   - Background sync when connection available
   - Conflict resolution for data sync

2. Local storage optimization:
   - Save assessment progress offline
   - Queue responses for upload
   - Compress data for storage efficiency

3. Connection-aware features:
   - Detect online/offline status
   - Adaptive loading based on connection speed
   - Progressive enhancement for slow networks

4. Mobile UX improvements:
   - Touch-friendly interface (44px+ tap targets)
   - Swipe navigation between questions
   - Voice input preparation (future feature)

Create src/utils/offline.ts and src/components/OfflineIndicator.tsx
```

---

## 🧪 Phase 8: Testing & Quality (1 hour)

### **Step 1: Testing Suite**
**Cursor Prompt:**
```
Create comprehensive testing for AgroSoluce:

1. Unit tests with Jest and React Testing Library:
   - Assessment calculation logic
   - Component rendering and interactions
   - Hook functionality validation
   - Recommendation engine accuracy

2. Integration tests:
   - Database operations
   - End-to-end user flows
   - Offline functionality
   - Error handling scenarios

3. Performance tests:
   - Load time measurements
   - Bundle size monitoring
   - Memory usage profiling

4. Accessibility tests:
   - WCAG 2.1 compliance
   - Screen reader compatibility
   - Keyboard navigation

Create test files in src/__tests__/ and setup test configuration.
```

---

## ⚡ Essential Cursor Prompts for Quick Development

### **Component Creation Template:**
```
Create a React TypeScript component for AgroSoluce called [ComponentName] that:
- [Specific functionality]
- Uses Tailwind CSS with AgroSoluce brand colors (green #2E7D32, gold #FFB300)
- Is mobile-responsive and accessible
- Includes proper TypeScript props interface
- Follows React best practices
```

### **Database Operation Template:**
```
Create a Supabase service function that:
- [Specific database operation]
- Includes TypeScript types
- Has comprehensive error handling
- Supports offline fallback
- Implements proper security measures
```

### **Styling Enhancement Template:**
```
Enhance this component with [specific feature] while:
- Maintaining AgroSoluce brand consistency
- Ensuring mobile responsiveness
- Following accessibility guidelines
- Using Tailwind CSS utility classes
```

---

## 📋 Quick Start Checklist

### **Setup (30 minutes)**
- [ ] Create new Cursor project
- [ ] Install all dependencies  
- [ ] Configure Tailwind CSS
- [ ] Set up folder structure
- [ ] Initialize Git repository

### **Core Development (8 hours)**
- [ ] Convert HTML to React components
- [ ] Implement assessment logic
- [ ] Add database integration
- [ ] Create recommendation engine
- [ ] Build results dashboard

### **Production Ready (3 hours)**
- [ ] Optimize performance
- [ ] Add offline capabilities
- [ ] Implement testing
- [ ] Configure deployment
- [ ] Add monitoring

### **Launch (1 hour)**
- [ ] Deploy to production
- [ ] Test on mobile devices
- [ ] Validate user workflows
- [ ] Monitor performance

---

## 🎯 Expected Development Timeline

**Total Time: 12-15 hours over 2-3 days**

**Day 1 (6-8 hours):**
- Project setup and core components
- Assessment logic implementation
- Basic UI completion

**Day 2 (4-5 hours):**
- Database integration
- Advanced features
- Testing and optimization

**Day 3 (2-3 hours):**
- Production deployment
- Mobile optimization
- Final testing and launch

---

## 💡 Pro Tips for Cursor Development

1. **Start with working HTML** - Import the existing assessment HTML as reference
2. **Use incremental prompts** - Build one component at a time
3. **Test frequently** - Run `npm run dev` after each major component
4. **Be specific in prompts** - Include exact requirements and constraints
5. **Reference existing code** - Ask Cursor to modify/extend existing components
6. **Generate test data** - Have Cursor create realistic farmer scenarios
7. **Optimize iteratively** - Start with basic functionality, then enhance

This guide provides a complete roadmap for building the AgroSoluce Assessment Module from the working HTML prototype to a production-ready React application using Cursor AI's development capabilities.
