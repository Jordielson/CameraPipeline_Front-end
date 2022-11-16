import { useEffect, useState, useRef, useCallback } from "react";

export function useStateCallback(initialState) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null); // init mutable ref container for callbacks
  
    const setStateCallback = useCallback((state, cb) => {
      cbRef.current = cb; // store current, passed callback in ref
      setState(state);
    }, []); // keep object reference stable, exactly like `useState`
  
    useEffect(() => {
      // cb.current is `null` on initial render, 
      // so we only invoke callback on state *updates*
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null; // reset callback after execution
      }
    }, [state]);
  
    return [state, setStateCallback];
}

export function ProgressBar (props) {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 1,
    width: '100%',
    backgroundColor: "#e0e0de",
    textAlign: 'left',
    justifyContent: 'left'
  }

  const fillerStyles = {
    height: '20%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    textAlign: 'center'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  );
};