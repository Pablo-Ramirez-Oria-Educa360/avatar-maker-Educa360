import React from "react";
import I18nContext from "./I18nContext";

export default function withStrings(Component) {
  const Wrapped = props => (
    <I18nContext.Consumer>
      {value => <Component {...props} {...value} />}
    </I18nContext.Consumer>
  );

  Wrapped.displayName = `withStrings(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
}
