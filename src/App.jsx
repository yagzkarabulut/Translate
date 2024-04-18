import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateActions";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Loader from "./components/Loader";
import { updateText } from "./redux/slices/translateSlice";
const App = () => {
  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);
  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [text, setText] = useState();

  const dispatch = useDispatch();

  // değişme fonksiyonu
  const handleChange = () => {
    // select alanlarındaki değerleri değiştir
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    // inputlardaki textlerin yerini değiştir
    setText(translateState.text);
    // sliceda tutualn veriyi güncelleme
    dispatch(updateText(text));
  };

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages]
  );
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className="bg-slate-800 grid place-items-center h-screen w-screen text-white">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">Çeviri +</h1>
        {/* üst alan */}
        <div className="flex gap-2 text-black">
          <Select
            value={sourceLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            onChange={setSourceLang}
            className="flex-1"
            options={formatted}
          />

          <button
            onClick={handleChange}
            className="py-[6px] px-6 rounded transition hover:ring-1 hover:bg-slate-600  bg-slate-500 text-white"
          >
            Değiş
          </button>

          <Select
            value={targetLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            onChange={setTargetLang}
            className="flex-1"
            options={formatted}
          />
        </div>
        {/* text alanı */}
        <div className=" flex mt-5 gap-[105px] max-md:flex-col max-md:gap-3 text-black">
          <div className=" flex-1 ">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className=" w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded  "
            />
          </div>
          <div className=" flex-1 relative ">
            <textarea
              value={translateState.text}
              disabled
              className=" w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded  "
            />
            {translateState.isLoading && <Loader />}
          </div>
        </div>

        {/* buton */}
        <button
          onClick={() => {
            dispatch(translateText({ sourceLang, targetLang, text }));
          }}
          className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-slate-500 mt-3 hover:ring-2 hover:bg-slate-600 transition  "
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
