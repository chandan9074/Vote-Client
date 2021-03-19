import './App.css';
import Home from './pages/homepage/home.jsx';
import Login from './pages/homepage/login.jsx';
import Signup from './pages/homepage/signup.jsx';
import Dashboard from './pages/dashboardpage/dashboard.jsx';
import PublicPoll from './pages/publicPollpage/publicpoll.jsx';
import PrivatePoll from './pages/privatePollpage/privatepolls.jsx';
import CreatePrivatePoll from './pages/privatePollpage/createPrivatepoll.jsx';
import CreatePublicPoll from './pages/publicPollpage/createPublicpoll.jsx';
import AllPublicPoll from './pages/publicPollpage/allPublicpoll.jsx';
import AllPrivatePoll from './pages/privatePollpage/allPrivatepoll.jsx';
import CheckPassword from './pages/privatePollpage/checkPassword.jsx';
import CollectPublicPollsData from './pages/publicPollpage/personalPublicPollResult/collectPublicPollsData.jsx';
import VotedPublicPollData from './pages/publicPollpage/votedPublicPollResult/votedPublicPollData.jsx';
import CollectPrivatePollsData from './pages/privatePollpage/personalPrivatePollResult/collectPrivatePollsData.jsx';
import VotedPrivatePollData from './pages/privatePollpage/votedPrivatePollResult/votedPrivatePollData.jsx';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />

        <Route path="/dashboard" exact render={(props) => <Dashboard {...props}/>} />

        <Route path="/dashboard/publicpoll" exact component={PublicPoll} />
        <Route path="/dashboard/publicpoll/createpublicpoll" exact component={CreatePublicPoll} />
        <Route path="/dashboard/publicpoll/allpublicpoll" exact component={AllPublicPoll} />
        <Route path="/dashboard/publicpoll/mypublicpollresult" exact component={CollectPublicPollsData} />
        <Route path="/dashboard/publicpoll/votedpublicpollresult" exact component={VotedPublicPollData} />

        <Route path="/dashboard/privatepoll" exact component={PrivatePoll} />
        <Route path="/dashboard/privatepoll/createprivatepoll" exact component={CreatePrivatePoll} />
        <Route path="/dashboard/publicpoll/allprivatepoll" exact component={AllPrivatePoll} />
        <Route path="/dashboard/publicpoll/checkprivatepassword/" exact component={CheckPassword} />
        <Route path="/dashboard/publicpoll/myprivatepollresult" exact component={CollectPrivatePollsData} />
        <Route path="/dashboard/publicpoll/votedprivatepollresult" exact component={VotedPrivatePollData} />

      </Switch>
    </Router>
  );
}

export default App;
