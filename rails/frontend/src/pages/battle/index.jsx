import React, { useState, useEffect, useRef } from "react";
import { generateRomanWords } from "../../plugins/battle/convert"
import "../../stylesheets/battle/battle.scss";
const Battle = () => {
  const [valid_text, setValidText] = useState([]);
  const [invalid_text, setInValidText] = useState([]);
  const [is_clear, setIsClear] = useState(false);
  const [invalid_key, setInValidKey] = useState(false);
  const odai_list = [
    {
      full_content: "あやの",
      roma_contents: generateRomanWords("あやの")
    },
    {
      full_content: "りょうた",
      roma_contents: generateRomanWords("りょうた")
    },
    {
      full_content: "あんずるよりうむがやすし",
      roma_contents: generateRomanWords("あんずるよりうむがやすし")
    },
    {
      full_content: "いしばしをたたいてわたる",
      roma_contents: generateRomanWords("いしばしをたたいてわたる")
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
    setInValidText(odai_list[odai_index_ref.current].roma_contents[0]);
    setValidText([]);
  }, [odai_index]);

  const handleTyping = (e) => {
    if (checkPushedKey(e.key)) return
    
    const usable_roma_str = checkValidInput([...valid_text_ref.current, e.key].join(""))

    if ( usable_roma_str) {
      setInValidKey(false);
      setIsClear(false);
      setValidText([...valid_text_ref.current, e.key].join(""));
      let invalid =  usable_roma_str.slice(valid_text_ref.current.length)
      setInValidText(invalid);
      if (invalid.length === 0) {
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

  return (
    <section id="battle">
      <div id="area">
        <div id="notify-area">
          <div id="clear">{is_clear && !invalid_key ? "クリアー！！🙌" : ""}</div>
          <div id="invalid-key">{invalid_key ? "間違ったキーを押してるだぬ" : ""}</div>
        </div>
        <div id="odai">{odai.full_content}</div>
        <div id="condition">
          <span id="valid">{valid_text}</span>
          <span id="invalid">{invalid_text}</span>
        </div>
      </div>
    </section>
  );
};
export default Battle;
