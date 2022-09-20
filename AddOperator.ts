const AddOperator = (parameters: {attribute: string, operator?: string, value: string}) => {
  if(parameters.operator) {
    return `${parameters.attribute} ${parameters.operator} "${parameters.value}"`
  } else { 
    return `${parameters.attribute} = "${parameters.value}"`
  }
}

export default AddOperator;