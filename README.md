# Student User Management Application

This project is a single-page React application that fetches and displays student user data using the JSONPlaceholder API. It features efficient conditional rendering, form validation, form Sanitization, Context-API State management and error handling to provide a seamless and performant user experience.

[Live Demo](https://studentusers.netlify.app/)  
Access the live version of this project by clicking the link above.

## **Application Highlights**

- **Student User View**: Fetches and displays student user data from the `/users` endpoint of the JSONPlaceholder API.

- **Data Mapping**:

  - `name` → `firstName`
  - `username` → `lastName`
  - `email` → `email`
  - `company.name` → `department`

- **Single Page Design**:

  - All components are conditionally rendered on a single page to avoid unnecessary rerenders and maximize performance.

- **Form Validation**:

  - Includes robust error handling for forms.
  - Displays specific validation messages for input errors.

- **Sanitization with DOMPurify**:

  - Input fields are sanitized using **DOMPurify** before being sent to the API to prevent potential XSS attacks.

- **Responsive Design**: Styled with TailwindCSS for a clean, responsive layout.

- **API Error Handling**:

  - Comprehensive handling of API errors, ensuring the application provides user-friendly error messages when issues occur.

- **Context API**:
  - For Effective State management Context-API is used to avoid Props drilling.

---

## **Tech Stack**

- **Frontend**: React with TailwindCSS for UI styling.
- **Routing**: React Router dom lazy, suspense for conditional rendering.
- **API Integration**: Axios for HTTP requests.
- **Build Tool**: Vite for fast and efficient development.

---

## **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/Rajganez/crud_users.git
   ```

2. Navigate to Project directory

   ```bash
   cd crud_users
   ```

3. Install Dependencies:

   ```bash
   npm install
   ```

4. Start Deployment Server:
   ```bash
   npm run dev
   ```
