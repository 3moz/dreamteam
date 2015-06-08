document.addEventListener('DOMContentLoaded', function(){  
  var id;
  
  var getId = function(){ //obtain current user ID from session
    var xhr = new XMLHttpRequest();
    xhr.open('GET', location.origin+'/session');
    xhr.addEventListener('load', function(){
      var user = JSON.parse(xhr.responseText);
      id = user.id;
      addAllComps();
    });
    xhr.send();
  }

  getId();

  var addAllComps = function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', location.origin+'/comparisons.json');
    xhr.addEventListener('load', function(){
      var comps = JSON.parse(xhr.responseText);
      comps.forEach(function(comp){
        addComp(comp.id, comp.search);
        //obtainData(comp.search);
      });
    });
    xhr.send();
  }

  // var obtainData = function(compSearch){//run DB query using input string from comp 
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('get', location.origin+'/comparisons.json');
  //   xhr.addEventListener('load', function(){
  //     var comps = JSON.parse(xhr.responseText);
  //     comps.for
  //   })
  // }

  var deleteComp = function(){
    
    var targetNode = document.getElementById(this.parentNode.id);
    
    console.log(targetNode.id.substring(4));//noting the ID of deleted comp

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', location.origin+'/comparisons/'+targetNode.id.substring(4));
    xhr.addEventListener('load', function(){
      if(JSON.parse(xhr.status === 200)){
        compList.removeChild(targetNode);//remove from DOM
      }
    });
    xhr.send();
  }

  var addComp = function(id, comp){
    var li = document.createElement('li');
    li.setAttribute('id','comp'+id)
    setLiToComp(li, comp);
    var ul = document.getElementById('compList');
    $(ul).prepend(li);
  }

  var setLiToComp = function(li, comp){
    //here must be built the dropdowns to create the query string
    //this string will be saved as 'comp', including the route to
    //the correct controller
    li.innerHTML = comp;
    var compCheck = document.createElement('input');
    compCheck.type = 'checkbox';
    compCheck.checked = true;
  
    compCheck.addEventListener('change', function(){
      if (compCheck.checked){
        //make a DB query using comp string and do stuff in the main section
        //with the data that is returned
        //using D3
        //also, assign a DOM id (corresponding to the comparison's
        //unique ID from the DB) to the visualization 
        //for when it needs to be removed from the DOM.
        var xhr = new XMLHttpRequest();
        xhr.open('GET', location.origin+'/'+comp);


      }else{ //if compCheck.unchecked

      //remove this comparison from the DOM in the main section
      //using .removechild and the node id of the visualization.

      }
    });
      
    $(li).prepend(compCheck);

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Remove'
    $(deleteButton).addClass("deleteComp");
    deleteButton.addEventListener('click', deleteComp);
    li.appendChild(deleteButton);

    


  }//ending of setLiToComp






    
  













});