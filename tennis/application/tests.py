from django.test import TestCase
from .models import TennisPlayer, Coach


# Create your tests here.


class CoachExperienceTestcase(TestCase):
    @classmethod
    def setUpTestData(cls):
        player1 = TennisPlayer.objects.create(tp_first_name="P1", tp_last_name="Player1", tp_rank=1,
                                              tp_date_of_birth='2000-01-01', tp_country='Romania', tp_gender='female')
        player2 = TennisPlayer.objects.create(tp_first_name="P2", tp_last_name="Player2", tp_rank=2,
                                              tp_date_of_birth='2000-01-01', tp_country='Romania', tp_gender='male')
        player3 = TennisPlayer.objects.create(tp_first_name="P3", tp_last_name="Player3", tp_rank=3,
                                              tp_date_of_birth='2000-01-01', tp_country='Romania', tp_gender='female')

        coach1 = Coach.objects.create(c_first_name='C1', c_last_name='Coach1', c_date_of_birth='1990-09-09',
                                      c_years_of_experience=10, c_email='c1@gmail.com', player=player1)
        coach2 = Coach.objects.create(c_first_name='C2', c_last_name='Coach2', c_date_of_birth='1990-09-09',
                                      c_years_of_experience=9, c_email='c2@gmail.com', player=player2)
        coach3 = Coach.objects.create(c_first_name='C3', c_last_name='Coach3', c_date_of_birth='1990-09-09',
                                      c_years_of_experience=5, c_email='c3@gmail.com', player=player3)

    def test_coaches_with_at_least_8_years_experience(self):
        response = self.client.get("/application/yearsofexp/8/")

        self.assertEqual((response.data[0]['c_years_of_experience']), 10)
        self.assertEqual((response.data[1]['c_years_of_experience']), 9)


class PlayersByCoachExp(TestCase):
    @classmethod
    def setUpTestData(cls):
        player1 = TennisPlayer.objects.create(tp_first_name="P1", tp_last_name="Player1", tp_rank=1,
                                              tp_date_of_birth='2000-01-01', tp_country='Romania', tp_gender='female')
        player2 = TennisPlayer.objects.create(tp_first_name="P2", tp_last_name="Player2", tp_rank=2,
                                              tp_date_of_birth='2000-01-01', tp_country='Romania', tp_gender='male')
        player3 = TennisPlayer.objects.create(tp_first_name="P3", tp_last_name="Player3", tp_rank=3,
                                              tp_date_of_birth='2000-01-01', tp_country='Romania', tp_gender='female')

        coach1 = Coach.objects.create(c_first_name='C1', c_last_name='Coach1', c_date_of_birth='1990-09-09',
                                      c_years_of_experience=10, c_email='c1@gmail.com', player=player1)
        coach2 = Coach.objects.create(c_first_name='C2', c_last_name='Coach2', c_date_of_birth='1990-09-09',
                                      c_years_of_experience=9, c_email='c2@gmail.com', player=player2)
        coach3 = Coach.objects.create(c_first_name='C3', c_last_name='Coach3', c_date_of_birth='1990-09-09',
                                      c_years_of_experience=5, c_email='c3@gmail.com', player=player3)
        coach4 = Coach.objects.create(c_first_name='C4', c_last_name='Coach4', c_date_of_birth='1990-09-09',
                                      c_years_of_experience=3, c_email='c4@gmail.com', player=player1)
        coach5 = Coach.objects.create(c_first_name='C5', c_last_name='Coach5', c_date_of_birth='1990-09-09',
                                      c_years_of_experience=2, c_email='c5@gmail.com', player=player2)

    def test_players_by_avg_years_of_exp_coaches(self):
        response = self.client.get("/application/playeravg/")

        self.assertEqual((response.data[0]['avg_yoe_coach']), 5)
        self.assertEqual((response.data[1]['avg_yoe_coach']), 5.5)
        self.assertEqual((response.data[2]['avg_yoe_coach']), 6.5)
