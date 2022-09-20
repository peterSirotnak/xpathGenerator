import WebElements from './WebElements'
import WebFunctions from './WebFunctions'
import WebAttribute from './WebAttribute';

export interface FindByXpathInterface {
  
  element?: WebElements | string;
  predicates: PredicateInterface[] | PredicateInterface;
  parentElement?: string;
  operators?: WebOperators[];
  axes?: {webAxes: WebAxes, axesElement: FindByXpathInterface | string;};
}

export interface PredicateInterface {
    attribute: WebAttribute | string;
    operator?: string;
    value: string;
    functions?: WebFunctions[];
}

