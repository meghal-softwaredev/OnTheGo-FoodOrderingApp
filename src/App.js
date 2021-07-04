import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RestaurantList from "./components/RestaurantList";
import Restaurant from "./components/Restaurant";
import Login from "./components/Login";

const App = () => {
return(
    <div>
    <Router>
     <Switch>
        <Route path="/restaurant/tag/:tag" exact component={RestaurantList} />
        <Route path="/restaurant/:id" exact component={RestaurantList} />
        <Route path="/restaurant/photo/:id" exact component={Restaurant} />
        <Route path="/restaurant" exact component={RestaurantList} />
        <Route path="/" exact component={Login} />
        </Switch>
    </Router>
  </div>
);
}
export default App;
