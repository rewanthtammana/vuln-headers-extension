// Contains event listeners to enable search filters on UI
// Add comments by explaining with a temporary module


// Handles CORS results
$("#corsMatchPattern").keyup((event) => {
  let matchingPattern = $("#corsMatchPattern").val();
  let exp = new RegExp(matchingPattern, 'i');
  
  Array.from($("#cors-list").children()).map(
    function(element) {
      if ((element.innerHTML).match(exp))
        element.className="display";
      else
        element.className="hidden";
      return element;
    }
  );
  
  $(".display").show();
  $(".hidden").hide();
});

// Handles Host Header Injection results
$("#hostHeaderMatchPattern").keyup((event) => {
  let matchingPattern = $("#hostHeaderMatchPattern").val();
  let exp = new RegExp(matchingPattern, 'i');
  
  Array.from($("#host-header-list").children()).map(
    function(element) {
      if ((element.innerHTML).match(exp))
        element.className="display";
      else
        element.className="hidden";
      return element;
    }
  );
  
  $(".display").show();
  $(".hidden").hide();
});

// Handles Clickjacking results
$("#clickjackingMatchPattern").keyup((event) => {
  let matchingPattern = $("#clickjackingMatchPattern").val();
  let exp = new RegExp(matchingPattern, 'i');
  
  Array.from($("#clickjacking-header-list").children()).map(
    function(element) {
      if ((element.innerHTML).match(exp))
        element.className="display";
      else
        element.className="hidden";
      return element;
    }
  );
  
  $(".display").show();
  $(".hidden").hide();
});

