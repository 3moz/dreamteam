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

  var selectArea = document.getElementById('selectArea');

  var tableSelector = document.createElement('select');

  selectArea.appendChild(tableSelector);

  var tables = [
  'select data',
  'teams',
  'team_seasons',
  'players',
  'player_regular_seasons',
  'player_playoffs_career',
  'player_playoffs',
  'player_careers',
  'player_allstars',
  'drafts',
  'coaches',
  'coach_careers'
  ];

  tables.forEach(function(table){
    var option = document.createElement('option');
    option.setAttribute('value', table);
    option.setAttribute('label', table);
    tableSelector.appendChild(option);
  });

  tableSelector.addEventListener('change',function(){

    //selectArea.removeChild(statSelector);
    
    console.log(tableSelector.value);
    
    var statSelector = document.createElement('select');
    statSelector.setAttribute('id','statSelector');
    selectArea.appendChild(statSelector);

    var compareSelector = document.createElement('select');
    compareSelector.setAttribute('id','compareSelector');
    selectArea.appendChild(compareSelector);
    
    var statSelectorCreate = function(tableArr){
      
      selectArea.appendChild(statSelector);

      tableArr.forEach(function(column){
        var option = document.createElement('option');
        option.setAttribute('value', column);
        option.setAttribute('label', column);
        statSelector.appendChild(option);
      });
    }

    var compareSelectorCreate = function(){

      compareArr = ['<','>','='];

      selectArea.appendChild(compareSelector);
      
      compareArr.forEach(function(operation){
        var option = document.createElement('option');
        option.setAttribute('value', operation);
        option.setAttribute('label',operation);
        compareSelector.appendChild(option);
      });

    }

    if (tableSelector.value==='teams'){
      
      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      
      var table = [
      'team_code',
      'team_location',
      'team_name',
      'team_league'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();

    } else if (tableSelector.value==='players'){
      
      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      var table = [
      'player_code',
      'first_name',
      'last_name',
      'position',
      'firstseason',
      'lastseason',
      'h_feet',
      'h_inches',
      'weight',
      'college',
      'birthdate'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();  

    } else if (tableSelector.value==='team_seasons'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      var table = [
      'team_code',
      'year',
      'league',
      'o_fgm',
      'o_fga',
      'o_ftm',
      'o_fta',
      'o_oreb',
      'o_dreb',
      'o_asts',
      'o_pf',
      'o_stl',
      'o_to',
      'o_blk',
      'o_3pm',
      'o_3pa',
      '0_pts',
      'd_fgm',
      'd_fga',
      'd_ftm',
      'd_fta',
      'd_oreb',
      'd_dreb',
      'd_asts',
      'd_pf',
      'd_stl',
      'd_to',
      'd_blk',
      'd_3pm',
      'd_3pa',
      'd_pts',
      'pace',
      'won',
      'lost'
      ] 

      statSelectorCreate(table);
      compareSelectorCreate(); 

    } else if (tableSelector.value==='player_regular_seasons'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      table = [
      'player_code',
      'year',
      'firstname',
      'lastname',
      'team',
      'leag',
      'gp',
      'minutes',
      'pts',
      'oreb',
      'dreb',
      'reb',
      'asts',
      'stl',
      'blk',
      'turnover',
      'pf',
      'fga',
      'fgm',
      'fta',
      'ftm',
      'tpa',
      'tpm'
      ]

      statSelectorCreate(table);
      compareSelectorCreate(); 

    } else if (tableSelector.value==='player_playoffs_career'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      table = [
      'player_code',
      'firstname',
      'lastname',
      'leag',
      'pg',
      'minutes',
      'pts',
      'dreb',
      'oreb',
      'reb',
      'asts',
      'stl',
      'blk',
      'turnover',
      'pf',
      'fga',
      'fgm',
      'fta',
      'ftm',
      'tpa',
      'tpm'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();

    } else if (tableSelector.value==='player_playoffs'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      table = [
      'player_code',
      'year',
      'firstname',
      'lastname',
      'team',
      'leag',
      'gp',
      'minutes',
      'pts',
      'dreb',
      'oreb',
      'reb',
      'asts',
      'stl',
      'blk',
      'turnover',
      'pf',
      'fga',
      'fgm',
      'fta',
      'ftm',
      'tpa',
      'tpm'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();

    } else if (tableSelector.value==='player_careers'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      table = [
      'player_code',
      'firstname',
      'lastname',
      'leag',
      'gp',
      'minutes',
      'pts',
      'oreb',
      'dreb',
      'reb',
      'asts',
      'stl',
      'blk',
      'turnover',
      'pf',
      'fga',
      'fgm',
      'fta',
      'ftm',
      'tpa',
      'tpm'
      ]
      statSelectorCreate(table);
      compareSelectorCreate();

    } else if (tableSelector.value==='player_allstars'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      table = [
      'player_code',
      'year',
      'firstname',
      'lastname',
      'conference',
      'leag',
      'gp',
      'minutes',
      'pts',
      'dreb',
      'oreb',
      'reb',
      'asts',
      'stl',
      'blk',
      'turnover',
      'pf',
      'fga',
      'fgm',
      'fta',
      'ftm',
      'tpa',
      'tpm'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();

    } else if (tableSelector.value==='drafts'){
      
      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      table = [
      'draft_year',
      'draft_round',
      'selection',
      'team',
      'firstname','lastname',
      'player_code',
      'draft_from',
      'leag'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();

    } else if (tableSelector.value==='coaches'){
      
      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      table = [
      'coachid',
      'year',
      'yr_order',
      'firstname',
      'lastname',
      'season_win',
      'season_loss',
      'playoff_win',
      'playoff_loss',
      'team'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();

    } else if (tableSelector.value==='coach_careers'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();

      table = [
      'coachid',
      'firstname',
      'lastname',
      'season_win',
      'season_loss',
      'playoff_win',
      'playoff_loss'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();
      
    }else if (tableSelector.value==='select data'){
      document.getElementById('statSelector').remove();
      selectArea.removeChild(statSelector);
      document.getElementById('compareSelector').remove();
      selectArea.removeChild(compareSelector);
    }
//the following will create a new selector if val of 
//the table selector is 'teams', and the choices in that
//new selector will be the columns of the teams table,
//and that new selector will be appended to div selectArea.
//however, calling selectArea.removeChild(teamSelector)
//returns an error that seems to say that teamSelector is
//not a node. Why?
  

    // if (tableSelector.value === 'teams'){
    //   var statSelector = document.createElement('select');
    //   selectArea.appendChild(statSelector);

    //   teams.forEach(function(column){
    //     var option = document.createElement('option');
    //     option.setAttribute('value', column);
    //     option.setAttribute('label', column);
    //     statSelector.appendChild(option);
    //   });
    // } else if (tableSelector.value === 'players'){
    //   var statSelector = document.createElement('select');
    //   playerSelector.setAttribute('id','playerSelector')
    //   selectArea.appendChild(playerSelector);

    //   players.forEach(function(column){
    //     var option = document.createElement('option');
    //     option.setAttribute('value', column);
    //     option.setAttribute('label', column);
    //     playerSelector.appendChild(option);
    //   });
    // } else if (tableSelector.value === 'select data'){

    // }
    //need function to remove teamSelector 
    //(or any other dropdown created)
    //if value of selector changes
  


  });

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
        //11 other forEach parsings need to be written to handle
        //data coming back from the various table.
        //likely needing if statements.
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