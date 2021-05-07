package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
)

var csvDataMap sync.Map

//var waitGroup sync.WaitGroup

func checkErrors(err error) {
	if err != nil {
		log.Println(err)
	}
}

func setHeaders(req *http.Request, length int64, cookies string, referrer string) {
	req.Header.Set("Accept", "application/json, text/javascript, */*; q=0.01")
	req.Header.Set("Accept-Encoding", "deflate")
	req.Header.Set("Accept-Language", "en-US,en;q=0.9,gu;q=0.8,hi;q=0.7")
	//req.Header.Set("Cache-Control", "max-age=0")
	req.Header.Set("Connection", "keep-alive")
	req.Header.Set("Content-Length", strconv.FormatInt(length, 10))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	req.Header.Set("Cookie", cookies)
	req.Header.Set("DNT", "1")
	req.Header.Set("Host", "psd.bits-pilani.ac.in")
	req.Header.Set("Origin", "http://psd.bits-pilani.ac.in")
	req.Header.Set("Referer", referrer)
	//req.Header.Set("Upgrade-Insecure-Requests", "1")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Mobile Safari/537.36)")
	req.Header.Set("X-Requested-With", "XMLHttpRequest")

}

func decodeJSON(response *io.ReadCloser) []map[string]interface{} {
	decoder := json.NewDecoder(*response)
	var array map[string]string
	err := decoder.Decode(&array)
	checkErrors(err)
	decoder = json.NewDecoder(strings.NewReader(array["d"]))
	var dataArray []map[string]interface{}
	err = decoder.Decode(&dataArray)
	checkErrors(err)

	return dataArray
}

func mapToString(mapToConvert map[string]interface{}) string {
	var result string
	for key, value := range mapToConvert {
		result += fmt.Sprintln(key + ": " + fmt.Sprintf("%v", value))
	}
	return result
}

func makeDetailsSheet(problemBank []map[string]interface{}) {
	//Open file for csv
	csvFile, err := os.Create("StationDetails.csv")
	checkErrors(err)
	csvWriter := csv.NewWriter(csvFile)

	csvData := make([]string, 10)
	//Head
	csvData[0] = "Station ID"
	csvData[1] = "Company Name"
	csvData[2] = "Location"
	csvData[3] = "Industry Domain"
	csvData[4] = "Preferred Branches"
	csvData[5] = "Stipend (UG)"
	csvData[6] = "Stipend (PG)"
	csvData[7] = "Facilities (Raw)"
	csvData[8] = "Projects"
	csvData[9] = "Have Accommodation?"
	err = csvWriter.Write(csvData)
	checkErrors(err)
	var length = (int64)(len(problemBank))
	notifyWriteKeyToMap := make(chan int64)
	go writeToCSV(notifyWriteKeyToMap, csvFile, csvWriter, length)
	//waitGroup.Add(1)
	for i, station := range problemBank {
		getProjectDetails(station, notifyWriteKeyToMap, i)
		//waitGroup.Add(1)
	}
}

func writeToCSV(notifyWriteKeyToMap chan int64, csvFile *os.File, csvWriter *csv.Writer, length int64) {
	//defer waitGroup.Done()
	for i := int64(0); i < length; i++ {
		csvData, ok := csvDataMap.Load(<-notifyWriteKeyToMap)
		if !ok {
			continue
		}
		err := csvWriter.Write(csvData.([]string))
		checkErrors(err)
		fmt.Println("Saved " + strconv.FormatInt(i+1, 10))

	}
	csvWriter.Flush()
	err := csvFile.Close()
	checkErrors(err)
}

func getProjectDetails(station map[string]interface{}, notifyWriteKeyToMap chan int64, count int) {
	//defer waitGroup.Done()
	csvData := make([]string, 10)
	projectAndFacilitiesCounterpart := getStationDetails(fmt.Sprintf("%v", station["StationId"]), fmt.Sprintf("%v", station["CompanyId"]))
	if station != nil {
		csvData[0] = fmt.Sprintf("%v", station["StationId"])
		csvData[1] = fmt.Sprintf("%v", station["CompanyName"])
		csvData[2] = fmt.Sprintf("%v", station["City"])
		csvData[3] = fmt.Sprintf("%v", station["IndustryDomain"])
		csvData[4] = fmt.Sprintf("%v", station["Tags"])
		csvData[5] = fmt.Sprintf("%v", station["stipend"])
		csvData[6] = fmt.Sprintf("%v", station["stipendforpg"])
		if len(projectAndFacilitiesCounterpart) > 0 {
			facilities := projectAndFacilitiesCounterpart["Facilities"]
			facilitiesMap := facilities.([]map[string]interface{})
			if len(facilitiesMap) > 0 {
				csvData[7] = mapToString(facilitiesMap[0])
			} else {
				csvData[7] = "Unavailable"
			}

			projects := projectAndFacilitiesCounterpart["Projects"]
			projectsMaps := projects.([]map[string]interface{})
			if len(projectsMaps) > 0 {
				csvData[8] = ""
				for i, projectMap := range projectsMaps {
					csvData[8] += fmt.Sprintln("Project: " + strconv.FormatInt(int64(i), 10))
					csvData[8] += fmt.Sprintln("Title: " + fmt.Sprintf("%v", projectMap["projectTitle"]))
					csvData[8] += fmt.Sprintln("Description: " + fmt.Sprintf("%v", projectMap["PBDescription"]))
					csvData[8] += fmt.Sprintln("Skills: " + fmt.Sprintf("%v", projectMap["SKills"]))
					csvData[8] += fmt.Sprintln("Students Required: " + fmt.Sprintf("%v", projectMap["TotalReqdStudents1"]))
					csvData[8] += fmt.Sprintln("Min CGPA: " + fmt.Sprintf("%v", projectMap["GeneralMinCGPA"]))
					csvData[8] += fmt.Sprintln("Max CGPA: " + fmt.Sprintf("%v", projectMap["GeneralMaxCGPA"]))
					csvData[8] += "\n"
				}
			}
		} else {
			csvData[7] = "Unavailable"
			csvData[8] = "Unavailable"
		}

		csvData[9] = "No"
	} else {

		temp := strings.Split(fmt.Sprintf("%v", station["Companyname"]), "-")
		var companyDomain, companyName string
		if len(temp) > 1 {
			companyDomain = strings.TrimSpace(temp[0])
			companyName = strings.TrimSpace(temp[1])
		} else {
			companyDomain = "Unavailable"
			companyName = temp[0]
		}

		csvData[0] = fmt.Sprintf("%v", station["StationId"])
		csvData[1] = companyName
		csvData[2] = fmt.Sprintf("%v", station["City"])
		csvData[3] = companyDomain
		csvData[4] = "Unavailable"
		csvData[5] = "Unavailable"
		csvData[6] = "Unavailable"
		csvData[7] = "Unavailable"
		csvData[8] = "Unavailable"
		csvData[9] = "No"
	}
	csvDataMap.Store(int64(count), csvData)
	fmt.Println("Received station ", strconv.FormatInt(int64(count+1), 10))
	notifyWriteKeyToMap <- int64(count)
}

func getRequest(url string, cookies string) *http.Response {
	req, err := http.NewRequest("GET", url, nil)
	checkErrors(err)

	setHeaders(req, 0, cookies, "")
	client := &http.Client{}
	resp, err := client.Do(req)
	return resp
}

func postRequest(url string, data string, cookies string, referrer string) []map[string]interface{} {
	req, err := http.NewRequest("POST", url, strings.NewReader(data))
	checkErrors(err)
	//dataContent, err := ioutil.ReadAll(data)
	checkErrors(err)
	setHeaders(req, int64(len(data)), cookies, referrer)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	//checkErrors(err)
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		log.Println(url + " " + strconv.FormatInt(int64(resp.StatusCode), 10))
	} else {
		//fmt.Println(url + " " + strconv.FormatInt(int64(resp.StatusCode), 10))
	}
	return decodeJSON(&resp.Body)
}

func getStationDetails(stationId, companyId string) map[string]interface{} {

	projectTemp := make(map[string]interface{}, 2)
	referrer := "http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx?CompanyId=" + companyId + "&StationId=" + stationId + "&BatchIdFor=11&PSTypeFor=1"
	getRequest(referrer, os.Args[1]) //set state variable on the shitty server, else it will return the initial or the last company you visited
	projectDetails := postRequest("http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/ViewPB", "{batchid: \"undefined\" }", os.Args[1], referrer)
	facilitiesDetails := postRequest("http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/StationFacilitiesInfo", "{StationId: \"0\"}", os.Args[1], referrer)
	projectTemp["Projects"] = projectDetails
	projectTemp["Facilities"] = facilitiesDetails

	return projectTemp
}

func main() {
	//Create CSV
	problemBank := postRequest("http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx/getPBdetail", "{batchid: \"undefined\" }", os.Args[1], "http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx")
	makeDetailsSheet(problemBank)
	//waitGroup.Wait()
}
