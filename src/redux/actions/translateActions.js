import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../costants";

//  asenkron thunk aksiyonları
export const getLanguages = createAsyncThunk(
  "language/getLanguage",
  async () => {
    const res = await axios.request(languageOptions);

    return res.data.data.languages;
  }
);

export const translateText =
  // göndreliecek parametreyi belirle
  createAsyncThunk("translate/translateText", async (action_params) => {
    const { sourceLang, targetLang, text } = action_params;
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    // axios istediğini belirle
    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "142656263fmshc864e7cd7f94a1ep1eb00fjsn049788f51e8b",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };
    // isteği at
    const res = await axios.request(options);
    console.log(res.data.data.translatedText);
    return res.data.data.translatedText;
  });
