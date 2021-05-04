from selenium import webdriver
import pandas as pd

driver = webdriver.Chrome();
url = "http://psd.bits-pilani.ac.in/Login.aspx"
driver.get(url)
driver.implicitly_wait(5)

email = driver.find_element_by_id("TxtEmail")
password = driver.find_element_by_id("txtPass")

email.send_keys("f20190091@hyderabad.bits-pilani.ac.in")
password.send_keys("1RQ3FUI8")

submit = driver.find_element_by_id("Button1")
submit.click()

driver.get("http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx")

stationList = driver.find_elements_by_id("viewpro")
names = driver.find_elements_by_id("stationname")
locations = driver.find_elements_by_id("lOCATION")
industry = driver.find_elements_by_id("Industry")
nameList=[]
locationList=[]
domainList=[]
stationIDList = []
companyIDList = []
descriptionList = []
for i in range(0,len(stationList)):
	stationIDList.append(stationList[i].get_attribute("stationid"))
	companyIDList.append(stationList[i].get_attribute("companyid"))
	nameList.append(names[i].get_attribute("innerText"))
	domainList.append(industry[i].get_attribute("innerText"))
	locationList.append(locations[i].get_attribute("innerText"))

	

for i in range(0,len(stationIDList)):
	if companyIDList[i] is None or stationIDList[i] is None:
		descriptionList.append("")
		continue

	driver.get("http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx?CompanyId="+companyIDList[i]+"&StationId="+stationIDList[i]+"&BatchIdFor=11&PSTypeFor=1")
	titles = driver.find_elements_by_class_name("title")
	descriptions = driver.find_elements_by_class_name("Des")
	skills = driver.find_elements_by_class_name("Skil")
	preffered = driver.find_elements_by_class_name("grouptag")

	fullProjectDetails=""

	for j in range(0,len(titles)-1):
		fullProjectDetails+=("Project No. "+ str(j+1) + "\n")
		fullProjectDetails+=("Title : "+ (titles[j].get_attribute("innerText")) + "\n")
		fullProjectDetails+=("Project Description : "+ (descriptions[j].get_attribute("innerText")) + "\n")
		fullProjectDetails+=("Skills required : "+ (skills[j].get_attribute("innerText")) + "\n")
		fullProjectDetails+=("Preffered Disciplines : "+ (preffered[j].get_attribute("innerText")) + "\n\n")
	
	descriptionList.append(fullProjectDetails)

# print(fullProjectDetails)

data = {'Station ID': stationIDList, 'Station Name': nameList, 'Location': locationList, 'Domain': domainList, 'Project Details': descriptionList}

df=pd.DataFrame(data)
df.to_csv('StationDetails2nd.csv')








