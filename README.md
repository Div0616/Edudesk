# 🎓 EduDesk — Teacher-Student Management Web App

A professional web application for teachers to manage students, track attendance, record exam marks, generate Excel reports, and share them with parents via WhatsApp.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd edudesk
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (e.g., "edudesk")
3. Enable **Authentication** → Sign-in methods → Enable **Email/Password** and **Google**
4. Create **Firestore Database** → Start in test mode
5. Go to Project Settings → Your Apps → Add Web App
6. Copy your config and paste it into `src/firebase/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### 3. Set Up Firestore Rules (optional, for production)

In Firebase Console → Firestore → Rules, replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /teachers/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /classes/{classId} {
      allow read, write: if request.auth != null && resource.data.teacherId == request.auth.uid;
      allow create: if request.auth != null;
    }
    match /students/{studentId} {
      allow read, write: if request.auth != null;
    }
    match /attendance/{docId} {
      allow read, write: if request.auth != null;
    }
    match /exams/{examId} {
      allow read, write: if request.auth != null;
    }
    match /marks/{markId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
edudesk/
├── src/
│   ├── components/
│   │   ├── ui/index.jsx          # Button, Input, Modal, Badge, Card...
│   │   ├── layout/Layout.jsx     # Sidebar, Navbar, PageHeader
│   │   └── ProtectedRoute.jsx    # Auth guard
│   ├── context/
│   │   └── AuthContext.jsx       # Firebase Auth state
│   ├── firebase/
│   │   ├── firebase.js           # ⚠️ Add your Firebase config here
│   │   └── firestore.js          # All Firestore CRUD helpers
│   ├── pages/
│   │   ├── Login.jsx             # Login & Register
│   │   ├── Dashboard.jsx         # Analytics dashboard
│   │   ├── Classes.jsx           # Class management
│   │   ├── ClassDetail.jsx       # Students list
│   │   ├── Attendance.jsx        # Mark & view attendance
│   │   ├── StudentProfile.jsx    # Student performance view
│   │   ├── Exams.jsx             # Exam management
│   │   ├── ExamDetail.jsx        # Enter student marks
│   │   └── Reports.jsx           # Generate & share reports
│   ├── utils/
│   │   ├── gradeCalculator.js    # Grade & percentage logic
│   │   ├── excelGenerator.js     # SheetJS Excel report
│   │   └── whatsappHelper.js     # WhatsApp deep links
│   ├── App.jsx                   # Routes
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind + global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 Auth | Firebase Email/Password + Google OAuth |
| 🏫 Classes | Create/edit/delete classes and sections |
| 👨‍🎓 Students | Manage students with parent WhatsApp numbers |
| 📅 Attendance | Mark Present/Absent/Late with history view |
| 📝 Exams | Create exams, enter marks, auto-grade |
| 📊 Dashboard | Analytics with charts (Recharts) |
| 📄 Reports | Generate Excel (.xlsx) student reports |
| 💬 WhatsApp | One-click share reports with parents |
| 📦 Bulk Send | Send reports to all parents in a class |

---

## 📱 Pages & Routes

| Route | Page |
|---|---|
| `/login` | Login & Register |
| `/dashboard` | Analytics Dashboard |
| `/classes` | Class List |
| `/classes/:classId` | Class Detail (Students) |
| `/classes/:classId/attendance` | Attendance |
| `/students/:studentId` | Student Profile |
| `/exams` | Exam List |
| `/exams/:examId` | Enter Marks |
| `/reports` | Generate & Share Reports |

---

## 🛠️ Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** — styling
- **Firebase** — Auth + Firestore
- **React Router v6** — routing
- **Recharts** — charts
- **SheetJS (xlsx)** — Excel export
- **react-hot-toast** — notifications
- **date-fns** — date formatting

---

## 📝 Notes

- WhatsApp numbers must be in **international format without +** (e.g., `923001234567` for Pakistan)
- The app is scoped per teacher — each teacher only sees their own data
- Excel reports are downloaded locally; teachers manually attach them in WhatsApp
- For production, update Firestore security rules before deploying

---

Built with ❤️ using EduDesk

---

## 🆕 v2.0 New Features

### ✅ All Features Added:

| Feature | Details |
|---|---|
| 👤 Teacher Profile | Edit name, school, bio, subjects, change password |
| 📥 Bulk Student Import | Upload CSV → batch write to Firestore (up to 490/batch) |
| 🗓️ Timetable | Weekly grid, click any slot to assign subject/time/room |
| 📚 Homework | Assign per subject, due dates, priority, status tracking |
| 🎓 Multi-Subject per Class | Teacher types any subject name — zero predefined list |
| 📊 Subject-wise Report Cards | Excel file has one sheet per subject + full report sheet |
| 📈 Student Progress Over Time | Line chart showing score trend across exams |
| 📉 Attendance Trend | Weekly area chart (8 weeks of Present vs Absent %) |
| ⚠️ Low Attendance Alerts | Auto-highlights students below 75% attendance |
| ♾️ Infinite Scroll Pagination | Students load 20 at a time via IntersectionObserver |
| 🗺️ Onboarding Tutorial | 8-step guided walkthrough for first-time teachers |
| ⚡ Lazy Loading / Code Splitting | All pages lazy-loaded via React.lazy + Suspense |
| 🔥 Firestore Batch Writes | CSV imports use writeBatch for atomic performance |

### 📁 New Files:
- `src/pages/TeacherProfile.jsx` — Full profile management
- `src/pages/Timetable.jsx` — Interactive weekly timetable
- `src/pages/Homework.jsx` — Homework management
- `src/pages/Analytics.jsx` — Advanced charts and alerts
- `src/components/Onboarding.jsx` — Tutorial walkthrough
- `src/components/OnboardingWrapper.jsx` — Auto-shows on first visit

### 🔧 Updated Files:
- `src/pages/ClassDetail.jsx` — Added Subjects tab + Bulk Import tab + Infinite scroll
- `src/pages/Exams.jsx` — Uses class subjects (teacher-defined, not predefined)
- `src/utils/excelGenerator.js` — Subject-wise sheets in Excel report
- `src/firebase/firestore.js` — Added subjects, timetable, homework, batch writes, pagination
- `src/App.jsx` — All new routes + React.lazy code splitting
- `src/components/layout/Layout.jsx` — New sidebar items

### 📁 New Firestore Collections:
```
subjects/{subjectId}
  └── classId, teacherId, name

timetable/{slotId}
  └── classId, teacherId, day, period, subject, teacher, room, startTime, endTime

homework/{hwId}
  └── classId, teacherId, title, subject, description, dueDate, priority, status
```
