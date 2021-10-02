import React from "react";
import "./App.scss";
import InputSearch from "./components/InputSearch/InputSearch";

function App(): JSX.Element {
    return (
        <main className="App">
            <header>
                <strong><a href="https://coub.com/vladimir.eisenhorn">Logo</a></strong>
                <p>Description</p>
            </header>
            <section>
                <InputSearch />
            </section>
        </main>
    );
}

export default App;
