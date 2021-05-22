from pymongo import MongoClient
import json

client = MongoClient(
    "mongodb+srv://psitseasy_admin:tanjon@cluster0.d4jpb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = client.get_database("ps2sem1")

records = db.chronicles_combined_new_array

print(records.count_documents({}))

allData = list(records.find())
for x in allData:
    x['_id'] = 0
# print(allData)

chronicles = json.dumps(allData)

userdb = client.get_database("users")
users = userdb.users


def insertIfDoesntExist(userinfo):
    finduser = list(users.find({"email": userinfo['email'], "verified_email": True}))
    print("number of users", len(finduser))
    email = userinfo['email']
    if len(finduser) == 0:
        if email[10] == 'h':
            campus = "hyderabad"
        elif email[10] == 'g':
            campus = "goa"
        else:
            campus = "pilani"
        userinfo['campus'] = campus
        print(type(userinfo))
        foc = {
            "id": userinfo['id'],
            "email": userinfo['email'],
            "verified_email": userinfo["verified_email"],
            "name": userinfo['name'],
            "given_name": userinfo["given_name"],
            "picture": userinfo["picture"],
            "locale": userinfo["locale"],
            "hd": userinfo["hd"],
            "campus": userinfo["campus"]
        }

        users.insert_one(foc)
