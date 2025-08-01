import React from 'react'
import { assets } from '../../assets/assets'
import './Main.css'
import { Context } from '../../context/Context';
const Main = () => {
    const{onSent,recentPrompt,showResult,loading,resultData,input,setInput} = React.useContext(Context);
    
    return (
    <div className='main'>
        <div className="nav">
            <p>Gimini</p>
            <img src={assets.user_icon} alt=""/>
        </div>
        <div className="main-container">
            {
                !showResult 
                ?<>
                    <div className="greet">
                        <p><span>Hello, Dev.</span></p>
                        <p>How can I help you today ?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggest beautiful places to see on an upcoming road trip</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Briefly summerize this concept: urban planning</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Brainstrom team bonding activites for our work retreat</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Improve the readability of the following code</p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                </>
                : <div className="result">

                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                     {/* loading this.state.first */ }
                    {loading 
                    ?<div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                </div>

                </div>
            }
        </div>


        <div>
            <div className="main-botton">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter the Prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt=""  />
                        <img src={assets.mic_icon} alt="" />
                        {/* Corrected: Call onSent function */}
                        <img onClick={() => onSent()} src={assets.send_icon} alt=""  />
                    </div>
                </div>
                <p className='botton-info'>
                    Gemini may display inaccurate info, including about people,so double-click its responses. Your Privacy and Gemini App
                </p>
            </div>
        </div>
    </div>

  )
}

export default Main