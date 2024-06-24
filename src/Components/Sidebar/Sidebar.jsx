import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'

export const Sidebar = () => {
    const[extended, Setextended] = useState(false)
    const{onSent, prevquery, setRecentquery} = useContext(Context)

const loadquery = async (query) => {
    setRecentquery(query)
    await onSent(query)
}
const newchat = () =>{
    window.location.reload();
}

  return (
    <div className={`Sidebar ${extended ? 'extended' : 'collapsed'}`}>
        <div className="top">
            <div className="menu-icon">
            <img onClick={() => Setextended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" srcset="" />
            </div>
            <div className="new-chat" onClick={newchat}>
                <img src={assets.plus_icon} alt="" srcset="" />
                {extended ? <p>New Chat</p> : null}
            </div>
            {extended ? <div className="recent">
                <p className="head">Recent</p>
                
                    {prevquery.slice().reverse().map((item, index)=>{
                        return(
                            <div onClick={() => loadquery(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" srcset="" />
                                <p>{item.slice(0,17)}...</p>
                             </div>
                        )
                    })}
                   
            </div> : null}
        </div>
        <div className="bottom">
            <div className="help">
                <img src={assets.question_icon} alt="" srcset="" />
                {extended ? <p>Help</p> : null}
            </div>
            <div className="activity">
                <img src={assets.history_icon} alt="" srcset="" />
                {extended ? <p>History</p> : null}
            </div>
            <div className="setting">
                <img src={assets.setting_icon} alt="" srcset="" />
                {extended ? <p>Setting</p> :null}
            </div>
        </div>
    </div>
  )
}
