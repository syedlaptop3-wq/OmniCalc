import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

// Lazy Load Pages & Calculators
// For named exports, we map the module to the default export expected by React.lazy
const ScientificCalculator = React.lazy(() => import('./calculators/BasicCalculators').then(m => ({ default: m.ScientificCalculator })));
const PercentageCalculator = React.lazy(() => import('./calculators/BasicCalculators').then(m => ({ default: m.PercentageCalculator })));

const LoanCalculator = React.lazy(() => import('./calculators/FinanceCalculators').then(m => ({ default: m.LoanCalculator })));
const CompoundInterestCalculator = React.lazy(() => import('./calculators/FinanceCalculators').then(m => ({ default: m.CompoundInterestCalculator })));

const BMICalculator = React.lazy(() => import('./calculators/MathHealthCalculators').then(m => ({ default: m.BMICalculator })));
const AgeCalculator = React.lazy(() => import('./calculators/MathHealthCalculators').then(m => ({ default: m.AgeCalculator })));
const QuadraticSolver = React.lazy(() => import('./calculators/MathHealthCalculators').then(m => ({ default: m.QuadraticSolver })));
const StatisticsCalculator = React.lazy(() => import('./calculators/MathHealthCalculators').then(m => ({ default: m.StatisticsCalculator })));

const BaseConverter = React.lazy(() => import('./calculators/DeveloperTools').then(m => ({ default: m.BaseConverter })));
const PasswordGenerator = React.lazy(() => import('./calculators/DeveloperTools').then(m => ({ default: m.PasswordGenerator })));
const UnitConverter = React.lazy(() => import('./calculators/DeveloperTools').then(m => ({ default: m.UnitConverter })));

const BlogIndex = React.lazy(() => import('./pages/Blog').then(m => ({ default: m.BlogIndex })));
const BlogPost = React.lazy(() => import('./pages/Blog').then(m => ({ default: m.BlogPost })));

const PrivacyPolicy = React.lazy(() => import('./pages/LegalPages').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = React.lazy(() => import('./pages/LegalPages').then(m => ({ default: m.TermsOfService })));
const AboutUs = React.lazy(() => import('./pages/LegalPages').then(m => ({ default: m.AboutUs })));
const ContactUs = React.lazy(() => import('./pages/LegalPages').then(m => ({ default: m.ContactUs })));

// Loading fallback with visual feedback
const Loading = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500 animate-pulse">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="font-medium">Loading Calculator...</p>
  </div>
);

function App() {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Basic */}
            <Route path="/basic" element={<ScientificCalculator />} />
            <Route path="/scientific" element={<ScientificCalculator />} />
            <Route path="/percentage" element={<PercentageCalculator />} />

            {/* Finance */}
            <Route path="/loan" element={<LoanCalculator />} />
            <Route path="/compound-interest" element={<CompoundInterestCalculator />} />

            {/* Health & Math */}
            <Route path="/age" element={<AgeCalculator />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/quadratic" element={<QuadraticSolver />} />
            <Route path="/statistics" element={<StatisticsCalculator />} />

            {/* Developer */}
            <Route path="/base-converter" element={<BaseConverter />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/unit-converter" element={<UnitConverter />} />

            {/* Blog & Content */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* Legal */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
}

export default App;