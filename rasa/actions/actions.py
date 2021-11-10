# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
import requests
import datetime
import calendar

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class ActionGetStationDetails(Action):

    def name(self) -> Text:
        return "action_station_details"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        station = tracker.get_slot('station_name')
        ps = tracker.get_slot('ps_number')
        sem = tracker.get_slot('sem_number')

        dispatcher.utter_message("Give me a sec as I get you the details you need :)")

        url = 'https://psitseasy.ml/api/rasa/stationDetails'
        json = {
            'name' : station,
            'ps' : ps,
            'sem' : sem
        }
        res = requests.post(url, json=json)

        if (res.headers["content-type"].strip().startswith("application/json")):
            stations = res.json()

            response = ""
            
            for x in stations:
                station_response = "Station Name - {} \n".format(x)
                for y in stations[x]:
                    station_response += "Year - {} \n Responses - {} \n Max CGPA - {} \n Min CGPA - {} \n Avg CGPA - {} \n".format(y, stations[x][y]["count"], stations[x][y]["maxCG"], stations[x][y]["minCG"], stations[x][y]["averageCG"])
                response += station_response + "\n"

            if(response == ""):
                response += "Sorry, No results were found for that station. Please try for other stations or type help to get sample questions!"

            dispatcher.utter_message(response)
        else:
            dispatcher.utter_message("Sorry, No results were found for that station. Please try for other stations or type help to get sample questions!")

        return []

class ActionGetMenuDetails(Action):

    def name(self) -> Text:
        return "action_menu_details"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        day = tracker.get_slot('menu_day')
        meal = tracker.get_slot('menu_meal')

        dispatcher.utter_message("Give me a sec as I get you the details you need :)")

        if day == "tomorrow":
            day = calendar.day_name[(datetime.date.today() +  datetime.timedelta(days=1)).weekday()].lower()
        elif day == "today":
            day = calendar.day_name[datetime.date.today().weekday()].lower()

        mess_menu = {
            'monday' : {
                'breakfast' : 'idli, chutney, sambar, bread+jam, tea, milk, coffee',
                'lunch' : 'peanut bhendi dry, amritsari chole, masala dal tadaka, rasam, chapati, rice, any flavoured rice, curd, fryums, chutney',
                'snacks' : 'samosa, with green chilies fry, tea, milk, coffee',
                'dinner' : 'brinjal masala, aloo green peas dry, dal fry, sambar, chapati, rice, curd, lemon pickle, salad any barfi'
            },
            'tuesday' : {
                'breakfast' : 'onion utappam /set dosa, sprouts, tea, milk coffee',
                'lunch' : 'lobiya curry, mix veg dry, moong dal fry, pachi pulsu, chapati, rice, curd, fryums, chutney',
                'snacks' : 'bhel, tea, milk coffee',
                'dinner' : 'Capsicum soyabean dry, dum aloo curry, dal tadka, rasam, chapati, plain rice, curd, pickle, salad, double ka meetha'
            },
            'wednesday' : {
                'breakfast' : 'Wada sambar, chutney, bread+ jam, tea, milk, coffee',
                'lunch' : 'veg kofta, pumpkin dry, dal jeera fry, rasam, roti, rice, curd, fryums, chutney',
                'snacks' : 'noodles, tea, milk, coffee',
                'dinner' : 'Andra Chicken curry, shahi paneer curry, palak dal, turai channa dry, sambar, roti, rice, salad, laddu'
            },
            'thursday' : {
                'breakfast' : 'aloo paratha, pickle, curd sprouts, tea, milk, coffee',
                'lunch' : 'tawa veg, black channa masala, south dal, rasam, jeera dal fry, roti, rice, curd, fryums. chutney',
                'snacks' : 'Pav bhaji, tea, milk, coffee',
                'dinner' : 'Boiled egg curry, veg manchurian, capsicum pitla, dal, sambar, roti, rice, curd, pickle, gulab jamoon/ carrot halwa'
            },
            'friday' : {
                'breakfast' : 'puri bhaji, boiled egg, banana, tea, milk, coffee',
                'lunch' : 'Rajma masala , bhendi dry, goungura dal, moong dal khichdi / bisibele bath, rasam, chapati, rice, curd, fryums, chutney',
                'snacks' : 'Pasta, tea, milk, coffee',
                'dinner' : 'Aloo palak, beet root dry, Navratna dal, sambar, roti, rice, curd, pickle, salad, badushah'
            },
            'saturday' : {
                'breakfast' : 'Ajwain paratha, sprouts, tea, milk, coffee',
                'lunch' : 'Tendly masala, aloo brinjal dry, south dal, rasam, roti, rice, curd, fryums, salad',
                'snacks' : 'Ponugulu, tomato chutney, tea, milk, coffee',
                'dinner' : 'Cabbage,tomato dry, methi malai matar curry, lauki dal, sambar, chapati, rice, curd, black channa, salad, kheer'
            },
            'sunday' : {
                'breakfast' : 'masala dosa, chuney, sambar, bread + jam, tea, milk, coffee',
                'lunch' : 'Beans carrot dry, dahi kadi curry, dal fry, rasam, chapati, rice, curd, fryums, chutney',
                'snacks' : 'aloo bonda, tea, milk, coffee',
                'dinner' : 'chicken masala curry, paneer green peas curry, dudhi channa, dal tadka, sambar, roti, rice, raita, salad, sheera'
            }
        }

        try:
            res = "The mess menu for {}'s {} is {}".format(day, meal, mess_menu[day][meal])
            dispatcher.utter_message(res)
        except:
            dispatcher.utter_message("Couldn't get the details you asked for :(. Please type help to get sample questions!")
        
        return []
