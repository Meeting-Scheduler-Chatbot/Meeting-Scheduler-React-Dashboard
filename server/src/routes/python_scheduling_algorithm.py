from pprint import pprint
import requests
import datetime
# from dateutil import tz
from datetime import timedelta
import numpy as np
import timeit
# from requests_toolbelt.threaded import pool
# from requests_toolbelt import threaded

# date = datetime.date.today()

TIME_DELTA = 0
# date = "31/03"
# day, month = date.split("/")
# year = "2021"
# hour = "15:25"
# begin = year+"-"+month+"-"+day + " " + hour
noon = "12-13"
workingTimes = "8-23"
kaya_id = ""
cavit_id = ""
kaya_token = ""

def findSlotMapReference(duration, stride, day):
    chunkList = []

    startEndWorkingTimes = workingTimes.split("-")
    startEndNoonTimes = noon.split("-")

    startWorkingTime = datetime.time(int(startEndWorkingTimes[0]))
    endWorkingTime = datetime.time(int(startEndWorkingTimes[1]))
    startNoonTime = datetime.time(int(startEndNoonTimes[0]))
    endNoonTime = datetime.time(int(startEndNoonTimes[1]))

    print("®"*50, day, startWorkingTime, day.time(), sep="\n")

    if startWorkingTime > day.time():
        start = datetime.datetime.combine(day.date(), startWorkingTime)
    else:
        start = day

    s = start
    e = start + datetime.timedelta(seconds=60 * duration)
    while e.time() <= endWorkingTime:
        if s.time() >= endNoonTime or e.time() <= startNoonTime:
            chunkList.append((s, e))
        s = s + datetime.timedelta(seconds=60 * stride)
        e = e + datetime.timedelta(seconds=60 * stride)
    #print(chunkList)
    return chunkList

def getAccessTokenByRefresh(user):
    raise("not implemented 1")

def getPersonFutureEvents(accessToken):
    raise("not implemented 2")

def getAccessTokenByRefreshBulk(peopleList):
    raise("not implemented 3")

def FutureEventsBulk(accessTokens):
    raise("not implemented 4")

def getAllFutureEvents(peopleList, token):
    res = requests.post('http://localhost:8080/api/googleSecure/schedule',
                        data={
                            "memberList": peopleList
                        },
                        headers={
                                'Authorization': "Bearer " + token,
                        },
                    )

    print(res.json()["data"])
    return res.json()["data"]

# url = API + "/group/members"
#     headers={'Authorization': "Bearer " + TOKEN}
#     body = {"groupId":group_id}
    
# r = requests.post(url = url, headers = headers, data = body) 
#     data = r.json() 
#     group_members = []
#     for each in data["data"][0]["memberNames"]:
#         group_members.append(each["email"])
#     return group_members


def schedule (memberList, token, meetingDuration):
    start = timeit.default_timer() 
    UserEvents = getAllFutureEvents(memberList, token)

    stop = timeit.default_timer()
    print("Request Time:", (stop-start))
    
    # {"Gokberk": [ [s,e] [s,e]  sorted by s }

    start = timeit.default_timer() 
    #SlotMapReference = findSlotMapReference(meetingDuration, 1, datetime.datetime.fromisoformat((datetime.datetime.strptime(begin, '%Y-%m-%d %H:%M')-timedelta(hours=TIME_DELTA)).isoformat()))
    SlotMapReference = findSlotMapReference(meetingDuration, 1, datetime.datetime.now())
    stop = timeit.default_timer()
    print("Chunk Create Time:", stop-start)
    # possibleSlotReference = [[start, end], [start,end],...]
    # print(SlotMapReference)
    
    start = timeit.default_timer() 
    n =  len(UserEvents) # number of user
    k =  len(SlotMapReference) # chunck size
    # print(n)
    # print(k)
    allFreeSlotMap= np.ones((n,k), dtype = np.int8)
    # = [[0,0,0,0...],[0,0,0,0,0,0,0]....]
    
    index = -1 # used to reference allFreeSlotMap for the user's index
    for user, userMap in UserEvents.items():
        index +=1 
        for event in userMap:
            s = event[0]
            e = event[1]
            s = datetime.datetime.fromisoformat((datetime.datetime.strptime(s[:-9], '%Y-%m-%dT%H:%M')-timedelta(hours=TIME_DELTA)).isoformat())
            e = datetime.datetime.fromisoformat((datetime.datetime.strptime(e[:-9], '%Y-%m-%dT%H:%M')-timedelta(hours=TIME_DELTA)).isoformat())
            for slotIndex, slotReference in enumerate(SlotMapReference):
                sR =  slotReference[0]
                eR =  slotReference[1]
                if  (s >= sR and s <= eR) or (e >= sR and e <= eR) or (sR >= s and sR <= e) or (eR >= s and eR <= e):
                    allFreeSlotMap[index,slotIndex] = 0
                    # gives matchings (cakismalar)

    numPersonAvailable = np.sum(allFreeSlotMap,axis=0)
    stop = timeit.default_timer()
    print("Scheduling Algorithm Time:", stop-start)
    # return [ str(y[0])[11:] + " - " + str( y[1])[11:] for x, y in zip(numPersonAvailable, SlotMapReference) if x == n ]
    # # return [ str(y[0]) + " - " + str( y[1]) for x, y in zip(numPersonAvailable, SlotMapReference) if x == n ]
    allPossibleAnswers = [ [y[0].isoformat() , y[1].isoformat()] for x, y in zip(numPersonAvailable, SlotMapReference) if x == n ]
    if allPossibleAnswers:
        # print(allPossibleAnswers[0])
        return allPossibleAnswers[0]
    else:
        return "there is no possible time to meet!!!"


total = 0
memberList = [cavit_id, kaya_id]
meetingDuration = 40
for _ in range(1):

    start = timeit.default_timer() 
    results = schedule(memberList, kaya_token, meetingDuration)
    stop = timeit.default_timer()
    total += stop - start

# print(total)
# print(total /10)

print("Number of free slots:",len(results),"\nFree Slots:")
print(results)
# for result in results:
#     print("\t  ",result)
print("start_time:",results[0])
print("end_time:",results[1])
print("token:", kaya_token)
print("member_list_ids:", memberList)

res = requests.post('http://localhost:8080/api/googleSecure/insert_event',
                        data={
                            "start_time": results[0],
                            "end_time": results[1],
                            "token": kaya_token,
                            "attendees_emails": ["cavitcakir@sabanciuniv.edu","kayakapagan@sabanciuniv.edu","gokberkyar@sabanciuniv.edu"]
                        },
                        headers={
                                'Authorization': "Bearer " + kaya_token,
                        },
                    )
print(res.json()["data"])




























#getAllFutureEvents() ve getPersonFutureEvents() --> fonksiyonları her farklı calender supplier için ayrı olucak

#getAllFutureEvents() --> return --> o kişinin start ve end time'ları list of list olarak [[start, end], [start, end], ...]

#bundan sonra her insan için chunk list oluşturulacak ve 1 ve 0'dan oluşacak olup 0 --> Free timeları, 1 --> busy timeları temsil ediyor

#getAllFutureEvents'ten alınan her busy time için chunk listesindeki o zamanlara karşılık gelen 0 lar 1 yapılıcak

#insanların chunk listleri toplanıcak ve n insan için toplami n eden slotlar önerilecek eğer toplamı n eden bir slot yoksa n-i eden slotlara kolayca bakılabilecek

#slot return edilecek.
'''
import datetime
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from dateutil import tz
from datetime import timedelta
import datetime
import matplotlib.pyplot as plt
import numpy as np
# If modifying these scopes, delete the file token.pickle.

def Ours(duration, members, date, minimumPeople, finalEmail):
    SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

    day, month = date.split("/")
    year = "2020"
    hour = "08:00"
    begin = year+"-"+month+"-"+day + " " + hour
    noon = "12-13"
    workingTimes = "8-17"
    # print(begin)

    peopleCount = len(members)

    def displayPersons(persons):
        for k, v in persons.items():
            print(k)
            for i in v:
                print("\t", i)

    def createGraph(free, peopleCount):
        X = []
        y = []

        for time, people in free.items():
            X.append(time[0].strftime('%H:%M') +
                     " - " + time[1].strftime('%H:%M'))
            y.append(len(people))

        #fig, ax = plt.subplots(figsize=(9.2, 5))
        #ax.set_xlim(0, peopleCount)
        #ax.barh(X, y, height=0.5)

        plt.barh(X, y, height=0.5)
        plt.xticks(np.arange(0, peopleCount+1, 1.0))
        plt.show()

        return

    def generateSomeSolutions(peopleCount, minPeopleCount, free):
        possible = []

        for i in range(peopleCount - minPeopleCount + 1):
            tempPeopleCount = peopleCount - i
            tempList = [tempPeopleCount]
            for time, people in free.items():
                if len(people) == tempPeopleCount:
                    tempList.append(time)
            if len(tempList) > 1:
                possible.append(tempList)

        return possible

    def freeTimes(listOfTimes, chunk):

        dict = {}

        for guess in chunk:
            # 8,10 8,50
            for person, events in listOfTimes.items():
                # person -> gokberk
                # events -> [(, )  (,)]
                flag = True
                for event in events:
                    #event (9,10)
                    guessS, guessE = guess
                    eventS, eventE = event

                    if not (guessE.time() <= eventS.time() or guessS.time() >= eventE.time()):
                        flag = False
                        break

                if flag:
                    if guess in dict:
                        dict[guess].append(person)
                    else:
                        dict[guess] = [person]

        return dict

    def displayChunks(chunks):
        for i in chunks:
            print("\t", i)

    def chunkCreation(duration, stride, day):
        chunkList = []

        startEndWorkingTimes = workingTimes.split("-")
        startEndNoonTimes = noon.split("-")

        startWorkingTime = datetime.time(int(startEndWorkingTimes[0]))
        endWorkingTime = datetime.time(int(startEndWorkingTimes[1]))
        startNoonTime = datetime.time(int(startEndNoonTimes[0]))
        endNoonTime = datetime.time(int(startEndNoonTimes[1]))

        start = datetime.datetime.combine(day.date(), startWorkingTime)
        # print(start)

        s = start
        e = start + datetime.timedelta(seconds=60 * duration)
        while e.time() <= endWorkingTime:
            if s.time() >= endNoonTime or e.time() <= startNoonTime:
                chunkList.append((s, e))
            s = s + datetime.timedelta(seconds=60 * stride)
            e = e + datetime.timedelta(seconds=60 * stride)

        return chunkList

    def getEventPerson(service, email, begin):
        #print('Getting the upcoming 10 events')

        now = (datetime.datetime.strptime(begin, '%Y-%m-%d %H:%M') -
               timedelta(hours=3)).isoformat() + 'Z'

        # print(now)
        #tomorrow =(datetime.datetime.utcnow() + datetime.timedelta(days=1)).isoformat() + 'Z'
        tomorrow = (datetime.datetime.strptime(begin, '%Y-%m-%d %H:%M')-timedelta(hours=3)
                    ).replace(hour=20, minute=59, second=59, microsecond=999999).isoformat() + 'Z'
        # print(tomorrow)
        events_result = service.events().list(calendarId=email, timeMin=now, timeMax=tomorrow,
                                              singleEvents=True,
                                              orderBy='startTime').execute()

        events = events_result.get('items', [])
        result = []

        for event in events:
            #start = event['start'].get('dateTime', event['start'].get('date'))
            #print(start, event['summary'])
            #print(event.keys(),end ="\n\n")
            result.append((event["start"]["dateTime"],
                           event["end"]["dateTime"]))
        # print(result)
        return result

    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('calendar', 'v3', credentials=creds)

    # Call the Calendar API

    page_token = None
    calendar_list = service.calendarList().list(pageToken=page_token).execute()
    # print(calendar_list)
    persons = {}
    for i in calendar_list["items"]:
        if "@" in i["summary"] and i["summary"] in members:
            # print(i["summary"],end="\n\n\n")
            persons[i["summary"]] = getEventPerson(
                service, i["summary"], begin)
    # print("---------------DONE-----------------")

    print(persons)
    for k, v in persons.items():
        # print(k)
        dummy = [(datetime.datetime.fromisoformat(v[0][0]),
                  datetime.datetime.fromisoformat(v[0][1]))]
        ePrev = v[0][1]

        for i in v[1:]:
            s, e = i
            if ePrev > s and ePrev > e:
                ePrev = e
                continue
            elif ePrev > s:
                dummy.append((datetime.datetime.fromisoformat(
                    ePrev), datetime.datetime.fromisoformat(e)))
                ePrev = e
            else:
                dummy.append((datetime.datetime.fromisoformat(s),
                              datetime.datetime.fromisoformat(e)))
                ePrev = e
        persons[k] = dummy
    # displayPersons(persons)
    chunk = chunkCreation(duration, 5, datetime.datetime.fromisoformat(
        (datetime.datetime.strptime(begin, '%Y-%m-%d %H:%M')-timedelta(hours=3)).isoformat()))
    # displayChunks(chunk)

    free = freeTimes(persons, chunk)
    # print(free)

    # print("--------------END-------")
    # displayPersons(free)

    possibles = generateSomeSolutions(peopleCount, minimumPeople, free)

    print(free)
    try:
        for i in possibles:
            for j in i:
                print(j)
        best = possibles[0]
        finalCount, finalResult = best[0], best[1]
        finalResult = [i.strftime("%m/%d/%Y, %H:%M") for i in finalResult]
        return finalCount, finalResult
    except:
        return -1, -1


def qstore(teams):
    filename = "teams.pickle"
    with open(filename, 'wb') as f:
        pickle.dump(teams, f)


def qdummyInit():
    teams = {"A": ["gokberkyar", "cavitcakir"]}
    qstore(teams)


def qload():
    filename = "teams.pickle"
    with open(filename, 'rb') as f:
        teams = pickle.load(f)
    return teams


def qaddMember(team, member):
    teams = qload()
    teams[team].append(member)
    qstore(teams)


def qremoveMember(team, member):
    teams = qload()
    if member in teams[team]:
        teams[team].remove(member)
    qstore(teams)


def qgetMembers():
    teams = qload()
    for k, v in teams.items():
        print(k, '\t', v)


def qaddTeam(team):
    teams = qload()
    teams[team] = []
    qstore(teams)


def qdelTeam(team):
    teams = qload()
    del teams[team]
    qstore(teams)


def qgetTeams():
    teams = qload()
    return teams.keys()


# createGraph(free, 4)


# print(Ours(40,["cavitcakir@sabanciuniv.edu","gokberkyar@sabanciuniv.edu","a","b"],"25/07",2,"gokberkyar@sabanciuniv.edu"))


# {"gokberk":[(s,e), (s1,e2) ...], "cavit":[] ....} busy ler ama öğle saati yok gündün akşam saatleri bilmiyor
#
#
# def getFreeHours(rawData,)
#
# "Inputs"
#"RawData: [(s,e), (s1,e2) ...]"
# "Output" şuanki saat, çalışma saatleri, öğle araları senin için önemli

# (9,10) (14,15)

#(8,9)  (10,12) (13,14) (15,17)


# (8,9) --> (8,8.40) (8.1,8.50) (8.20,9)


# [END calendar_quickstart]

print(Ours(40,["cavitcakir@sabanciuniv.edu","gokberkyar@sabanciuniv.edu","a","b"],"29/11",2,"gokberkyar@sabanciuniv.edu"))

'''




# if obaley == deneme:
#     print("oldu xd")


# start = timeit.default_timer() 
    

    
# urls = [deneme] * 1

#     # My list of URLs to get
# p = pool.Pool.from_urls(urls)
# p.join_all()
# #print(list(list(p.responses())[1]))
# #for response in p.responses():
# #    print(response.json())

# stop = timeit.default_timer()
# print(stop-start)

# from requests_toolbelt import threaded

# urls_to_get = [{
#     'url': deneme_post,
#     'method': 'POST',
# },{
#     'url': deneme_post,
#     'method': 'POST',
# },{
#     'url': deneme_post,
#     'method': 'POST',
# },{
#     'url': deneme_post,
#     'method': 'POST',
# },{
#     'url': deneme_post,
#     'method': 'POST',
# },{
#     'url': deneme_post,
#     'method': 'POST',
# },{
#     'url': deneme_post,
#     'method': 'POST',
# },{
#     'url': deneme_post,
#     'method': 'POST',
# },{
#     'url': deneme_post,
#     'method': 'POST',
# },{
#     'url': deneme_post,
#     'method': 'POST',
# }]
# responses, errors = threaded.map(urls_to_get)
# for response in responses:
#     print(response.json())
# #print(responses)
# #print(errors)
