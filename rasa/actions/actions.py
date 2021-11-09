# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
import requests

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
                response += "Sorry, No results were found for that station. Please try for other stations!"

            dispatcher.utter_message(response)
        else:
            dispatcher.utter_message("Sorry, No results were found for that station. Please try for other stations!")

        return []
