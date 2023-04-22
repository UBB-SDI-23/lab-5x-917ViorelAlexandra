from django.urls import path

from .Views.CoachViews import CoachListCreateView, CoachInfo, CoachesWithAtLeastNYearsExperience
from .Views.TennisPlayerViews import TennisPlayerListCreateView, TennisPlayerInfo, TennisPlayerCoachListInfo, \
    PlayersByAvgYearsOfExperienceOfCoaches, PlayersRegisteredInGrandSlams, TennisPlayerOrderedByName
from .Views.TournamentRegistrationViews import TournamentRegistrationListCreateView, TournamentRegistrationInfo
from .Views.TournamentViews import TournamentInfo, TournamentListCreateView, TournamentOrderedByName

urlpatterns = [

    path("tennisplayer/", TennisPlayerListCreateView.as_view(), name="tennisplayer"),
    path("tennisplayer/<int:id>/", TennisPlayerInfo.as_view()),
    path("tennisplayer/<int:id>/coach/", TennisPlayerCoachListInfo.as_view()),
    path("coach/", CoachListCreateView.as_view(), name="coach"),
    path("coach/<int:id>/", CoachInfo.as_view()),
    path("yearsofexp/<int:yoe>/", CoachesWithAtLeastNYearsExperience.as_view(), name="yoe"),
    path("tournament/", TournamentListCreateView.as_view(), name="tournament"),
    path("tournament/<int:id>/", TournamentInfo.as_view()),
    path("tournamentreg/", TournamentRegistrationListCreateView.as_view(), name="tournamentreg"),
    path("tournamentreg/<int:id>/", TournamentRegistrationInfo.as_view()),
    path("playeravg/", PlayersByAvgYearsOfExperienceOfCoaches.as_view()),
    path("playergs/", PlayersRegisteredInGrandSlams.as_view()),
    path("playerOrdName/<str:p_last_name>/", TennisPlayerOrderedByName.as_view()),
    path("tournamentOrdName/<str:name>/", TournamentOrderedByName.as_view()),
]