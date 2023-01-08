# Wakaflame

## Purpose
I like to check my progress and compare with other devs, wakatime is one such tool, no only does it allow you to measure your coding rate, but their front end allows one to compare their rates with other users globally and even on a country based manner.

With that said, this is a project to show most active Kenya developers based on wakatime plugin which is available for multiple IDEs and editors. Main reason for it existing is due to the fact that the [official](https://wakatime.com/leaders?country_code=KE) Kenyan leaderboard lags behind, so project uses the global leaderboards [api](https://wakatime.com/api/v1/leaders) , which is more current and is updated more often.

## How it works.
Due to this being a front end application, and the default [api](https://wakatime.com/api/v1/leaders), and all it's other endpoints don't support CORS when the request is made from the browser, we have to send the request via proxy at, `https://wakaflames.fly.dev/api/v1/` which it's code is available at `https://github.com/Borwe/wakaflame-server`, project is also open for contribution same as this one.

## Features:

### Current:
- [x] List top users from Kenya, which are top 10k globally, based on a daily basis.
- [x] List a specific users, recently used programming languages, with frequency.
- [x] List total number of Kenyan users, on top 10k list.
- [x] Search users from search bar.

### Still to be done, PR's for this are accepted too:
- List programming languages used by Kenyans in wakatime, based on:
	- [x] Hours coded on average, calculted by getting total number of hours of top users divide by number of top users
	      Who use the language (total hours/ total users).
	- [x] Most number of users, calculated by getting number of top users who have used it.
	
- [ ] List Editors used by Kenyans in wakatime, based on frequency, on aily bases.

## Setup Info:

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Contributing:
Any improvements possible or issues, anyone might see, can be posted as an issue, or if feeling into it, you can also just create a pull request, contributions are welcomed.
