import React from "react";
import s from "./testnav.module.css";

function Testnav(props) {
  return (
    <div className={s.navigationgrid}>
      {props.test?.questions?.map((question, index) => (
        <a href={`#question${index}`}>
          <div className={s.navelement}>{index}</div>
        </a>
      ))}
    </div>
  );
}

export default Testnav;
