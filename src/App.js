import { Switch, Route, HashRouter } from "react-router-dom"
import PrivateRoute from "./components/Common/PrivateRoute"
import Login from "./components/Account/Login/Login"
import AuthLayout from "./layouts/AuthLayout"
import WebLayout from "./layouts/WebLayout"
import Register from "./components/Account/Register/Register"
import Dashboard from "./components/Dashboard/Dashboard"

import "jquery/dist/jquery.min.js"
//Datatable Modules
import "datatables.net/js/jquery.dataTables.min.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.print"
import ViewTrucker from "./components/ManageTruckers/ViewTrucker"
import ManageHistory from "./components/History/ManageHistory"
import ViewHistory from "./components/History/ViewHistory"
import ManageTruckers from "./components/ManageTruckers/ManageTruckers"
import AddNewTrucker from "./components/ManageTruckers/AddNewTrucker"
import EditTrucker from "./components/ManageTruckers/EditTrucker"
import ManageTrucks from "./components/ManageTrucks/ManageTrucks"
import AddNewTruck from "./components/ManageTrucks/AddNewTruck"
import EditTruck from "./components/ManageTrucks/EditTruck"
import ViewTruck from "./components/ManageTrucks/ViewTruck"
import ViewNotifications from "./components/Notifications/ViewNotifications"
import Profile from "./components/Profile/Profile"
import EditProfile from "./components/Profile/EditProfile"
import RecoveryEmail from "./components/Account/Register/RecoveryEmail"


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/account/:path?">
          <AuthLayout>
            <Switch>
              <Route path={"/account/login"} exact component={Login} />
              <Route path={"/account/register"} component={Register} />
              <Route path="/account/RecoveryEmail" component={RecoveryEmail} />
            </Switch>
          </AuthLayout>
        </Route>
        {/* <Route> */}
        <Route>
          <WebLayout>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/ManageTruckers" component={ManageTruckers} />
              <PrivateRoute path="/EditTrucker/:driverId" component={EditTrucker} />
              <PrivateRoute path="/ViewTrucker/:driverId" component={ViewTrucker} />
              <PrivateRoute path="/AddNewTrucker" component={AddNewTrucker} />
              <PrivateRoute path="/ManageHistory" component={ManageHistory} />
              <PrivateRoute path="/ViewHistory" component={ViewHistory} />
              <PrivateRoute path="/ManageTrucks" component={ManageTrucks} />
              <PrivateRoute path="/AddNewTruck" component={AddNewTruck} />
              <PrivateRoute path="/EditTruck" component={EditTruck} />
              <PrivateRoute path="/ViewTruck" component={ViewTruck} />
              <PrivateRoute path="/ViewNotifications" component={ViewNotifications} />
              <PrivateRoute path="/Profile" component={Profile} />
              <PrivateRoute path="/EditProfile" component={EditProfile} /> 
            </Switch>
          </WebLayout>
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default App
