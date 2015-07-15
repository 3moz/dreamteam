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
  tableSelector.setAttribute('id','tableSelector');

  selectArea.appendChild(tableSelector);

  var tables = [
  'select data',
  'teams',
  'team_seasons',
  'players',
  'player_regular_seasons',
  'player_playoffs_careers',
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

    var valChoiceSelector = document.createElement('select');
    valChoiceSelector.setAttribute('id','valChoiceSelector');
    selectArea.appendChild(valChoiceSelector);
    

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

      compareArr = ['choose operation','<','>','='];

      selectArea.appendChild(compareSelector);
      
      compareArr.forEach(function(operation){
        var option = document.createElement('option');
        option.setAttribute('value', operation);
        option.setAttribute('label',operation);
        compareSelector.appendChild(option);
      });

    }

    var valChoiceSelectorCreate = function(){

      //this will take the value of tableSelector (table) and statSelector.value, and
      //make an ajax request to 'select * from [table]' and then
      //with the resulting data, obtain a list of possible values under the column of
      //[metric] - these will be the possibilities to choose from in the last drop-down.
      selectArea.appendChild(valChoiceSelector);

      statSelector.addEventListener('change', function(){

        table = tableSelector.value;
        
        valueChoicesArr = [];
        valChoiceSelector.innerHTML = '';
        

        var xhr = new XMLHttpRequest
        xhr.open('GET', location.origin+'/'+table+'.json');
        xhr.addEventListener('load', function(){
          
          response = JSON.parse(xhr.responseText);//JSON object of all returned records

          metric = statSelector.value;

          for (var i = 0; i < response.length; i++){
            valueChoicesArr.push(response[i][metric]);
          }

          uniqifiedValues = valueChoicesArr.filter(function(val, i, valueChoicesArr){
            return valueChoicesArr.indexOf(val)===i;
          });//returns an array of unique values from valueChoicesArr
           
          //define how two numeric elements will be compared in order for the uniqified array to be sorted 
          function compare(a,b){
            return a-b;
          }

          if (typeof(uniqifiedValues[0])==='string'){
            sortedUniqVals = uniqifiedValues.sort();
          } else if (typeof(uniqifiedValues[0])==='number'){
            sortedUniqVals = uniqifiedValues.sort(compare);
          } 

          //.sort(compare) sorts numerical vals in an array according to compare (line 126)
          //.sort() sorts string according to ascii value of chars. 

          console.log(valueChoicesArr); //all vals from db call, unsorted
          console.log(valueChoicesArr.length+" total returned choices");
          console.log(sortedUniqVals); //unique, sorted vals from db call --> placed in dropdown
          console.log(sortedUniqVals.length+" unique choices sorted"); 
          
          //the above returns an array of unique, sorted values contained in the [metric] keys of [table]
          //these will populate the value selector drop-down, below

          selectArea.appendChild(valChoiceSelector);
          
          sortedUniqVals.forEach(function(valChoice){
            var option = document.createElement('option');
            option.setAttribute('value', valChoice);
            option.setAttribute('label', valChoice);
            valChoiceSelector.appendChild(option);
          });

        });

        xhr.send();

      });
    }

    var clearDropDowns = function(){
      document.getElementById('statSelector').remove();
      selectArea.removeChild(statSelector);
      document.getElementById('compareSelector').remove();
      selectArea.removeChild(compareSelector);
      document.getElementById('valChoiceSelector').remove();
      selectArea.removeChild(valChoiceSelector);
    }

    if (tableSelector.value==='teams'){
      
      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      


      var table = [
      'select metric',
      'team_code',
      'team_location',
      'team_name',
      'team_league'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();
      valChoiceSelectorCreate();

    } else if (tableSelector.value==='players'){
      
      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      
      
      var table = [
      'select metric',
      'player_code',
      'first_name',
      'last_name',
      'position',
      'first_season',
      'last_season',
      'height_ft',
      'height_in',
      'weight',
      'school',
      'b_day'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();
      valChoiceSelectorCreate();  

    } else if (tableSelector.value==='team_seasons'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      

      var table = [
      'select metric',
      'team_code',
      'year',
      'team_league',
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
      'o_pts',
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
      valChoiceSelectorCreate(); 

    } else if (tableSelector.value==='player_regular_seasons'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      

      table = [
      'select metric',
      'player_code',
      'year',
      'first_name',
      'last_name',
      'team',
      'league',
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
      valChoiceSelectorCreate();  

    } else if (tableSelector.value==='player_playoffs_careers'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      

      table = [
      'select metric',
      'player_code',
      'first_name',
      'last_name',
      'player_league',
      'gp',
      'minutes',
      'pts',
      'drb',
      'orb',
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
      valChoiceSelectorCreate(); 

    } else if (tableSelector.value==='player_playoffs'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      

      table = [
      'select metric',
      'player_code',
      'year',
      'first_name',
      'last_name',
      'player_team',
      'player_league',
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
      valChoiceSelectorCreate();

    } else if (tableSelector.value==='player_careers'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      

      table = [
      'select metric',
      'player_code',
      'first_name',
      'last_name',
      'player_league',
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
      valChoiceSelectorCreate();

    } else if (tableSelector.value==='player_allstars'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      

      table = [
      'select metric',
      'player_code',
      'year',
      'first_name',
      'last_name',
      'conference',
      'player_league',
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
      valChoiceSelectorCreate();

    } else if (tableSelector.value==='drafts'){
      
      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      

      table = [
      'select metric',
      'draft_year',
      'draft_round',
      'selection',
      'team',
      'first_name',
      'last_name',
      'player_code',
      'drafted_from',
      'league'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();
      valChoiceSelectorCreate();

    } else if (tableSelector.value==='coaches'){
      
      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      

      table = [
      'select metric',
      'coach_code',
      'year',
      'yr_order',
      'first_name',
      'last_name',
      'season_win',
      'season_loss',
      'playoff_win',
      'playoff_loss',
      'team'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();
      valChoiceSelectorCreate();

    } else if (tableSelector.value==='coach_careers'){

      document.getElementById('statSelector').remove();
      document.getElementById('compareSelector').remove();
      document.getElementById('valChoiceSelector').remove();
      

      table = [
      'select metric',
      'coach_code',
      'first_name',
      'last_name',
      'season_win',
      'season_loss',
      'playoff_win',
      'playoff_loss'
      ]

      statSelectorCreate(table);
      compareSelectorCreate();
      valChoiceSelectorCreate();

    } else if (tableSelector.value==='select data'){
      
      clearDropDowns();
    } 
  });

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