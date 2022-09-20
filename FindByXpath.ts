import { FindByXpathInterface } from "./types/types";
import WebElements from "./types/WebElements";
import WebFunctions from "./types/WebFunctions";
import WebOperators from "./types/WebOperators";
import WebAttribute from "./types/WebAttribute";
import AddOperator from './AddOperator';
import BuildPredicate from "./BuildPredicate";
import WebAxes from "./types/WebAxes";

interface Selector {
  element: string,
  startBracket: string,
  predicates: string[],
  endBracket: string,
}

export const findByXpath = (parameters: FindByXpathInterface): string => {
  let returnedSelector: Selector = {
    element: '',
    startBracket: '[',
    predicates: [],
    endBracket: ']'
  };
  let axes: string = '';

  if (parameters.element === undefined) {
    returnedSelector.element = '//*';
  } else {
    returnedSelector.element = `//${parameters.element}`;
  }
 
  if(!Array.isArray(parameters.predicates)) {
      returnedSelector.predicates = [BuildPredicate(parameters.predicates)]
  } else {
    parameters.predicates.forEach((predicate, index) => {
      if(Array.isArray(parameters.predicates) && parameters.operators && parameters.predicates.length === parameters.operators.length + 1) {
        returnedSelector.predicates.push(BuildPredicate(predicate))
        if(index + 1 < (Array.isArray(parameters.predicates) ? parameters.predicates.length : 1)) {
          returnedSelector.predicates.push(parameters.operators![index])
        }
        
      } else {
        throw new Error(`For ${Array.isArray(parameters.predicates) ? parameters.predicates.length : ''} Predicates you need exactly ${Array.isArray(parameters.predicates) ? parameters.predicates.length - 1 : ''} operators`)
      }
      
    })
  }


  let returnedPredicate: string = '';
  returnedSelector.predicates.forEach((predicate, index) => returnedPredicate += (index === 0 ? "" : " ") + predicate);
  //ancestor::*
  if(parameters.axes) {
    axes = "/" + parameters.axes.webAxes + "::" + parameters.axes.axesElement
  }
  return `${parameters.parentElement ? parameters.parentElement : "" + returnedSelector.element + returnedSelector.startBracket + returnedPredicate + returnedSelector.endBracket + axes}`;
};
/*
console.log(findByXpath({
  element: WebElements.href, 
  predicates: [{  
    attribute: WebAttribute.text, 
    value: "Test", 
    functions: [WebFunctions.not],
  }, {  
    attribute: WebAttribute.id, 
    value: "navbarDropdownMenuLink1", 
  }],
  // parentElement: "//*", 
  operators: [WebOperators.and],
  axes: {webAxes: WebAxes.ancestor, axesElement: '*'}
}));
*/
const divLocator = findByXpath({
  element: WebElements.div, 
  predicates: { attribute: WebAttribute.text, value: "Test", functions: [WebFunctions.contains] },
});

const divLocator2 = findByXpath({
  element: WebElements.div, 
  predicates: [{ attribute: WebAttribute.text, value: "Test", functions: [WebFunctions.contains] },
               { attribute: WebAttribute.dataTestId, value: "Test" }],
  operators: [WebOperators.and],
});

console.log(divLocator);
console.log(divLocator2);
// npx ts-node src/foo.ts
