import { PredicateInterface } from "./types/types";
import WebFunctions from "./types/WebFunctions";

const BuildPredicate =  (predicate: PredicateInterface) => {
  let returnedSelector = '';

  if (predicate.functions && predicate.functions?.length > 0) {
    predicate.functions.forEach((xpathFunction) => {
      switch(xpathFunction) { 
        case WebFunctions.contains: { 
          if(returnedSelector.length === 0) {
            returnedSelector = `contains(${predicate.attribute}, "${predicate.value}")`;  
          } else {
            throw new Error("Contains has to be first function.");
          }
          break; 
        } 
        case WebFunctions.not: { 
          if(returnedSelector.length === 0) {
            returnedSelector = `not(${handleBuildPredicate(predicate)})`;
          } else {
            returnedSelector = `not(${returnedSelector})`;
          }
          break; 
        } 
        default: { 
          break; 
        } 
      } 
    });
    
  } else {
    returnedSelector += handleBuildPredicate(predicate);
  }
  return returnedSelector;
}
const handleBuildPredicate = (predicate: PredicateInterface):string => {
  if(predicate.operator) {
    return `${predicate.attribute} ${predicate.operator} "${predicate.value}"`
  } else {
    return `${predicate.attribute} = "${predicate.value}"`
  }
}
export default BuildPredicate;