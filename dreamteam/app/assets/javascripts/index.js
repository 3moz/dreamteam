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

  // var tableSelect = document.getElementById('tableSelect');

  // var allTables =
  // ['teams',
  // 'team_seasons',
  // 'players',
  // 'player_regular_seasons',
  // 'player_playoffs_careers',
  // 'player_playoffs',
  // 'player_careers',
  // 'player_allstars',
  // 'drafts',
  // 'coaches',
  // 'coach_careers'];

  // allTables.forEach(function(item){
  //   var option = document.createElement('option');
  //   option.setAttribute('value',item);
  //   option.setAttribute('label',item);
  //   tableSelect.appendChild(option);
  // });

  // var team_seasonSelect = document.getElementById('team_seasonSelect')

  // var allTeamSeasons = 
  // ['year',
  // 'team_league',
  // 'o_fgm',
  // 'o_fga',
  // 'o_ftm',
  // 'o_fta',
  // 'o_oreb',
  // 'o_dreb',
  // 'o_reb',
  // 'o_asts',
  // 'o_pf',
  // 'o_stl',
  // 'o_to',
  // 'o_to',
  // 'o_blk',
  // 'o_3pm',
  // 'o_3pa',
  // 'o_pts',
  // 'd_fgm',
  // 'd_fga',
  // 'd_ftm',
  // 'd_fta',
  // 'd_oreb',
  // 'd_dreb',
  // 'd_reb',
  // 'd_asts',
  // 'd_pf',
  // 'd_stl',
  // 'd_to',
  // 'd_to',
  // 'd_blk',
  // 'd_3pm',
  // 'd_3pa',
  // 'd_pts',
  // 'pace',
  // 'won',
  // 'lost'];

  // allTeamSeasons.forEach(function(item){
  //   var option = document.createElement('option');
  //   option.setAttribute('value',item);
  //   option.setAttribute('label',item);
  //   team_seasonSelect.appendChild(option);
  // });

  // var yearSelect = document.getElementById('yearSelect')

  // var allYears = []
  // for (var i = 1946; i<2010; i++){
  //   allYears.push(i);
  // }

  // allYears.forEach(function(item){
  //   var option = document.createElement('option');
  //   option.setAttribute('value',item);
  //   option.setAttribute('label',item);
  //   yearSelect.appendChild(option);
  // });

  // var dropDownSubmit = document.getElementById('dropDownSubmit');
  // dropDownSubmit.addEventListener('click', function(){
  //   var params = JSON.stringify([tableSelect.value, team_seasonSelect.value, yearSelect.value]);
  //   console.log(params);
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('POST', location.origin+'/comparisons');
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.addEventListener('load', function(){
  //     console.log(xhr.responseText);
  //   });
  //   xhr.send(params);
  // });

  

 var addAllComps = function(){//function to add saved comparisons to the side list 
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', location.origin+'/comparisons.json');
    
    xhr.addEventListener('load', function(){
      
      console.log(JSON.stringify(xhr.responseText));
    
      var comps = JSON.parse(xhr.responseText);
        
      console.log(comps);
      

      comps.forEach(function(comp){
        console.log(comp)
        
        addComp(comp.id, comp.search);

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
    
    console.log(targetNode.id.substring(4));//noting the ID number of deleted comp
    removeVisual('vis'+targetNode.id.substring(4));//remove visual from main panel

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

  var visualizeComp = function(comp, id){
  //on checkbox check or comp create, add visual to main panel

    vizDiv = document.getElementById('visuals')//visuals panel

    var xhr = new XMLHttpRequest();
    //user params GET, JSON.stringify({object with params (team)})

      xhr.open('GET', location.origin+'/'+comp);
      xhr.addEventListener('load', function(){
        var data = JSON.parse(xhr.responseText);

        console.log(data)

        var dataArr = [];
        data.forEach(function(team){
          dataArr.push(team.team_location+' '+team.team_name)
        });
        visual = document.createElement('li')
        //setting id as, for instance, 'vis20', with id number passed in
        visual.setAttribute('id', 'vis'+id)
        visual.innerHTML = dataArr 
        $(vizDiv).prepend($(visual));
      });
      xhr.send();
    }

    var removeVisual = function(id){

      target = document.getElementById(id);
      $(target).toggle();
    }

    var reAddVisual = function(id){

      target = document.getElementById(id);
      $(target).toggle();
    }

    var setLiToComp = function(li, comp){
    //here must be built the dropdowns to create the query string
    //this string will be saved as 'comp', including the route to
    //the correct controller
    li.innerHTML = comp;
    var compCheck = document.createElement('input');
    compCheck.type = 'checkbox';
    compCheck.checked = true;

    
    
    visualizeComp(comp, li.id.substring(4));

    compCheck.addEventListener('change', function(){
      if (compCheck.checked){
        reAddVisual('vis'+li.id.substring(4));
      }else{ //if compCheck.unchecked
        removeVisual('vis'+li.id.substring(4));
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