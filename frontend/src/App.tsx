import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Input from "./components/common/Input";

function App() {
  return (
    <div className="App">
      <Input placeholder="안녕하세요." width={200} size="md" />
    </div>
  );
}

export default App;
