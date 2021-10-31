from pymongo import MongoClient
import json
import keys

client = MongoClient(
    f"""mongodb+srv://psitseasy_admin:{keys.mongo}@cluster0.d4jpb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority""")

# PS2 Sem 1 Chronicles

db = client.get_database("ps2sem1")

records = db.chronicles_combined_new_array

print(records.count_documents({}))

allData = list(records.find())
for x in allData:
    x['_id'] = 0
# print(allData)

tempChronicles = allData
dic = {}
for each in tempChronicles:
    name = each["name"]
    del (each['name'])
    del (each['_id'])
    dic[name] = each

chronicles = json.dumps(dic)

# PS2 Sem 2 Chronicles

db = client.get_database("ps2sem2")

records = db.chronicles_combined_sem2_new_array

print(records.count_documents({}))

allData = list(records.find())
for x in allData:
    x['_id'] = 0
# print(allData)

tempChronicles = allData
dic = {}
for each in tempChronicles:
    name = each["name"]
    del (each['name'])
    del (each['_id'])
    dic[name] = each

chronicles_sem2 = json.dumps(dic)

# station details part for ps2

db = client.get_database("ps2sem1")
stationDetailsPS2 = db.ps2_sem1_responses_array
stationDetailsPS2 = list(stationDetailsPS2.find())
for x in stationDetailsPS2:
    x['_id'] = 0

details = {}
for each in stationDetailsPS2:
    name = each["name"]
    del (each['name'])
    del (each['_id'])
    details[name] = each

details = json.dumps(details)

# station details part for ps1
ps1db = client.get_database("ps1")
stationDetailsPS1 = ps1db.ps1_2021_responses_array
stationDetailsPS1 = list(stationDetailsPS1.find())
for x in stationDetailsPS1:
    x['_id'] = 0

detailsps1 = {}
for each in stationDetailsPS1:
    name = each["name"]
    del (each['name'])
    del (each['_id'])
    detailsps1[name] = each

detailsps1 = json.dumps(detailsps1)

# problem bank
problembankdb = client.get_database("pref")
problembank = problembankdb.PS2_2021_StationDetails

problembank = list(problembank.find())
for x in problembank:
    x['_id'] = 0

bank = []
for each in problembank:
    # name = each["Company Name"]
    # del (each['Company Name'])
    del (each['_id'])
    bank.append(each)

bank = json.dumps(bank)

# find all names
def find_names():
    namesDB = client.get_database("ps2_sem1_2021")
    namesCol = namesDB.Final_Names_PS2_Sem1_2021
    namesVal = list(namesCol.find())

    for x in namesVal:
        x['_id'] = 0

    names = []

    for each in namesVal:
        del (each['_id'])
        names.append(each)

    names = json.dumps(names)

    return names

def form_submit(data):
    namesDB = client.get_database("ps2_sem1_2021")
    namesCol = namesDB.Station_Responses_Raw
    responseCol = namesDB.Station_Responses_CG

    x= namesCol.insert_one(data)
    y= responseCol.update_one({'name': data['station']}, {'$push':{'2021.CG': data['cgpa']}})
    print(y.matched_count)
    if y.matched_count==0:
        newData = {'name' : data['station'], '2021':{'CG':[data['cgpa']]}}
        z = responseCol.insert_one(newData)

def form_responses():
    respDB = client.get_database("ps2_sem1_2021")
    stationDetailsPS2 = respDB.Station_Responses_CG
    stationDetailsPS2 = list(stationDetailsPS2.find())
    for x in stationDetailsPS2:
        x['_id'] = 0

    details = {}
    for each in stationDetailsPS2:
        name = each["name"]
        del (each['name'])
        del (each['_id'])
        details[name] = each

    details = json.dumps(details)
    return details

def form_detailed_responses():
    problembankdb = client.get_database("ps2_sem1_2021")
    problembank = problembankdb.Station_Responses_Raw

    problembank = list(problembank.find())
    for x in problembank:
        x['_id'] = 0

    bank = []
    for each in problembank:
        # name = each["Company Name"]
        # del (each['Company Name'])
        del (each['_id'])
        bank.append(each)

    bank = json.dumps(bank)

    return bank

# print(bank)
# enter user in DB
userdb = client.get_database("users")
users = userdb.users

# hel

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
