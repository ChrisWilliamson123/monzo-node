# Monzo NodeJS

This project is used to assist me with my daily budgeting.

In the config file there is a daily budget. When `index.js` is run, the API I have written is used to gather the total amount saved in the last 24 hours. Pot transactions occur depending on the amount saved/spent.

A cronjob is used on a server so that I can schedule the program to be run every 24 hours.
