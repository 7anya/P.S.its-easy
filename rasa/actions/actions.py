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

        url = 'http://localhost:5000/api/rasa/stationDetails'
        json = {
            'name' : station,
            'ps' : ps,
            'sem' : sem
        }
        res = requests.post(url, json=json)
        stations = res.json()

        response = ""
        
        for x in stations:
            station_response = "Station Name - {} \n".format(x)
            for y in stations[x]:
                station_response += "Year - {} \n Max CGPA - {} \n Min CGPA - {} \n Avg CGPA - {} \n".format(y, stations[x][y]["maxCG"], stations[x][y]["minCG"], stations[x][y]["averageCG"])
            response += station_response + "\n"

        dispatcher.utter_message(response)

        return []
