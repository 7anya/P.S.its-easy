from pymongo import MongoClient
import json

client = MongoClient(
    "mongodb+srv://psitseasy_admin:tanjon@cluster0.d4jpb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = client.get_database("ps2sem1")

records = db.chronicles_combined_new_array

print(records.count_documents({}))

allData = list(records.find())
for x in allData:
    x['_id']=0
# print(allData)

chronicles = json.dumps(allData)

# print(chronicles)

