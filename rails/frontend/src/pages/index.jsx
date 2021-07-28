import React from "react";
import Battle from "./battle/index";
import "../stylesheets/common/application.scss"
import { Provider } from '../stores/store'
const Index = () => {
  return (
    <Provider>
      <main>
        <Battle />
      </main>
    </Provider>
  );
};

export default Index;
