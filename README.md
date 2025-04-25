#  Feedback Collector

A minimal, clean, and responsive full-stack micro-application to collect user feedback — built with **Next.js**, **Tailwind CSS**, and **Firebase**.

> Built for a candidate task submission to demonstrate attention to detail, frontend polish, backend integration, and deployment readiness.

---

##  Live Demo

 [View Live App](https://your-netlify-link.netlify.app) ← _replace this with your link_

---

##  Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS
- **Backend:** Firebase Firestore
- **API:** App Router’s route handlers
- **Deployment:** Netlify
- **Extras:** react-hot-toast, dark/light mode, responsive design

---

##  Features

-  Collects full name, email, and feedback message
-  Dark / light theme toggle via gear icon
-  Mobile responsive across devices
-  Timestamp saved for each submission
-  Admin view with toggle to show submitted feedback
-  Form validation with user-friendly messages
-  Toast notifications after submit
-  Navigation between Home/Admin using user icon

---

##  Project Structure

- /page.js → Home page with FeedbackForm
- /app /admin/page.js → Admin page with feedback list 
- /api /submit-feedback/ → POST route for submitting 
- /feedback/ → GET route to retrieve feedback 
- /layout.js → Global layout with footer, Toaster 
- /page.js → Home page with FeedbackForm
- /components FeedbackForm.js → Form with validation, loading, toast 
    FeedbackList.js → Display feedback in admin view 
    topNav.js → Header with theme + route toggles
- /lib firebase.js → Firebase setup and export
