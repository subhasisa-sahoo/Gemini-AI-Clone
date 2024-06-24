import { createContext, useState } from "react";
import runChart from "../config/api";

export const Context = createContext();
const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentquery, setRecentquery] = useState("");
    const [prevquery, setPrevquery] = useState([])
    const [showresult, setShowresult] = useState("");
    const [loading, setLoading] = useState(false);
    const [resdata, setResdata] = useState("");

    // TYPING EFFECT
    const typingEffect = (index, nextWord) => {
        setTimeout(function(){
            setResdata(prev => prev+nextWord);
        },5*index)
    }


    const onSent = async(query) => {
        
        setResdata("");
        setLoading(true);
        setShowresult(true);
        setRecentquery(input);
        setPrevquery(prev => [...prev,input]);
        const response = await runChart(input);
        
        let responseArr = response.split("**");
        let newResponse="";
        for( let i=0; i < responseArr.length; i++){
            if (i === 0 || i%2 !==1){
                newResponse += responseArr[i];
            }
            else{
                newResponse +=  "<b>" + responseArr[i] +"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split("");
        for (let i=0; i< newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            typingEffect(i, nextWord + "")
        }
        // setInput("");
        // setResdata(newResponseArray);
        setLoading(false);
    }



    const contextValue= {
        input, setInput,
        recentquery, setRecentquery,
        prevquery, setPrevquery,
        showresult,
        loading,
        resdata,
        onSent,
        typingEffect
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;