// import { useState } from "react";
import { Route, Switch, Redirect } from "wouter";
import JobsPage from "./pages/jobs/jobs.page";

function App() {
    return (
        <>
            <Route path="/">
                <Redirect to="/jobs" />
            </Route>

            <Switch>
                <Route path="/jobs">
                    <JobsPage />
                </Route>

                <Route>404: No such page!</Route>
            </Switch>
        </>
    );
}

export default App;
