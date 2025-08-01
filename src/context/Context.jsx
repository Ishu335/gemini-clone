
import { createContext, useState } from "react";
import runChat from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Typing effect function
    const delayPara = (index, nextWord) => {
    setTimeout(() => {
        setResultData((prev) => prev + nextWord);
    }, 75 * index);
    };

    const onSent = async (prompt) => { // 'prompt' parameter is redundant if you're using 'input' state
        setResultData("");
        setLoading(true);
        setShowResult(true);
        // setPrevPrompt(prev => [...prev, input]); // Add current input to previous prompts
        // Add current input to previous prompts only if it's not empty
        if (input.trim() !== "") {
            setRecentPrompt(input);
            setPrevPrompt((prev) => [...prev, input]);
        }
        
        const response = await runChat(input);
        
        // Process response for bold tags
        let responseArray = response.split("**");
        let newResponse2 = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse2 += responseArray[i];
            } else {
                newResponse2 += "<b>" + responseArray[i] + "</b>";
            }
        }
        
        // Process for new lines
        let finalResponse = newResponse2.split("*").join("<br/>");

        // Typing effect - split the final response by words to animate
        // This will now correctly include the HTML tags for styling
        let newResponseArray = finalResponse.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " "); // Add a space back after each word
        }

        // Set the full result after the typing effect has started or if you want it immediately visible
        // If you want the typing effect to build the final string, you should NOT set the full string here.
        // Instead, the delayPara should be the sole updater of setResultData.
        // For a typing effect, typically you would not set the whole resultData at once after the loop.
        // If the intention is for `delayPara` to build the string, then `setResultData(finalResponse)` here would override it.
        // Let's assume you want the typing effect to be the source of truth for resultData.
        // So, we will remove `setResultData(finalResponse);` from here.

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;


