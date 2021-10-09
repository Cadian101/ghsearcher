import React from "react";
import "./App.scss";
import InputSearch from "./components/InputSearch/InputSearch";
import SearchStuff from "./components/SearchStuff/SearchStuff";

function App(): JSX.Element {
    return (
        <main className="App">
            <header className="header">
                <strong className="logo"><a className="logo__link" href="https://spark.adobe.com/express-apps/logo-maker/">Logo</a></strong>
                <p className="description">GitHub public repos search</p>
            </header>
            <div className="main-content">
                <aside className="main-content__aside">
                    <InputSearch />
                </aside>
                <article className="main-content__results">
                    <SearchStuff />
                </article>
            </div>
        </main>
    );
}

export default App;
