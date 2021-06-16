
# Website

Scheduling a meeting is a really time-consuming task. We are planning to make this process easier by developing a chatbot with a special scheduling algorithm which is based on participants calendar information that we will access by authenticating users calendars. This way users will not suffer because of the looping mail traffic while arranging meetings and they can focus on their tasks. We decided to develop a chatbot since we can integrate it with the tools that are used in the industry, such as Slack or Microsoft Teams. To develop a chatbot we should, we decided to use Natural Language Understanding (NLU) methods instead of the state machine approach, in order to increase user experience. We are going to use NLU to under- stand the intent of the user to make the conversation more likely to human-human conversations. Our goal is to give the feeling to the user that they are talking with a real assistant. Besides the chatbot part of this project, we also need create database in order to manage user information. Also, a website is required to register users, authenticate their calendars, and manage their meeting groups. Therefore, a lot of information transaction happens between database, website, and chatbot. Since we will store the user’s personal data and authenticate keys, we will manage security between database and chatbot by analyzing possible vulnerabilities of system. In the end of the project, a flow is created such that a user can register the website, authenticate his/her calendar, create a meeting group, and then go to Google’s Hangout Chat, from app market can add the bot and arrange a meeting. After that, the participants of the meeting are receives an email and can see the event in their calendars with the related name and duration.

# README Contents
1. [Authors](#authors)
2. [Tech Stack](#tech-stack)
3. [Deliverables](#deliverables)
4. [How to Run Docker](#how-to-run-docker)
5. [Screenshots](#screenshots)
6. [Support and Feedback](#support-and-feedback)

## Authors
- [@cavitcakir](https://www.github.com/cavitcakir)
- [@kayakapagan](https://www.github.com/kayakapagan)
- [@gokberkyar (contributor)](https://www.github.com/gokberkyar)

## Tech Stack

**Frontend:** React, Redux, Material UI

**Backend:** Node.js, Express.js

**Database:** MongoDB

**Testing:** NodeJsScan

**Other:** Docker

<p align="center">
    <code><img height="40" src="https://raw.githubusercontent.com/Meeting-Scheduler-Chatbot/website/main/icons/react-logo.png"></code>
    <code><img height="40" src="https://raw.githubusercontent.com/Meeting-Scheduler-Chatbot/website/main/icons/redux-logo.png"></code>
    <code><img height="40" src="https://raw.githubusercontent.com/Meeting-Scheduler-Chatbot/website/main/icons/materialUI-logo.png"></code>
    <code><img height="40" src="https://raw.githubusercontent.com/Meeting-Scheduler-Chatbot/website/main/icons/node-logo.jpeg"></code>
    <code><img height="40" src="https://raw.githubusercontent.com/Meeting-Scheduler-Chatbot/website/main/icons/express-logo.jpeg"></code>
    <code><img height="40" src="https://raw.githubusercontent.com/Meeting-Scheduler-Chatbot/website/main/icons/mongo-logo.png"></code>
    <code><img height="40" src="https://raw.githubusercontent.com/Meeting-Scheduler-Chatbot/website/main/icons/nodejsscan-logo.png"></code>
    <code><img height="40" src="https://raw.githubusercontent.com/Meeting-Scheduler-Chatbot/website/main/icons/docker-logo.png"></code>

</p>

## Deliverables
   - [report](https://github.com/Meeting-Scheduler-Chatbot/website/blob/main/website-images/ens491.pdf)
   - [presentation](https://github.com/Meeting-Scheduler-Chatbot/website/blob/main/website-images/ENS492%20Presentation.pdf)
   - [chart](https://lucid.app/publicSegments/view/f1aacb7a-91e0-4d8b-af27-bda16af04d4e/image.png)

## How to Run Docker
```shell
docker-compose -f docker-compose.dev.yml up
```

## How to Deploy
  - [read this file](https://github.com/cs48kblockchain/NFTSuits-DApp/blob/main/NFTSuitsExplained.pdf)

## Screenshots
<p align="center">
    <h3>Landing Page</h3>
    <img src="https://github.com/NFTSuits/NFT-Marketplace-DApp/blob/main/NFTSuits%20images/landing-page.png"/>
</p>
<p align="center">
    <h3>Market Place</h3>
    <img src="https://github.com/NFTSuits/NFT-Marketplace-DApp/blob/main/NFTSuits%20images/marketplace-page.png"/>
</p>
<p align="center">
    <h3>Item Page Example 1</h3>
    <img src="https://github.com/NFTSuits/NFT-Marketplace-DApp/blob/main/NFTSuits%20images/item-example-1.png"/>
</p>
<p align="center">
    <h3>Item Page Example 2</h3>
    <img src="https://github.com/NFTSuits/NFT-Marketplace-DApp/blob/main/NFTSuits%20images/item-example-2.png"/>
</p>
<p align="center">
    <h3>Profile Page</h3>
    <img src="https://github.com/NFTSuits/NFT-Marketplace-DApp/blob/main/NFTSuits%20images/profile-page.png"/>
</p>
<p align="center">
    <h3>Avatars Page</h3>
    <img src="https://github.com/NFTSuits/NFT-Marketplace-DApp/blob/main/NFTSuits%20images/avatar-page.png"/>
</p>

## Support and Feedback
Feel free to create an issue to discuss more.
