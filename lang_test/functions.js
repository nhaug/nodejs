// anonymArrowFunctions
const anonymArrowFunctions = (() => {
  return "invoked : anonymArrowFunctions"
});
console.log(anonymArrowFunctions());

// anonymArrowFunctionsRecursive
const anonymArrowFunctionsRecursive = (() => {
  return "invoked : anonymArrowFunctionsRecursive"
})();
console.log(anonymArrowFunctionsRecursive);

// anonymArrowFunctionsShort
const anonymArrowFunctionsShort = (() => "invoked : anonymArrowFunctionsShort");
console.log(anonymArrowFunctionsShort());

// anonymFunction
const anonymFunction = function() {
  return "invoked : anonymFunction";
}
console.log(anonymFunction());

// normalFunction
function normalFunction() {
  return "invoked : normalFunction";
}
console.log(normalFunction());
