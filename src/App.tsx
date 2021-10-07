import React from "react";
import "./App.scss";
import InputSearch from "./components/InputSearch/InputSearch";
import SearchStuff from "./components/SearchStuff/SearchStuff";

function App(): JSX.Element {
    return (
        <main className="App">
            <header className="header">
                <strong><a href="https://spark.adobe.com/express-apps/logo-maker/">Logo</a></strong>
                <p>Description</p>
            </header>
            <InputSearch />
            <SearchStuff />
        </main>
    );
}

export default App;
