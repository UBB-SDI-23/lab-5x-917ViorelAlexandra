from django.urls import path

from .Views.CoachViews import CoachDetail, CoachInfo, CoachesWithAtLeastNYearsExperience
from .Views.TennisPlayerViews import TennisPlayerListCreateView, TennisPlayerInfo, TennisPlayerCoachListInfo, \
    PlayersByAvgYearsOfExperienceOfCoaches, PlayersRegisteredInGrandSlams
from .Views.TournamentRegistrationViews import TournamentRegistrationDetail, TournamentRegistrationInfo
from .Views.TournamentViews import TournamentInfo, TournamentDetail

urlpatterns = [

    path("tennisplayer/", TennisPlayerListCreateView.as_view(), name="tennisplayer"),
    path("tennisplayer/<int:id>/", TennisPlayerInfo.as_view()),
    path("tennisplayer/<int:id>/coach/", TennisPlayerCoachListInfo.as_view()),
    path("coach/", CoachDetail.as_view(), name="coach"),
    path("coach/<int:id>/", CoachInfo.as_view()),
    path("yearsofexp/<int:yoe>/", CoachesWithAtLeastNYearsExperience.as_view(), name="yoe"),
    path("tournament/", TournamentDetail.as_view(), name="tournament"),
    path("tournament/<int:id>/", TournamentInfo.as_view()),
    path("tournamentreg/", TournamentRegistrationDetail.as_view(), name="tournamentreg"),
    path("tournamentreg/<int:id>/", TournamentRegistrationInfo.as_view()),
    path("playeravg/", PlayersByAvgYearsOfExperienceOfCoaches.as_view()),
    path("playergs/", PlayersRegisteredInGrandSlams.as_view()),
]