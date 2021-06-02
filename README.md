<div align="center">
    <a href="https://psitseasy.ml/">
        <img src="./client/public/android-chrome-192x192.png" alt="BITS Pilani" width="120" height="120" />
    </a>
    <br /><br />
    <h1><code>P.S. It's Easy</code></h1>

<h2>All-in-one Web App for all your Practice School Allotment needs!</h2>

<p float="left">
<a href="https://github.com/7anya/P.S.its-easy">
<img src="https://badges.pufler.dev/visits/7anya/P.S.its-easy?style=for-the-badge&color=red" /></a>
<a href="https://github.com/7anya/P.S.its-easy">
<img src="https://badges.pufler.dev/updated/7anya/P.S.its-easy?style=for-the-badge"  /></a>
</p>

</div>

# About

A Web Application to display, browse and filter Practice School Stations and it's Chronicles over the past year with CG cutoff analytics in a easy to use web interface. There is also access to the latest Project Bank and the provision to download CSV to rearrange and update your preferences at PSD website with the [PS Companion](https://github.com/Joe2k/PS-Companion) Extension!

Checkout our blog [here](https://one-to-tan.blogspot.com/2021/05/ps-its-easy.html) to know about all the features, tech stack and the story behind this! :)

# How to use?

-   Go to the website [psitseasy.ml](https://psitseasy.ml/), and log in with BITS mail ID only. _(We had to use Google log in as we letting Allotment details of students on the open internet dint seem like the best idea, so its only to identify user as a BITSian, we don't take any other information)_
-   After Logging in you would be able to see different tabs in the Nav Bar. You can click and explore each on of them! For more details in each page checkout the **Features** section below.

# Features and Screenshots

-   ## Home Page

    -   Login with BITS mail only
        ![Home](images/home.png)

-   ## Project Bank (Currently has PS2 Sem 1 2020 Details)

    -   Here you will be able to view and the **PS-2 Sem 1 2020** Stations and their Projects. This will be updated at each PS cycle to the one thats currently going on. Now it's just dummy data from last year. When PS2 Sem 1 Details come in June this year we will update it and the station details will be updated approximately every 4 hrs automatically.
    -   You can apply filters like domain, stipend, branch and also search the name and location of the Station.
    -   In each Station you can see all its details when you click on the dropdown.
    -   You also get 2 buttons to checkout the previous year's chronicles and responses of the same station if available.
    -   There is also a **Download CSV** button with which you can download all the Station Details. Then you can rearrange these stations by moving the rows according to your preferences and then you can upload it in the PSD website with the [PS Companion](https://github.com/Joe2k/PS-Companion) Chrome Extension which is also built and maintained by us. So we will make sure both of these are compatible with each other all the time!
        ![Project Bank](images/projectBank.png)

-   ## PS-1 Responses

    -   Here you can see the latest 2021 allotments which was properly collected by us this time.
    -   There are over 1100 responses in this.
    -   Currently there is only 2021 stats. We will try to add more previous years stats to it before the next PS-1 in the summer starts
        ![PS-1 Responses](images/ps1Responses.png)

-   ## PS-2 Responses

    -   Here you can see the stats from the last 4 years **PS-2 Sem 1** Responses.
    -   You can use filters for year, cgpa and search for station names.
    -   You can zoom and move inside the box plot.
    -   When you hover over a station the details will come up on the right.
    -   You will also get a _Checkout it's chronicles_ button which will take you to the chronicles of that specific station if available.
    -   In the next few months we will also add Sem 2 stats as well.
        ![PS-2 Responses](images/ps2Responses.png)

-   ## PS-2 Chronicles

    -   Here you can see the chronicles of the past 4 years **PS-2 Sem 1**.
    -   You can search for stations and view the different years drop downs and each dropdown be able to see the name of the student in the PS station.
    -   Once you click on the name you can see the whole chronicle on the left.
    -   There is also a _Checkout it's responses_ button which takes you to the responses page of that specific station.
    -   We will expand it to accomodate Sem 2 chronicles as well in the near future.
        ![PS-2 Chronicles](images/ps2Chronicles.png)

# Disclaimer

-   The data used in the box plots were crowdsourced from the previous year's google forms responses and thus it doesn't account for every student's entry.
-   Aggregation of Station names and connection between the chronicles and responses is done using fuzzy techniques, so please be aware of the names.
-   Since the PS forms before this year had field where students had to fill the station names, the names varied so much with each entry and we spent a lot of time to clean automatically and manually. However the names in chronicles page and responses page might be different a bit. So sometimes fuzzy might not pick it up. So we recommend you search all the possible combinations of the station name like full form/ short form etc. This most probably won't be a problem cause we took enough care. But still its a disclaimer.

# Contribute

-   We do need volunteers to help maintain this project over the years,
    as it needs data to be fed in every 6 months as the new PS cycle commences,
    thus we welcome contributors that can help in the same.
-   If this project helped you or your friends please consider contributing.
-   If you have ideas for new features or any feedback, feel free to let us know.

# For Project Contributors

Start Server

`docker run --rm -d --name ps-its-easy --network <some-network> -v <absolute-path-to-this-repo>:/root rust:alpine /bin/sh ~/entrypoint.sh`  
_Note: Alternatively, you can expose the port instead of using --network, if you don't have a reverse proxy_

For enabling ssh access to the container:

1. Change the public key in .ssh/authorized_keys, you can generate new ones by using `ssh-keygen -f filename -t ecdsa` on any linux system
2. If you don't have a reverse proxy, you should expose and map the port 22 of the container to the host using `-p ` in the `docker run` command
3. ssh using `ssh <path-to-private-key> root@<host-path> -p <port-mapped-in-host>`
4. You have nano and git there for small file changes. Please only use `./restart.sh` in the home directory to restart the server
   _Note: If you are a new contributor to the official site at psitseasy.ml, please get the ssh keys from another maintainer_

**Made with <3 by Tan and Jonny**
