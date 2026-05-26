# Registration Wizard - Sprint 07

A production-ready, multi-step registration wizard built with React, TypeScript, Tailwind CSS, and Framer Motion. This project demonstrates enterprise-level form architecture with real-time validation, smooth animations, and excellent UX.

## 📋 Project Overview

This Registration Wizard implements Level 2 engineering requirements with excellent UI and smooth animations. The application guides users through a secure, intuitive onboarding experience with three distinct steps:

1. **Personal Information** - Collect name and date of birth
2. **Account Details** - Create secure email and password
3. **Review & Submit** - Verify and submit registration data

## ✨ Key Features

### Phase 1: Base MVP & State Architecture ✅
- ✓ 3-step wizard with conditional rendering
- ✓ "Next" and "Back" navigation
- ✓ State lifting to parent component
- ✓ Data persistence across step transitions
- ✓ Final submission with console logging
- ✓ Success state UI

### Phase 2: Client-Side Validation & UX Polish ✅
- ✓ Real-time Regex validation (onChange)
- ✓ Email format validation
- ✓ Password strength requirements (min 8 chars)
- ✓ Password confirmation matching
- ✓ Conditional button disabling
- ✓ Show/Hide password toggle with eye icon
- ✓ Dynamic progress bar (Step X of 3)
- ✓ Real-time error messages

### Phase 3: Enterprise Form Architecture ✅
- ✓ React Hook Form integration (performance optimized)
- ✓ Zod schema validation (type-safe)
- ✓ Advanced error handling
- ✓ Field-level validation

### Bonus Features (Level 2 Excellence) 🎯
- ✓ Smooth Framer Motion animations
- ✓ Password strength indicator
- ✓ Copy/Download registration data
- ✓ Age verification (18+ validation)
- ✓ Responsive design (mobile-first)
- ✓ Professional gradient backgrounds
- ✓ Step completion checkmarks
- ✓ Accessibility features

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **State Management**: React Hooks (useState)

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Development

```bash
# Start dev server (opens at http://localhost:5173)
npm run dev

# Run type checking
npm run type-check

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   └── wizard/
│       ├── RegistrationWizard.tsx    # Main orchestrator component
│       ├── ProgressBar.tsx            # Step progress indicator
│       ├── StepOne.tsx                # Personal info form
│       ├── StepTwo.tsx                # Account details form
│       ├── StepThree.tsx              # Review & submit
│       └── index.ts                   # Barrel exports
├── schemas/
│   └── formSchema.ts                  # Zod validation schemas
├── types/
│   └── index.ts                       # TypeScript interfaces
├── App.tsx                            # Root component
├── App.css                            # App styles
├── index.css                          # Global Tailwind styles
└── main.tsx                           # Entry point

tailwind.config.js                     # Tailwind configuration
postcss.config.js                      # PostCSS configuration
```

## 🎨 Component Architecture

### RegistrationWizard
The main orchestrator component that:
- Manages form state (lifted to top level)
- Handles step navigation
- Validates each step before progression
- Executes final submission

### StepOne: Personal Information
- First Name (required, 2-50 chars, letters only)
- Last Name (required, 2-50 chars, letters only)
- Date of Birth (required, must be 18+)
- Real-time validation with error display

### StepTwo: Account Details
- Email (required, valid email format)
- Password (required, 8+ chars, uppercase, lowercase, number, special char)
- Confirm Password (required, must match)
- Password strength indicator (5-level system)
- Show/Hide password toggle

### StepThree: Review & Submit
- Summary of all entered data
- Copy to clipboard functionality
- Download as JSON
- Back to edit option
- Final submission button

## 🔐 Validation Rules

### Personal Information
```
First Name: 2-50 chars, letters/spaces/hyphens/apostrophes
Last Name: 2-50 chars, letters/spaces/hyphens/apostrophes
DOB: Must be 18+ years old
```

### Account Details
```
Email: Valid email format (^[^\s@]+@[^\s@]+\.[^\s@]+$)
Password Requirements:
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 special character (!@#$%^&*(),.?":{}|<>)
Confirm Password: Exact match with password field
```

## 🎭 Animations & Transitions

- **Step Transitions**: Slide up with fade-in effect
- **Field Animations**: Staggered entrance animations
- **Progress Bar**: Smooth width animation
- **Error Messages**: Fade-in animation
- **Success State**: Spring animation for confirmation
- **Button Interactions**: Scale on hover/click

## 📊 State Management

All form data is managed through a single `formData` state object:

```typescript
interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

Data persists across step navigation via state lifting pattern.

## 🧪 Testing Scenarios

### Test Data
```
Name: John Doe
DOB: 01/15/1995 (29+ years old)
Email: john.doe@example.com
Password: SecurePass123!@#
```

### QA Checklist
- [x] Personal info validation works
- [x] Back button preserves data
- [x] Password requirements enforced
- [x] Email format validated
- [x] Confirm password matching works
- [x] Show/Hide password toggle functions
- [x] Progress bar updates correctly
- [x] Next button disabled when invalid
- [x] Final submission logs data to console
- [x] Success state displays correctly
- [x] Responsive on mobile devices

## 🚢 Deployment

### Vercel
```bash
npm run build
# Push to GitHub
# Connect to Vercel (automatic deployment)
```

### Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

## 📝 Console Output

Upon successful submission, the console logs:

```javascript
{
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1995-01-15",
  email: "john@example.com",
  password: "SecurePass123!@#",
  confirmPassword: "SecurePass123!@#"
}
```

## 🎓 Learning Resources

### React Hook Form
- Performance-optimized form handling
- Reduces re-renders with uncontrolled components
- Handles complex validation seamlessly

### Zod Validation
- TypeScript-first schema validation
- Type inference from schemas
- Custom validation rules

### Framer Motion
- Declarative animations
- Motion components with spring physics
- Gesture animations (hover, tap, drag)

## 🐛 Known Issues & Solutions

### Issue: Button hard-refreshes on click
**Solution**: All buttons have `type="button"` or use `e.preventDefault()`

### Issue: Data not persisting on back click
**Solution**: State is lifted to parent component and passed as props

### Issue: Validation not triggering on input
**Solution**: onChange handlers call real-time validation functions

## 📞 Support

- **Documentation**: See inline code comments
- **Issues**: Check GitHub issues
- **Email**: For critical blockers, consult Mr. Nakul (8851407750)
- **Support Window**: Monday-Friday, 10:00 AM - 12:00 PM IST

## 📄 License

This project is part of the Prodesk IT Sprint 07 Engineering Challenge.

## ✅ Submission Checklist

- [x] Multi-step wizard (3 steps)
- [x] State lifting pattern
- [x] Real-time validation
- [x] Back button with data persistence
- [x] Show/Hide password toggle
- [x] Progress indicator
- [x] React Hook Form integration
- [x] Zod validation schema
- [x] Excellent UI with Tailwind
- [x] Smooth animations with Framer Motion
- [x] Console.log on submission
- [x] Success state UI
- [x] Responsive design
- [x] Type-safe TypeScript

## 🎉 Features Implemented

This implementation goes beyond the base requirements with:
- Password strength meter
- Age verification
- JSON export functionality
- Professional animations
- Accessibility considerations
- Mobile-responsive design
- Error boundary patterns
- Component composition best practices

---

**Built with ❤️ for Sprint 07 - The Registration Wizard Module**
