  document.addEventListener('DOMContentLoaded', function(){  
    var id;

  var getId = function(){ //obtain current user ID from session
    var xhr = new XMLHttpRequest();
    xhr.open('GET', location.origin+'/session');
    xhr.addEventListener('load', function(){
      var user = JSON.parse(xhr.responseText);
      id = user.id;
      // addAllComps();
    });
    xhr.send();
  }

  getId();

  var selectArea = document.getElementById('selectArea');

  var tableSelector = document.createElement('select');
  tableSelector.setAttribute('id','tableSelector');

  selectArea.appendChild(tableSelector);

  var visArea = document.getElementById('visArea');

  var visButton = document.createElement('button');
  visButton.innerHTML = "Visualize";
  visArea.appendChild(visButton);
  visButton.setAttribute('disabled', true);
  


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

  tableSelector.addEventListener('change', function(){

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

        if (statSelector.value ==='select metric'){
          valChoiceSelector.innerHTML = '';
          visButtonValuesChecker();
        } else {

          visButtonValuesChecker();

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

        }
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

  var visButtonValuesChecker = function(){

    console.log('vis button val checker is hit');

    if (
      (statSelector.value && statSelector.value !== 'select metric') &&  
      (compareSelector.value && compareSelector.value !== 'choose operation') 
      ) {
        visButton.removeAttribute('disabled');
        console.log('vis button active');
      } else if (
          statSelector.value === 'select metric' ||
          compareSelector.value === 'choose operation'
          ) {
        visButton.setAttribute('disabled',true);
        console.log('vis button inactive');
      }

  }

  compareSelector.addEventListener('change',function(){
    visButtonValuesChecker();
  });

  if (tableSelector.value==='teams'){

    document.getElementById('statSelector').remove();
    document.getElementById('compareSelector').remove();
    document.getElementById('valChoiceSelector').remove();
    visButton.setAttribute('disabled', true);      


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
    visButton.setAttribute('disabled', true);



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
    visButton.setAttribute('disabled', true);



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
    visButton.setAttribute('disabled', true);



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
    visButton.setAttribute('disabled', true);



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
    visButton.setAttribute('disabled', true);



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
    visButton.setAttribute('disabled', true);



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
    visButton.setAttribute('disabled', true);



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
    visButton.setAttribute('disabled', true);



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
    visButton.setAttribute('disabled', true);



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
    visButton.setAttribute('disabled', true);


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

    visButton.setAttribute('disabled', true);
    clearDropDowns();

  } 
});

///////////************below is what happens after the visualization button is hit***********///////////////////

visButton.addEventListener('click', function(){

  tableSelector = document.getElementById('tableSelector');

  console.log('vis button hit');

  var valChoice = '\''+valChoiceSelector.value+'\'' //get rid of char / num issue for SQL commands

  var query = 'select * from '+ //build query
  tableSelector.value+
  ' where '+
  statSelector.value+
  ' '+
  compareSelector.value+
  ' '+
  valChoice+
  ';';

  console.log(query);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', location.origin+'/'+tableSelector.value+'/'+query);
  xhr.addEventListener('load', function(){

    response = JSON.parse(xhr.responseText);//JSON object of all returned records

    console.log(response);
    console.log(response.length+" records returned");

  });
  xhr.send();

  var xAxSelector = document.createElement('select');  
  xAxSelector.setAttribute('id','xAxSelector');
  visArea.appendChild(xAxSelector);

  var yAxSelector = document.createElement('select');
  yAxSelector.setAttribute('id','yAxSelector');
  visArea.appendChild(yAxSelector);   

  var axisSelectorCreate = function(tableArr){

    visArea.appendChild(xAxSelector);
    visArea.appendChild(yAxSelector);

    tableArr.forEach(function(column){
      
      var option = document.createElement('option');
      option.setAttribute('value', column);
      option.setAttribute('label', column);
      xAxSelector.appendChild(option);

      var option = document.createElement('option');
      option.setAttribute('value', column);
      option.setAttribute('label', column);
      yAxSelector.appendChild(option);

    });
  } 

  // var clearAxesSelectors = function(){
  //   //remove axes dropdowns
  //   console.log('hi');

  //   document.getElementById('xAxSelector').remove();
  //   visArea.removeChild(xAxSelector);

  //   document.getElementById('yAxSelector').remove();
  //   visArea.removeChild(yAxSelector);
  // }

  var axesPopulate = function(){

    if (tableSelector.value==='teams'){ //need to go through this in order to populate x-/y-axis metric selectors

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();

      var table = [
      'select metric',
      'team_code',
      'team_location',
      'team_name',
      'team_league'
      ]

      axisSelectorCreate(table);

    } else if (tableSelector.value==='players'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();      
      
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

      axisSelectorCreate(table);

    } else if (tableSelector.value==='team_seasons'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();       

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

      axisSelectorCreate(table);

    } else if (tableSelector.value==='player_regular_seasons'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();     

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

      axisSelectorCreate(table); 

    } else if (tableSelector.value==='player_playoffs_careers'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();      

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

      axisSelectorCreate(table); 

    } else if (tableSelector.value==='player_playoffs'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();      

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

      axisSelectorCreate(table);

    } else if (tableSelector.value==='player_careers'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();      

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

      axisSelectorCreate(table);

    } else if (tableSelector.value==='player_allstars'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();       

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

      axisSelectorCreate(table);

    } else if (tableSelector.value==='drafts'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();      

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

      axisSelectorCreate(table);

    } else if (tableSelector.value==='coaches'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();      

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

      axisSelectorCreate(table);

    } else if (tableSelector.value==='coach_careers'){

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();      

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

      axisSelectorCreate(table);

    } 
    // else if (tableSelector.value==='select data'){

    //   clearAxesSelectors();

    // }

  }; //end function definition axesPopulate();

  
  axesPopulate();

  tableSelector.addEventListener('change', function(){
    axesPopulate();
  });//repopulate axes whenever table selector value changes

});//end of vis button event listener

});//end of DOMCONTENTLOADED event listener

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

  

// var addAllComps = function(){//function to add saved comparisons to the side list 
//   var xhr = new XMLHttpRequest();

//   xhr.open('GET', location.origin+'/comparisons.json');

//   xhr.addEventListener('load', function(){

//     console.log(JSON.stringify(xhr.responseText));
    
//     var comps = JSON.parse(xhr.responseText);

//     console.log(comps);


//     comps.forEach(function(comp){
//       console.log(comp)

//       addComp(comp.id, comp.search);

//     });
//   });
//   xhr.send();
// }

