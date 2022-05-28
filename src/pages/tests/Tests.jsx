import React from 'react'
import s from "./tests.module.css"

import {Link} from "react-router-dom"

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TestsFeed from '../../components/testsFeed/TestsFeed';

function Tests() {
  return (
    <>
      <Topbar />
      <div className={s.container}>
        <div className={s.sidebarWrapper}>
          <Sidebar />
        </div>
        <div className={s.mainPart}>
          
        </div>
        <div className={s.feedWrapper}>
          <TestsFeed />
        </div>
        <div className={s.rightbarWrapper}>
          <div className={s.mytest}>
            <h6 className={s.creationtitle}>Создать свой тест?</h6>
            <Link to="/test/creation" className={s.creationlink}>Создать</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tests