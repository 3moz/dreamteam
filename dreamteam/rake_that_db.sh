declare -a namespaces=(
    "import_players_csv"
    "import_teams_csv"
    "import_team_seasons_csv"
    "import_player_regular_seasons_csv"
    "import_player_playoffs_careers_csv"
    "import_player_playoffs_csv"
    "import_player_careers_csv"
    "import_player_allstars_csv"
    "import_drafts_csv"
    "import_coaches_csv"
    "import_coach_careers_csv"
    )

declare -a tasks=(
    "create_players"
    "create_teams"
    "create_team_seasons"
    "create_player_regular_seasons"
    "create_player_playoffs_careers"
    "create_player_playoffs"
    "create_player_careers"
    "create_player_allstars"
    "create_drafts"
    "create_coaches"
    "create_coach_careers"
    )

listlength=${#namespaces[@]}

for ((i=0; i<listlength; i++));
do
    echo ${namespaces[i]}:${tasks[$i]}
    eval "rake "${namespaces[i]}:${tasks[$i]}
done