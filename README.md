# reactInstantly

reactInstantly is an app that uses react to display a users profile information from Instagram. 

## Installation

1. Fork it!
2. Install npm modules: `cd reactInstantly npm i`
3. Update the client_id in the API_URL constant to use the client_id provided by Instagram for your app.
4. Update the redirect_uri in the API_URL constant to use the redirect_uri that was entered during Instagram app registration.
4. Start webpack in one terminal: `npm start`
5. Start node in another terminal: `npm run server`
5. Your app should now be running on [localhost:3000](http://localhost:3000/).


## Deploying to Heroku

```
npm run build
heroku create
git push heroku master
heroku open
```

## View a LIVE example of this app

[instaReact](https://sleepy-brushlands-39585.herokuapp.com/)

## Built With

* [React](https://reactjs.org/) - The web framework used
* [Node](https://nodejs.org/en/) - Server used
* [Webpack](https://webpack.js.org/) - For dependency bundling
* [Express](https://expressjs.com/) - Node server framework
* [Bootstrap 4](https://v4-alpha.getbootstrap.com/) - For styling

## Screenshots

![alt text](https://raw.githubusercontent.com/ahead123/reactInstantly/screenshots/src/login1.png)


![alt text](https://raw.githubusercontent.com/ahead123/reactInstantly/screenshots/src/layout1.png)


![alt text](https://raw.githubusercontent.com/ahead123/reactInstantly/screenshots/src/mobile.png)


## License

This project is licensed under the MIT License 
