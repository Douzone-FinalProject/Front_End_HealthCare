import React, { useState } from "react"

const TestStateContext = React.createContext({
  resultData: [],
  setResultData: function(resultData) {this.resultData = resultData}
});

export function TestStateContextProvider(props) {
  const [resultData, setResultData] = useState([]);
  const value = {
    resultData: resultData,
    setResultData: setResultData
  }
  return (
    <TestStateContext.Provider value={value}>
      {props.children}
    </TestStateContext.Provider>
  )
}

export default TestStateContext;