import React from "react";

function Auth({ field, child : Child, ...others }) {
  console.info(field);
  return <div>
    <Child {...others} />
  </div>
}


export default Auth;
