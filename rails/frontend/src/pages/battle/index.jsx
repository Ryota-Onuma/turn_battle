import React, { useState, useEffect, useRef,useContext } from "react";
import Announce from "../../components/battle/announce"
import { odai_list } from "../../utils/odai_list";
import { renderImage } from "../../components/common"
import { renderBar } from "../../components/render-bar"
import "../../stylesheets/battle/battle.scss";
import Kawauso from "../../images/kawauso.png"
import { renderStatus, inBattle, cleard, gameOvered , setGameOver }  from "../../components/battle/status"
import { Store } from '../../stores/store'

const Battle = () => {
  const {state, dispatch} = useContext(Store)  
  const [IN_BATTLE, CLEARED, GAME_OVER] = [1,2,3]
  const [messages, setMessages] = useState([]);

  const [count, setCount] = useState(0);
  const [valid_text, setValidText] = useState([]);
  const [invalid_text, setInValidText] = useState([]);
  const [invalid_key, setInValidKey] = useState(false);
  const [odai_index, setOdaiIndex] = useState(0);
  const [odai, setOdai] = useState(odai_list[odai_index]);
  const [result, setResult] = useState(IN_BATTLE,);

  const valid_text_ref = useRef();
  valid_text_ref.current = valid_text; 

  const messages_ref = useRef()
  messages_ref.current = messages

  const odai_index_ref = useRef();
  odai_index_ref.current = odai_index; 

  const odai_ref = useRef(); 
  odai_ref.current = odai; 

  const result_ref = useRef();
  result_ref.current = result; 

  const count_ref = useRef(); 
  count_ref.current = count; 

  const name_ref = useRef(); 
  name_ref.current = state.user.name 

  useEffect(() => {
    document.addEventListener("keydown", handleTyping, false);
    dispatch({ type : 'setName' , name: "アヤノ"})
  }, []);
  
  useEffect(() => {
    setOdai(odai_list[odai_index_ref.current]);
    setInValidText(odai_list[odai_index_ref.current].roma_contents[0]);
    setValidText([]);
    if(count_ref.current >= 100) drainHp(20)
    setCount(0)
    const timer = setInterval(() => { countDown() },100)
    return () => clearInterval(timer) 
  }, [odai_index, result,state.user.name]);

  useEffect(() => {
    if(state.user.hp <= 0) {
      setResult(GAME_OVER);
    }
  }, [state.user.hp]);

  const handleTyping = (e) => {
    if (checkPushedKey(e.key) || cleard() || gameOvered()) return
    const usable_roma_str = checkValidInput([...valid_text_ref.current, e.key].join(""))
    if (usable_roma_str) {
      setInValidKey(false);
      setValidText([...valid_text_ref.current, e.key].join(""));
      let invalid =  usable_roma_str.slice(valid_text_ref.current.length)
      setInValidText(invalid);
      if (invalid.length === 0) {
        setInValidKey(false);
        nextOdai();
      }
    } else {
      drainHp(10)
      setInValidKey(true);
    }
  };

  const nextOdai = () => {
    if (odai_index_ref.current < odai_list.length - 1) {
      setInValidKey(false);
      setOdaiIndex(odai_index_ref.current + 1);
    } else {
      setInValidKey(false);
      setResult(CLEARED);
    }
  };

  const checkValidInput = (text) => {
    const inputed_text = text.split("")
    let content = null
    let should_stop = false
    let should_skip = false
   
    odai_ref.current.roma_contents.forEach((roma_content,i)=> {
      inputed_text.forEach((char,k) => {
        // 入力された文字列がローマ字並びに一致しなかったら、スキップフラグをたてる
        if (char !== roma_content.split("")[k]) should_skip = true
      })
      if(should_skip) {
        // 他のローマ字並びに一致するかを確かめるため、次のループへ
        should_skip = false
        return
      }
      if (!should_skip && !should_stop) {
        // 入力された文字列がローマ字並びに一致している場合は以後のループをしなくていいため
        content = roma_content
        should_stop  = true
      }
    })
    return content
  }

  const checkPushedKey = (key) => {
    if (key !== "Shift" && key !== "Meta") {
      return  false
    } else {
      return true
    }
  }

  const countDown = () => {
    if(count_ref.current  < 100 && inBattle()) {
      setCount(count_ref.current + 1)
    } else {
      setInValidKey(false);
      if(odai_index_ref.current < odai_list.length - 1 && !gameOvered()) {
        setOdaiIndex(odai_index_ref.current + 1);
      } else {
        setGameOver()
      }
    }
  }


  const renderGameStatus = () => {
    if(cleard() && !invalid_key){
      return  <div id="clear">クリアー！！🙌</div>
    }else if(gameOvered() && !invalid_key) {
      return  <div id="game-over">GAME OVER</div>
    }
  }

  const drainHp = (drain_hp_value) => {
    dispatch({ type : 'drainHp' ,drain_hp_value: drain_hp_value})
    if(state.user.hp >= 1) {
      const new_messages = [...messages_ref.current, name_ref.current + 'は' + drain_hp_value + 'ダメージを受けた'] 
      setMessages(new_messages)
    } else {
      const new_messages = [...messages_ref.current, name_ref.current + "はやられてしまった"] 
      setMessages(new_messages)
    }
  }

  return (
    <section id="battle">
      <div id="status">
        { renderStatus(state.user.hp,state.user.name) }
      </div>
      <div id="not-status">
        <div id="area"> 
        <div id="timer-container">
        { inBattle() ? <div id="bar"> { renderBar(count) } </div> : "" }
        </div>
          <div id="image-and-notify-area">
            <div id="img-container">
              { renderImage(Kawauso) }
            </div>
            <div id="notify-area">
              <div id="clear">{ renderGameStatus() }</div>
              <div id="invalid-key">{invalid_key && inBattle() ? "間違ったキーを押してるだぬ" : ""}</div>
            </div>
          </div>
          <div id="odai">{odai.full_content}</div>
          <div id="condition">
            <span id="valid">{valid_text}</span>
            <span id="invalid">{invalid_text}</span>
          </div>
        </div>
        <div id="announce-container">
          <Announce messages={messages_ref.current} />
        </div>
      </div>
    </section>
  );
};
export default Battle;
