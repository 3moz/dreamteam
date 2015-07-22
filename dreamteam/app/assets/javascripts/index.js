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
  visButton.setAttribute('class', "mdl-button mdl-js-button mdl-button--primary")
  
  $('#p2').hide();

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

    var progressBar = $(".mdl-js-progress");

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

          $('#p2').show();

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
            $('#p2').hide();
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

  console.log('vis button hit');

  var xAxSelector = document.createElement('select');  
  xAxSelector.setAttribute('id','xAxSelector');
  visArea.appendChild(xAxSelector);
  
  var yAxSelector = document.createElement('select');
  yAxSelector.setAttribute('id','yAxSelector');
  visArea.appendChild(yAxSelector);     

  var axisSelectorCreate = function(tableArr){

    var xTableArr = tableArr.map(function(option){return option;});
    var yTableArr = tableArr.map(function(option){return option;});

    xTableArr.unshift('Select X-Axis Metric');
    yTableArr.unshift('Select Y-Axis Metric');

    visArea.appendChild(xAxSelector);
    visArea.appendChild(yAxSelector);

    xTableArr.forEach(function(column){
      
      var option = document.createElement('option');
      option.setAttribute('value', column);
      option.setAttribute('label', column);
      xAxSelector.appendChild(option);
    });

    yTableArr.forEach(function(column){

      var option = document.createElement('option');
      option.setAttribute('value', column);
      option.setAttribute('label', column);
      yAxSelector.appendChild(option);
    });
  }

  var axesValueCheck = function(){
    
    tableSelector = document.getElementById('tableSelector');

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

    if ((xAxSelector.value&&yAxSelector.value)&&
      (xAxSelector.value!=="Select X-Axis Metric")&&
      (yAxSelector.value!=="Select Y-Axis Metric"))
    {
      if(document.getElementById('visual')){
        document.getElementById('visual').remove()
        // graphArea.removeChild('visual');
      }
      $('#p2').show(); 
    // document.getElementById('valChoiceSelector').remove();
    // selectArea.removeChild(valChoiceSelector);

      console.log("both axes selectors have values\n x-axis:"
        +xAxSelector.value+", y-axis:"+yAxSelector.value);
      
      var xhr = new XMLHttpRequest();
      xhr.open('GET', location.origin+'/'+tableSelector.value+'/'+query);
      xhr.addEventListener('load', function(){
        

        response = JSON.parse(xhr.responseText);//JSON object of all returned records

        console.log(response.length+" records returned");

        graphData(response);//d3 visualization
       
        $('#p2').hide();
      });
      xhr.send();      
    } else {console.log("one or more axis metrics still need to be specified");}
  }

  var graphData = function(dataArr){ //below begins the d3 implementation

    var returnedObjects = dataArr;

    var dataSet = [];

    console.log("graphData hit");

    console.log(returnedObjects);

    var h = 450;
    var w = 850;

    var padding = 50;

    var numDataPoints = returnedObjects.length;

    console.log(numDataPoints+" raw data objects");

    var xMetric = xAxSelector.value;
    var yMetric = yAxSelector.value;

    for (var i = 0; i < numDataPoints; i++){
      dataSet.push([returnedObjects[i][xMetric], returnedObjects[i][yMetric]]);
    }//creating the d3 array of x,y values

    console.log(dataSet);
    console.log("^^^ is the data set to visualize");
    //each element of dataSet is a two element array where the first element is the value of the xMetric 
    //of the given object (which is itself a record from the database), and the second element is the value
    //of the yMetric.

    var xScale = d3.scale.linear() //x scale of data subset
      .domain([d3.min(dataSet, function(d){ return d[0]; }),d3.max(dataSet, function(d){ return d[0]; })])
      .range([padding, w-padding*2]);

    var yScale = d3.scale.linear() //x scale of data subset
      .domain([d3.min(dataSet, function(d){ return d[1]; }),d3.max(dataSet, function(d){ return d[1]; })])
      .range([h-padding, padding]);

    var rScale = d3.scale.linear() //r scale of data
      .domain([d3.min(dataSet, function(d){ return d[1]; }),d3.max(dataSet, function(d){ return d[1]; })])
      .range([2,15]);

    var xAxis = d3.svg.axis()//define x axis
      .scale(xScale)
      .orient('bottom')
      .ticks(10);
    
    var yAxis = d3.svg.axis()//define y axis
      .scale(yScale)
      .orient('left')
      .ticks(10);

    var svg = d3.select(document.getElementById('graphArea'))
      .append('svg')
      .attr('id', 'visual')
      .attr('width', w)
      .attr('height', h)
      .call(responsivefy);//creates responsiveness on the svg element by creating a 'viewbox'

    svg.selectAll('circle')//draw circles for data points
      .data(dataSet)
      .enter()
      .append('circle')
      .attr('fill', function(d){ 
        return d3.interpolateLab("blue","red")(rScale(d[1])/15);//as radius increases, more red/less blue
      })
      .attr('class','bubble')
      .attr('cx', function(d){ 
        return xScale(d[0])
      })
      .attr('cy', function(d){
        return yScale(d[1])
      })
      .attr('r', function(d){
        return rScale(d[1]);
      })


    svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,'+(h-padding)+')')
      .call(xAxis)
      .append('text')
      .attr('x', .8*w)
      .attr('dx', '.71em')
      .attr('y', .09*h)
      .style('text-anchor', 'end')
      .text('X-Axis: '+xMetric);

    svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate('+padding+',0)')
      .call(yAxis)
      .append('text')
      .attr('y', .05*w)
      .style('text-anchor', 'beginning')
      .text('Y-Axis: '+ yMetric);

    function responsivefy(svg){
      var svg = svg;
      //get container + svg aspect ratio
      var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = (width / height);

      //add viewbox and preserveAspectRatio properties,
      //and call resize so that svg resizes on initial page load

      svg.attr('viewbox','0 0 '+width+' '+height)
        .attr('preserveAspectRatio', 'xMidYMid')
        .call(resize);

      d3.select(window).on('resize.'+container.attr('id'), resize);

      //get width of container and resize svg to fit it
      function resize() {
        var targetWidth = parseInt(container.style('width'));
        svg.attr('width', targetWidth);
        svg.attr('height', Math.round(targetWidth/aspect));
      }//end resize
    }//end responsivefy
  }//end graphData 

  var axesPopulate = function(){

    if (tableSelector.value==='teams'){ //need to go through this in order to populate x-/y-axis metric selectors

      document.getElementById('xAxSelector').remove();
      document.getElementById('yAxSelector').remove();

      var table = [
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
    
  }; //end function definition axesPopulate();

  
  axesPopulate();

  tableSelector.addEventListener('change', function(){
    axesPopulate();
  });//repopulate axes whenever table selector value changes

  xAxSelector.addEventListener('change', function(){
    axesValueCheck();
  });//the xAxis selector needs to have a value in order to know what metric the x axis measures

  yAxSelector.addEventListener('change', function(){
    axesValueCheck();
  });//the yAxis selector needs to have a value in order to know what metric the y axis measures

});//end of vis button event listener

});//end of DOMCONTENTLOADED event listener

// $(document).bind("ajaxSend", function(){
//   console.log("ajax listener")
//   $('.mdl-js-progress').css("display","block")
// }).bind("ajaxComplete", function(){
//   $('.mdl-js-progress').css("display","none")
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

