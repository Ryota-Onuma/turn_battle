import React, { useState, useEffect, useRef } from "react";
import { kanaToRoman } from "../../plugins/battle/convert"
import "../../stylesheets/battle/battle.scss";
const Battle = () => {
  const [valid_text, setValidText] = useState([]);
  const [invalid_text, setInValidText] = useState([]);
  const [is_clear, setIsClear] = useState(false);
  const [invalid_key, setInValidKey] = useState(false);
  const odai_list = [
    {
      full_content: "あやの",
      roma_content: "ayanonakajima" 
    },
    {
      full_content: "りょうた",
      roma_content: "ryotaonuma" 
    },
    {
      full_content: "あんずるよりうむがやすし",
      roma_content: "annzuruyoriumugayasushi" 
    },
    {
      full_content: "いしばしをたたいてわたる",
      roma_content: "ishibashiwotataitewataru" 
    },
  ];
  const [odai_index, setOdaiIndex] = useState(0);
  const [odai, setOdai] = useState(odai_list[odai_index]);

  const valid_text_ref = useRef();
  valid_text_ref.current = valid_text; 

  const odai_index_ref = useRef();
  odai_index_ref.current = odai_index; 

  const odai_ref = useRef(); 
  odai_ref.current = odai; 

  useEffect(() => {
    document.addEventListener("keydown", handleTyping, false);
  }, []);

  useEffect(() => {
    setOdai(odai_list[odai_index_ref.current]);
    setInValidText(odai_list[odai_index_ref.current].roma_content.split(""));
    setValidText([]);
  }, [odai_index]);

  const handleTyping = (e) => {
    if (checkPushedKey(e.key)) return
    const spilited_odai = odai_ref.current.roma_content.split(""); // ["h","o","g","e"]
    const valid_text_copy = [...valid_text_ref.current.slice(), e.key];
  
    if (spilited_odai[valid_text_copy.length - 1] === valid_text_copy[valid_text_copy.length - 1]) {
      setInValidKey(false);
      setIsClear(false);
      setValidText(valid_text_copy);
      spilited_odai.splice(0, valid_text_copy.length);
      setInValidText(spilited_odai);
      if (spilited_odai.length === 0) {
        setInValidKey(false);
        nextOdai();
      }
    } else {
      setIsClear(false);
      setInValidKey(true);
    }
  };

  const nextOdai = () => {
    if (odai_index_ref.current < odai_list.length - 1) {
      setInValidKey(false);
      setOdaiIndex(odai_index_ref.current + 1);
    } else {
      setInValidKey(false);
      setIsClear(true);
    }
  };

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const checkPushedKey = (key) => {
    console.log(key)
    if (key !== "Shift" && key !== "Meta") {
      return  false
    } else {
      return true
    }
  }

  return (
    <section id="battle">
      <div id="area">
        <div id="notify-area">
          <div id="clear">{is_clear && !invalid_key ? "クリアー！！🙌" : ""}</div>
          <div id="invalid-key">{invalid_key ? "間違ったキーを押してるだぬ" : ""}</div>
        </div>
        <div id="odai">{odai.full_content}</div>
        <div>{kanaToRoman(odai.full_content)}</div>
        <div id="condition">
          <span id="valid">{valid_text}</span>
          <span id="invalid">{invalid_text}</span>
        </div>
      </div>
    </section>
  );
};
export default Battle;
