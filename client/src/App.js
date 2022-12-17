import './App.css';
import "../node_modules/video-react/dist/video-react.css";
import 'react-toastify/dist/ReactToastify.css';
import "react-multi-carousel/lib/styles.css";
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home/home';
import CategoryVideos from './pages/category_videos/category_videos';
import Contact from './pages/contact/contact';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Reset from './pages/reset/reset';
import Forgot from './pages/forgot/forgot';
import Channel from './pages/channel/channel';
import Video from './pages/video/video';
import Admin from './pages/admin/admin';
import Upload from './pages/upload/upload';
import Music from './pages/music/music';
import Talent from './pages/talent/talent';
import Comedy from './pages/comedy/comedy';
import Referral from './pages/referral/referral';
import Profile from './pages/profile/profile';
import EditProfile from './pages/edit_profile/edit_profile';
import Protected from './protected';
import SearchVideos from './pages/search/search';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset" component={Forgot} />
        <Route path="/reset-password" component={Reset} />
        <Route path="/contact" component={Contact} />
        <Route path="/channel/:uid" component={Channel} />
        <Route path="/category/:category" component={CategoryVideos} />
        <Route path="/search/:search" component={SearchVideos} />
        <Route path="/video-detail/:id" component={Video} />

        <Protected exact path='/profile' component={Profile} />
        <Protected exact path="/profile/edit" component={EditProfile} />

        <Protected path="/admin/home" component={Admin} />
        <Protected path="/admin/referral" component={Referral} />
        <Protected path="/admin/upload" component={Upload} />
        <Protected path="/admin/music" component={Music} />
        <Protected path="/admin/talent" component={Talent} />
        <Protected path="/admin/comedy" component={Comedy} />
      </BrowserRouter>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme={'dark'}
      />
    </>
  );
}

export default App;
