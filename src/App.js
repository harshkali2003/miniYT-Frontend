import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Auth/LoginPage";
import SignupPage from "./Auth/SignupPage";
import VideosPage from "./Pages/VideosPage";
import VideoDetailsPage from "./Pages/VideoDetailsPage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import UploadPage from "./Pages/UploadPage";
import Profile from "./Pages/Profile";
import EditPage from "./Pages/EditProfile";
import Layout from "./Pages/Layout";
import PrivacyPage from './Footer/PrivacyPage'
import Team from './Footer/Team'
import AboutPage from "./Footer/AboutPage";
import ContactPage from "./Footer/ContactPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout/>
        <Footer />
      </>
    ),
  },
  {
    path: "/videos",
    element: (
      <>
        <NavBar />
        <VideosPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/video/:id",
    element: (
      <>
        {" "}
        <NavBar />
        <VideoDetailsPage /> <Footer />
      </>
    ),
  },
  {
    path: "/upload",
    element: (
      <>
        <NavBar /> <UploadPage /> <Footer />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <NavBar />
        <Profile />
        <Footer />
      </>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <>
        <NavBar />
        <EditPage />
        <Footer />
      </>
    ),
  },
  {
    path : "/privacy",
    element : <>
      <NavBar />
        <PrivacyPage/>
        <Footer />
    </>
  },
  {
     path : "/team",
    element : <>
      <NavBar />
        <Team/>
        <Footer />
    </>
  },
  {
    path : "/about",
    element : <>
      <NavBar />
        <AboutPage/>
        <Footer />
    </>
  },
  {
    path : "/contact",
    element : <>
      <NavBar />
        <ContactPage/>
        <Footer />
    </>
  },
  {
    path: "/log",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  {
    path: "/sign",
    element: <SignupPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
